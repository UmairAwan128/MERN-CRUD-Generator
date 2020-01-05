const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Order = require("../models/Order");
const User= require("../models/User");
const Status= require("../models/Status");
const Product= require("../models/Product");

router.get("/", verify, async (req, res) => {
  try {
    const Orders = await Order.find();
    res.json(Orders);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    let productIds = new Array();
    for(var i=0; i<order.Products.length; i++){
      productIds.push(order.Products[i].Id);
    }
    res.json({
        _id: order._id,
        OrderName: order.OrderName,
        OrderDate: order.OrderDate,
        Comments: order.Comments,
        Email: order.Email,
        Password: order.Password,
        Phone: order.Phone,
        UserId: order.User.Id,
        StatusId: order.Status.Id,
        ProductIds: productIds,
        createdAt: order.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.body.UserId);
    const status = await Status.findById(req.body.StatusId);
    let products = new Array();
    for(var i=0; i<req.body.ProductIds.length; i++){
      const product = await Product.findById(req.body.ProductIds[i]);
      products.push(
        {
          Id: product._id,
          Name: product.Name
        }
      );
    }
    const order = new Order ({
        OrderName: req.body.OrderName,
        OrderDate: req.body.OrderDate,
        Comments: req.body.Comments,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
        User: {
          Id: user._id,
          name: user.name
        },
        Status: {
          Id: status._id,
          Name: status.Name
        },
        Products: products,
    });
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedOrder = await Order.remove({ _id: req.params.id });
    res.json(removedOrder);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.body.UserId);
    const status = await Status.findById(req.body.StatusId);
    let products = new Array();
    for(var i=0; i<req.body.ProductIds.length; i++){
      const product = await Product.findById(req.body.ProductIds[i]);
      products.push(
        {
          Id: product._id,
          Name: product.Name
        }
      );
    }
    const updatedOrder = await Order.updateOne(
      { _id: req.params.id },
      {
        $set:{
             OrderName: req.body.OrderName,
             OrderDate: req.body.OrderDate,
             Comments: req.body.Comments,
             Email: req.body.Email,
             Password: req.body.Password,
             Phone: req.body.Phone,
             User: {
              Id: user._id,
              name: user.name
             },
             Status: {
              Id: status._id,
              Name: status.Name
             },
        Products: products,

        }
      }
    );
    res.json(updatedOrder);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;