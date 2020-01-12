const mongoose = require("mongoose");

const CategoryScheema = mongoose.Schema({
  CatName: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: false
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Categorys", CategoryScheema);