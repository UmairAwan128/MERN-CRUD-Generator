const mongoose = require("mongoose");

const ProductScheema = mongoose.Schema({
  Price: {
    type: Number,
    required: true
  },
  Quantity: {
    type: String,
    required: false
  },
  ProdName: {
    type: String,
    required: true
  },
  Category: {
    Id: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    }
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Products", ProductScheema);