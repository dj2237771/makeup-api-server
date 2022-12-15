"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// coneting to the mongoDB server

// mongoose.connect("mongodb://localhost:27017/cats", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// // for duplication warning
// // schema: determines the shape of the data stored in the database/. it acts as the template or blueprint of any data collected.

// const catSchema = new mongoose.Schema({
//   catName: String,
//   CatBread: String,
// });

// const catModel = mongoose.model("kitten", catSchema);

// //seed
// function seedCatCollection() {
//   const sherry = new catModel({
//     catName: "sheery",
//     CatBread: "angora",
//   });
//   const luna = new catModel({
//     catName: "luna",
//     CatBread: "scotish",
//   });
//   const leo = new catModel({
//     catName: "leo",
//     CatBread: "british short hair",
//   });
//   sherry.save();
//   luna.save();
//   leo.save();
// }
// seedCatCollection();

mongoose.connect("mongodb://localhost:27017/makeupProducts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const product = new mongoose.Schema({
  prodName: String,
  prodBrand: String,
  prodPrice: Number,
  prodImage: String,
  prodDisruption: String,
});

const ProductsModel = mongoose.model("product", product);

// function seedMakupdata() {
//   const Lippie_Pencil = new ProductsModel({
//     prodName: "Lippie Pencil",
//     prodBrand: "colourpop",
//     prodPrice: 5.0,
//     prodImage:
//       "https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076",
//     prodDisruption:
//       "Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!",
//   });
//   const Blotted_Lip = new ProductsModel({
//     prodName: "Blotted Lip",
//     prodBrand: "colourpop",
//     prodPrice: 5.5,
//     prodImage:
//       "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
//     prodDisruption:
//       "Blotted Lip Sheer matte lipstick that creates the perfect popsicle pout! Formula is lightweight, matte and buildable for light to medium coverage.",
//   });
//   const Lippie_Stix = new ProductsModel({
//     prodName: "Lippie Stix",
//     prodBrand: "colourpop",
//     prodPrice: 5.5,
//     prodImage:
//       "https://cdn.shopify.com/s/files/1/1338/0845/collections/blottedlip-lippie-stix_grande.jpg?v=1512588803",
//     prodDisruption:
//       "Lippie Stix Formula contains Vitamin E, Mango, Avocado, and Shea butter for added comfort and moisture. None of our Lippie formulas contain any nasty ingredients like Parabens or Sulfates.",
//   });
//   const No_Filter_Foundation = new ProductsModel({
//     prodName: "No Filter Foundation",
//     prodBrand: "colourpop",
//     prodPrice: 12.0,
//     prodImage:
//       "https://cdn.shopify.com/s/files/1/1338/0845/products/foundations-lineup_800x1200.jpg?v=1528927785",
//     prodDisruption:
//       "Developed for the Selfie Age, our buildable full coverage, natural matte foundation delivers flawless looking skin from day-to-night. The oil-free, lightweight formula blends smoothly and is easily customizable to create the coverage you want. Build it up or sheer it out, it was developed with innovative soft-blurring pigments to deliver true color while looking and feeling natural. The lockable pump is easy to use and keeps your routine mess-free! As always, 100% cruelty-free and vegan.",
//   });
//   Lippie_Pencil.save();
//   Blotted_Lip.save();
//   Lippie_Stix.save();
//   No_Filter_Foundation.save();
// }
// seedMakupdata();
app.get("/", homeHandler);
app.get("/product", getProducthandler);
app.get("/productbybrand", getBrandProduct);
app.post("/product", addProduct);

function homeHandler(req, res) {
  res.status(200).send("all done");
}

async function getBrandProduct(req, res) {
  const brand = req.query.owner;
  // let productBybrand = await ProductsModel.find({ prodBrand: brand });
  // res.send(productBybrand);
  ProductsModel.find({ prodBrand: brand }, function (err, productBybrand) {
    if (err) {
      res.send("brand not found ");
    } else {
      res.send(productBybrand);
    }
  });
}

async function getProducthandler(req, res) {
  let allProducts = await ProductsModel.find();
  res.send(allProducts);
}

async function addProduct(req, res) {
  console.log(req.body);
  console.log(req.body.prodName);
  const prodName = req.body.prodName;
  const prodBrand = req.body.prodBrand;
  const prodPrice = req.body.prodPrice;
  const prodImage = req.body.prodImage;
  const prodDisruption = req.body.prodDisruption;

  let newProduct = await ProductsModel.create({
    prodName,
    prodBrand,
    prodPrice,
    prodImage,
    prodDisruption,
  });
  res.send(newProduct);
}
app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
