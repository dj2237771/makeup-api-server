"use strict";

require("dotenv").config();
const superagent = require("superagent");

async function getProducts(req, res) {
  const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`;
  console.log("working");
  superagent
    .get(url)
    .then((productdata) => {
      const product = productdata.body;
      let productObject = product.map((item) => {
        return new Product(item);
      });
      res.status(200).send(productObject);
    })
    .catch((error) => {
      res.status(500).send(`Error something went wrong ${error}`);
    });
}

class Product {
  constructor(data) {
    this.userName = data.userName;
    this.prodName = data.name;
    this.prodBrand = data.brand;
    this.prodPrice = data.prices;
    this.prodImage = data.image_link;
    this.prodDisruption = data.description;
  }
}

module.exports = { getProducts };
