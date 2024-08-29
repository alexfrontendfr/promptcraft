const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");

// Create a new prompt
router.post("/", async (req, res) => {
  try {
    const { originalPrompt, refinedPrompt, technique } = req.body;

    const prompt = new Prompt({
      originalPrompt,
      refinedPrompt,
      technique,
    });

    const savedPrompt = await prompt.save();
    res.status(201).json(savedPrompt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all prompts
router.get("/", async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
