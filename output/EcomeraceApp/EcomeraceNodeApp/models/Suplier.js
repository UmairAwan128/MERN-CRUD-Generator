const mongoose = require("mongoose");

const SuplierScheema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: false
  },
  Phone: {
    type: Number,
    required: true
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

module.exports = mongoose.model("Supliers", SuplierScheema);