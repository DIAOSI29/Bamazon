var mysql = require("mysql");
var Promise = require("promise");
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
    var productList = [];
    var queryAddInventory =
      "SELECT item_id, product_name, stock_quantity FROM products";
    connection.query(queryAddInventory, function(err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        productList.push(res[i].item_id);
      }
      inquirer
        .prompt([
          {
            name: "ProductToAdd",
            message: "Please choose the item to add stock",
            type: "list",
            choices: productList
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
          let selectedProduct = answer.ProductToAdd;
          let selectedQuantity = answer.quantityToAdd;
          connection.query("SELECT * FROM products where item_id = selectedProduct",function(err,res){
            var 
          })
        });
    });
  }

  //   async function finalFunction() {
  //     try {
  //       await loopThroughProducts();

  //       return productList;
  //     } catch (err) {
  //       console.log("err");
  //     }
  //   }

  //   function addNewProduct() {
  //     inquirer
  //       .prompt([
  //         {
  //           type: "input",
  //           message: "Please Give This Item A New ID",
  //           name: "newID"
  //         },
  //         {
  //           type: "input",
  //           message: "Please Add Description For This Item",
  //           name: "newName"
  //         },
  //         {
  //           type: "input",
  //           message: "Please Specify Its Department",
  //           name: "newDepartment"
  //         },
  //         {
  //           type: "number",
  //           message: "Please Specify Price",
  //           name: "newPrice"
  //         },
  //         {
  //           type: "number",
  //           message: "Please Specify How Many Stock You Want To Keep",
  //           name: "newStock"
  //         }
  //       ])
  //       .then(function(answer) {
  //         var queryAddNewProduct =
  //           "INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES ?";
  //         connection.query(
  //           queryAddNewProduct,
  //           [
  //             answer.newID,
  //             answer.newName,
  //             answer.newDepartment,
  //             answer.newPrice,
  //             answer.newStock
  //           ],
  //           function(err, res) {
  //             console.log(res);
  //             console.log(
  //               `\nYou have successfully added ${res.affectedRows} item into the system, which is detailed as follows:\n`
  //             );
  //             var displayNewlyAddedItem = "item_id = LAST_INSERT_ID()";
  //             connection.query(
  //               "SELECT * FROM products WHERE ?",
  //               displayNewlyAddedItem,
  //               function(err, res) {
  //                 console.log(
  //                   res[0].item_id.padEnd(10) +
  //                     "|     " +
  //                     res[0].product_name.padEnd(30) +
  //                     "|     " +
  //                     res[0].department_name.padEnd(10) +
  //                     "|     " +
  //                     res[0].price.toString().padEnd(10) +
  //                     "|     " +
  //                     res[0].stock_quantity
  //                 );

  //             );
  //               }
  //           }
  //         );
  //       });
  //   }
}
