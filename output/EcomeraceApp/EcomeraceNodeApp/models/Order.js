const mongoose = require("mongoose");

const OrderScheema = mongoose.Schema({
  OrderName: {
    type: String,
    required: true
  },
  OrderDate: {
    type: Date,
    required: true
  },
  User: {
    Id: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    }
  },
  Status: {
    Id: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    }
  },
  Products: {
    type: [{
      Id: {
        type: String,
        required: true
      },
      Name: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Orders", OrderScheema);