var mysql = require("mysql");
var inquirer = require("inquirer");
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
  runBamazonManager();
});

function runBamazonManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select one of the following commands",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;

        case "exit":
          connection.end();
          break;
      }
    });

  function viewProducts() {
    var query =
      "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(
        "" +
          "\nProduct Table" +
          "\n".repeat(2) +
          "Item ID".padEnd(10) +
          "|     " +
          "Product Name".padEnd(30) +
          "|     " +
          "Price".padEnd(10) +
          "|     " +
          "Stock" +
          "\n"
      );
      for (var i = 0; i < res.length; i++) {
        console.log(
          //   res[i].item_id.padEnd(10) +
          //     "|     " +
          //     res[i].product_name.padEnd(30) +
          //     "|     " +
          //     res[i].price.padEnd(10)

          res[i].item_id.padEnd(10) +
            "|     " +
            res[i].product_name.padEnd(30) +
            "|     " +
            res[i].price.toString().padEnd(10) +
            "|     " +
            res[i].stock_quantity
        );
      }
      console.log("            ");
      runBamazonManager();
    });
  }

  function viewLowInventory() {
    console.log("\n" + "Items with a inventory level of less than 5" + "\n");
    var queryLowInventory =
      "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(queryLowInventory, function(err, res) {
      if (err) throw err;
      console.log(
        "Item ID".padEnd(10) +
          "|     " +
          "Product Name".padEnd(30) +
          "|     " +
          "Price".padEnd(10) +
          "|     " +
          "Stock" +
          "\n"
      );
      for (var i = 0; i < res.length; i++) {
        console.log(
          res[i].item_id.padEnd(10) +
            "|     " +
            res[i].product_name.padEnd(30) +
            "|     " +
            res[i].price.toString().padEnd(10) +
            "|     " +
            res[i].stock_quantity
        );
      }
      console.log("            ");
      runBamazonManager();
    });
  }

  function addInventory() {
    inquirer
      .prompt([
        {
          name: "ProductToAdd",
          message: "Please choose the item to add stock",
          type: "list",
          choices: loopThroughProducts()
        },
        {
          name: "quantityToAdd",
          message: "Plase type in the quantity of stock that you want to add",
          type: "input",
          validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
          }
        }
      ])
      .then(function(answer) {
        console.log("test");
      });
  }

  function loopThroughProducts() {
    var queryAddInventory =
      "SELECT item_id, product_name, stock_quantity FROM products";
    connection.query(queryAddInventory, function(err, res) {
      if (err) throw err;
      return generateList(res);
    });
  }

  async function generateList(res) {
    var productList = [];
    var nothingButToAvoidErrorMessageButFailed;
    for (let i = 0; i < res.length; i++) {
      if (true) {
        productList.push(res[i].item_id);
      }
      console.log(nothingButToAvoidErrorMessageButFailed);
    }

    var results = await Promise.all(
      productList,
      nothingButToAvoidErrorMessageButFailed
    );
    console.log(results);
    console.log(nothingButToAvoidErrorMessageButFailed);
    return results;
  }
}
