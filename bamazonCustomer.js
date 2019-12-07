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
          type: "input",
          validate: function(value) {
            if (parseInt(value.trim().length) > 7) {
              return false;
            }
            return true;
          },
          filter: function(value) {
            return value.toUpperCase();
          }
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
        console.log(answer.chooseItem);
        console.log(answer.quantity);
        var query =
          "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.chooseItem }, function(
          err,
          res
        ) {
          if (err) throw err;
          console.log(res[0].stock_quantity);
          chosenItemStockLevel = res[0].stock_quantity;
          ProcessOrder(answer);
        });
      });

    function ProcessOrder(answer) {
      if (answer.quantity > chosenItemStockLevel) {
        console.log("Insufficient Stock!");
      } else {
        console.log("Order Placed!");
      }
    }
  }
}
