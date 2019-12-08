var mysql = require("mysql");
var inquirer = require("inquirer");
var chosenItemStockLevel = "";
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "tianqin29",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("successful linked");
  runBamazon();
});

function runBamazon() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(
      "" +
        "\nPLEASE REFER TO THE BELOW TABLE FOR PRODUCT CHOICES:" +
        "\n".repeat(2) +
        "Item ID".padEnd(10) +
        "|     " +
        "Product Name".padEnd(30) +
        "|     " +
        "Price " +
        "\n"
    );
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id.padEnd(10) +
          "|     " +
          res[i].product_name.padEnd(30) +
          "|     " +
          res[i].price
      );
    }
    runCustomerSelect();
  });

  function runCustomerSelect() {
    inquirer
      .prompt([
        {
          name: "chooseItem",
          message: "Please type in the id of your chosen item",
          type: "rawlist",
          choices: [
            "AP2W",
            "APP",
            "AW5",
            "AWE",
            "IP11",
            "IP11P",
            "IP11PMX",
            "IPD",
            "IPDM",
            "IPDP",
            "MB13P",
            "MBA",
            "MP16P"
          ]
        },
        {
          name: "quantity",
          message: "Please select how many of the item you want to buy",
          type: "number",
          validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
          }
        }
      ])
      .then(function(answer) {
        // console.log(answer.chooseItem);
        // console.log(answer.quantity);
        var query =
          "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
        connection.query(query, { item_id: answer.chooseItem }, function(
          err,
          res
        ) {
          if (err) throw err;
          // console.log(res[0].stock_quantity);
          chosenItemStockLevel = res[0].stock_quantity;
          ProcessOrder(answer);
        });
      });

    function ProcessOrder(answer) {
      var chosenItemID = answer.chooseItem;
      var query =
        "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
      connection.query(query, { item_id: answer.chooseItem }, function(
        err,
        res
      ) {
        if (err) throw err;
        // console.log(res[0].product_name);

        if (answer.quantity > chosenItemStockLevel) {
          console.log("Insufficient Stock!");
        } else {
          var stockLevelAfterThisSale = parseFloat(
            parseInt(chosenItemStockLevel) - parseInt(answer.quantity)
          );

          console.log(
            `There are ${stockLevelAfterThisSale} units left in stock!`
          );
          var totalCost = parseInt(answer.quantity * res[0].price);
          console.log(
            `you have successfully puchased ${answer.quantity} of ${res[0].product_name} at a total cost of ${totalCost}. Thanks for your purchase!`
          );
          var queryProcessOrder =
            "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
          connection.query(
            queryProcessOrder,
            [stockLevelAfterThisSale, chosenItemID],
            function(error, res) {
              if (error) {
                console.log("error", error);
              }
            }
          );
        }
      });
    }
  }
}
