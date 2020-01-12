const mongoose = require("mongoose");

const CustomerScheema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  Email: {
    type: String,
    required: false
  },
  Password: {
    type: String,
    required: false
  },
  Phone: {
    type: Number,
    required: true
  },
  Orders: {
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

module.exports = mongoose.model("Customers", CustomerScheema);