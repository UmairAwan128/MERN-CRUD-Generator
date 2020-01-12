const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Product = require("../models/Product");
const Category= require("../models/Category");

router.get("/", verify, async (req, res) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({
        _id: product._id,
        Price: product.Price,
        Quantity: product.Quantity,
        ProdName: product.ProdName,
        CategoryId: product.Category.Id,
        createdAt: product.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const category = await Category.findById(req.body.CategoryId);
    const product = new Product ({
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        ProdName: req.body.ProdName,
        Category: {
          Id: category._id,
          Name: category.CatName
        },
    });
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.id });
    res.json(removedProduct);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const category = await Category.findById(req.body.CategoryId);
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set:{
             Price: req.body.Price,
             Quantity: req.body.Quantity,
             ProdName: req.body.ProdName,
             Category: {
              Id: category._id,
              Name: category.CatName
             },

        }
      }
    );
    res.json(updatedProduct);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;