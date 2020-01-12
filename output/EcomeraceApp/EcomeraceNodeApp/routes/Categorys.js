const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Category = require("../models/Category");

router.get("/", verify, async (req, res) => {
  try {
    const Categorys = await Category.find();
    res.json(Categorys);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
        _id: category._id,
        CatName: category.CatName,
        Type: category.Type,
        createdAt: category.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const category = new Category ({
        CatName: req.body.CatName,
        Type: req.body.Type,
    });
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedCategory = await Category.remove({ _id: req.params.id });
    res.json(removedCategory);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedCategory = await Category.updateOne(
      { _id: req.params.id },
      {
        $set:{
             CatName: req.body.CatName,
             Type: req.body.Type,

        }
      }
    );
    res.json(updatedCategory);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;