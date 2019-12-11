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
    console.log("       ");
    runCustomerSelect();
  });

  function runCustomerSelect() {
    var productList = [];
    var queryAddInventory = "SELECT item_id FROM products";
    connection.query(queryAddInventory, function(err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        productList.push(res[i].item_id);
      }
      inquirer
        .prompt({
          name: "chooseItem",
          message: "Please select the id of your chosen item",
          type: "rawlist",
          choices: productList
        })
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
            var chosenItemID = answer.chooseItem;
            console.log(`\nYou have selected ${res[0].product_name} :)\n`);
            ProcessOrder(chosenItemID);
          });
        });
    });
  }

  function ProcessOrder(chosenItemID) {
    inquirer
      .prompt({
        name: "quantity",
        message: "How many do you want to buy?",
        type: "number",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        }
      })
      .then(function(answer) {
        var query =
          "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
        connection.query(query, { item_id: chosenItemID }, function(err, res) {
          if (err) throw err;
          // console.log(res[0].product_name);

          if (answer.quantity > chosenItemStockLevel) {
            console.log(
              "\n" +
                "Insufficient Stock! Please try again with a smaller quantity!" +
                "\n"
            );
            exitOrNot();
          } else {
            var stockLevelAfterThisSale = parseFloat(
              parseInt(chosenItemStockLevel) - parseInt(answer.quantity)
            );

            // console.log(
            //   `There are ${stockLevelAfterThisSale} units left in stock!`
            // );
            var totalCost = parseInt(answer.quantity * res[0].price);
            console.log(
              `\nYou have successfully puchased ${answer.quantity} of ${res[0].product_name} at a total cost of ${totalCost}. There are ${stockLevelAfterThisSale} units left in stock. Thanks for your purchase!\n`
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
            exitOrNot();
          }
        });
      });
  }
}

function exitOrNot() {
  inquirer
    .prompt({
      name: "todoNext",
      type: "list",
      message: "What would you like to do next?",
      choices: ["Make Another Purchase", "Finish and Exit"]
    })
    .then(function(answer) {
      switch (answer.todoNext) {
        case "Make Another Purchase":
          runCustomerSelect();
          break;

        case "Finish and Exit":
          connection.end();
          break;
      }
    });
}
