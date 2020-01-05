const mongoose = require("mongoose");

const StatusScheema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Statuss", StatusScheema);