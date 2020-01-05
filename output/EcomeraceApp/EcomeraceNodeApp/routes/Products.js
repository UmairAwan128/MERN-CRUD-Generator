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
    let categoryIds = new Array();
    for(var i=0; i<product.Categorys.length; i++){
      categoryIds.push(product.Categorys[i].Id);
    }
    res.json({
        _id: product._id,
        Name: product.Name,
        Price: product.Price,
        Quantity: product.Quantity,
        CategoryIds: categoryIds,
        createdAt: product.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    let categorys = new Array();
    for(var i=0; i<req.body.CategoryIds.length; i++){
      const category = await Category.findById(req.body.CategoryIds[i]);
      categorys.push(
        {
          Id: category._id,
          Name: category.Name
        }
      );
    }
    const product = new Product ({
        Name: req.body.Name,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        Categorys: categorys,
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
    let categorys = new Array();
    for(var i=0; i<req.body.CategoryIds.length; i++){
      const category = await Category.findById(req.body.CategoryIds[i]);
      categorys.push(
        {
          Id: category._id,
          Name: category.Name
        }
      );
    }
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set:{
             Name: req.body.Name,
             Price: req.body.Price,
             Quantity: req.body.Quantity,
        Categorys: categorys,

        }
      }
    );
    res.json(updatedProduct);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;