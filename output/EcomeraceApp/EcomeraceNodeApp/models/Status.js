const mongoose = require("mongoose");

const StatusScheema = mongoose.Schema({
  StatName: {
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Statuss", StatusScheema);