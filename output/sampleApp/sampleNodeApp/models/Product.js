const mongoose = require("mongoose");

const ProductScheema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: false
  },
  Categorys: {
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

module.exports = mongoose.model("Products", ProductScheema);