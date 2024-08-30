const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");

router.get("/usage", async (req, res) => {
  try {
    const techniqueUsage = await Prompt.aggregate([
      { $group: { _id: "$technique", count: { $sum: 1 } } },
    ]);
    const toneUsage = await Prompt.aggregate([
      { $group: { _id: "$tone", count: { $sum: 1 } } },
    ]);
    const totalPrompts = await Prompt.countDocuments();

    res.json({ techniqueUsage, toneUsage, totalPrompts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
