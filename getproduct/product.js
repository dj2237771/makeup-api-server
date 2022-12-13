"use strict";

require("dotenv").config();
const superagent = require("superagent");

async function getProducts(req, res) {
  const url = `http://makeup-api.herokuapp.com/api/v1/products.json`;
  superagent
    .get(url)
    .then((productdata) => {
      const product = productdata.body.results;
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
    prodName = data.name;
    prodBrand = data.brand;
    prodPrice = data.prices;
    prodImage = date.image_link;
    prodDisruption = data.description;
  }
}

module.exports = { getProducts };
