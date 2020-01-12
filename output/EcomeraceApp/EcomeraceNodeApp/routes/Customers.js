const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Customer = require("../models/Customer");
const Order= require("../models/Order");

router.get("/", verify, async (req, res) => {
  try {
    const Customers = await Customer.find();
    res.json(Customers);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    let orderIds = new Array();
    for(var i=0; i<customer.Orders.length; i++){
      orderIds.push(customer.Orders[i].Id);
    }
    res.json({
        _id: customer._id,
        Name: customer.Name,
        DOB: customer.DOB,
        Email: customer.Email,
        Password: customer.Password,
        Phone: customer.Phone,
        OrderIds: orderIds,
        createdAt: customer.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    let orders = new Array();
    for(var i=0; i<req.body.OrderIds.length; i++){
      const order = await Order.findById(req.body.OrderIds[i]);
      orders.push(
        {
          Id: order._id,
          Name: order.OrderName
        }
      );
    }
    const customer = new Customer ({
        Name: req.body.Name,
        DOB: req.body.DOB,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Orders: orders,
    });
    const savedCustomer = await customer.save();
    res.status(200).json(savedCustomer);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedCustomer = await Customer.remove({ _id: req.params.id });
    res.json(removedCustomer);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    let orders = new Array();
    for(var i=0; i<req.body.OrderIds.length; i++){
      const order = await Order.findById(req.body.OrderIds[i]);
      orders.push(
        {
          Id: order._id,
          Name: order.OrderName
        }
      );
    }
    const updatedCustomer = await Customer.updateOne(
      { _id: req.params.id },
      {
        $set:{
             Name: req.body.Name,
             DOB: req.body.DOB,
             Email: req.body.Email,
             Password: req.body.Password,
             Phone: req.body.Phone,
        Orders: orders,

        }
      }
    );
    res.json(updatedCustomer);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;