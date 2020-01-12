const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Suplier = require("../models/Suplier");
const Product= require("../models/Product");

router.get("/", verify, async (req, res) => {
  try {
    const Supliers = await Suplier.find();
    res.json(Supliers);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const suplier = await Suplier.findById(req.params.id);
    let productIds = new Array();
    for(var i=0; i<suplier.Products.length; i++){
      productIds.push(suplier.Products[i].Id);
    }
    res.json({
        _id: suplier._id,
        Name: suplier.Name,
        Email: suplier.Email,
        Phone: suplier.Phone,
        ProductIds: productIds,
        createdAt: suplier.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    let products = new Array();
    for(var i=0; i<req.body.ProductIds.length; i++){
      const product = await Product.findById(req.body.ProductIds[i]);
      products.push(
        {
          Id: product._id,
          Name: product.ProdName
        }
      );
    }
    const suplier = new Suplier ({
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Products: products,
    });
    const savedSuplier = await suplier.save();
    res.status(200).json(savedSuplier);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedSuplier = await Suplier.remove({ _id: req.params.id });
    res.json(removedSuplier);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    let products = new Array();
    for(var i=0; i<req.body.ProductIds.length; i++){
      const product = await Product.findById(req.body.ProductIds[i]);
      products.push(
        {
          Id: product._id,
          Name: product.ProdName
        }
      );
    }
    const updatedSuplier = await Suplier.updateOne(
      { _id: req.params.id },
      {
        $set:{
             Name: req.body.Name,
             Email: req.body.Email,
             Phone: req.body.Phone,
        Products: products,

        }
      }
    );
    res.json(updatedSuplier);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;