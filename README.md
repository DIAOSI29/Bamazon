# Bamazon

## What is Bamazon

This is an application that combines the use of Node.js and MySQL to simulate a basic functioning Amazon-like sales and management system. It consists of two separate applications customised for customer and manager with different functionalities. All application operation is based on Node.js and relevant data will be display in it as well.
BamazonCustomer is a storefront that displays data on Apple products (pre-defined) which enables customers to selected an item and make a purchase.
BamazonManager is a inventory management system with which manager can check product inventory,identify low inventory items, add inventory on particular items and add new products.

### BamazonCustomer

When opening this application, customer will be presented with a full list of stored items with detailed information regarding its id, description, department and price. Customer will then be offered to choose a single product according to its id as well as quantity to buy. After customer have completed the above steps BamazonCustomer will display a purchase summary with total price included. At the end of each purchase process customer can choose to either making another purchase or exit the application.

### BamazonManager

When opening this application, manager will be presented with a list of four options that enables a broad overview of the inventory system. Manager can check just-in-time inventory level, retrieve data on low stock item, re-stock item and also add a new product into the system. At the end of each option performing process user can choose whether to conduct another inventory management activity or exit the application.

## Overview

The functionality of this app are built upon the use of npm packages and Node.js which includes:

1. **mysql**

   It is used to create connection between Node terminal UI and MySQL database where all product information were generated and stored. This package enables reading, writing and updating data from node terminal to MySQL database.

2. **inquirer**

   It is used to created and present questionnaire in Node terminal where user can interact with the application, with answers used to invoke various commands to communicate and manipulate MySQL database.

## User Guide

In Node.js terminal, user open either BamazonCustomer or BamazonManager by just typing in application name

**_ In Node.js Bamazon root terminal user run the app by typing in *node bamazonCustomer.js* or *bamazonManager.js*". _**

### bamazonCustomer

1. Customer will be required to type in the product of the chosen item
   BamazonCustomer will inform customer of the product selected based on product id

2. Customer will be required to type in the quantity required for the chosen item
   BamazonCustomer will inform customer of the order detail and if there is not enough stock the customer will be required to re-enter a new figure unless it is less than or equal to the stock quantity of the item.

### bamazonManager

1. Manager will be asked to choose one of the following commands:

   - "View Products for Sale"

     - Just-in-time data on product item_id, product_name, price, stock_quantity will be retrieve from MySQL database and then displayed in terminal

   - "View Low Inventory"

     -

   - "Add to Inventory"

     -

   - ## "Add New Product"
   - "exit"

**LiriBot operating secenario examples:**

- Node.js terminal

See how user input changes the content in random.txt file

COMMAND: `concert-this` ------------ CONTENT: `user specified artist name`

![concert-this - Animated gif demo](./gifs/concert-this.gif)

COMMAND: `spotify-this-song` ------- CONTENT: `user specified song name`

![spotify-this-song - Animated gif demo](./gifs/spotify-this-song.gif)

COMMAND: `spotify-this-song` ------- CONTENT: `empty`

![spotify-this-song-empty - Animated gif demo](./gifs/spotify-this-song-empty.gif)

COMMAND: `movie-this` -------------- CONTENT: `user specified movie name`

![movie-this - Animated gif demo](./gifs/movie-this.gif)

COMMAND: `movie-this` -------------- CONTENT: `empty`

![movie-this-empty - Animated gif demo](./gifs/movie-this-empty.gif)

Directly process what is in random.txt file with COMMAND: `do-what-it-says` in Node.js terminal

![do-what-it-says - Animated gif demo](./gifs/do-what-it-says.gif)

## Technology Used In This Application

- Node.js (`fs,dotenv,axios`)
- Moment.js
- API (spotify, bandsintown)

## Sole Developer

**Tian Qin**

```

```
