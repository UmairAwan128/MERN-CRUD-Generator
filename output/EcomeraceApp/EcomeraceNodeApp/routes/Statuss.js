const express = require("express");
const router = express.Router(); 
const verify = require("./verifyToken"); 
const Status = require("../models/Status");

router.get("/", verify, async (req, res) => {
  try {
    const Statuss = await Status.find();
    res.json(Statuss);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.json({
        _id: status._id,
        StatName: status.StatName,
        createdAt: status.createdAt
    });
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const status = new Status ({
        StatName: req.body.StatName,
    });
    const savedStatus = await status.save();
    res.status(200).json(savedStatus);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const removedStatus = await Status.remove({ _id: req.params.id });
    res.json(removedStatus);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedStatus = await Status.updateOne(
      { _id: req.params.id },
      {
        $set:{
             StatName: req.body.StatName,

        }
      }
    );
    res.json(updatedStatus);
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

module.exports = router;