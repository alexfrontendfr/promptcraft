const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");

// Utility function for prompt refinement
const refinePrompt = (originalPrompt, technique) => {
  switch (technique) {
    case "zero-shot":
      return `Answer the following directly: ${originalPrompt}`;
    case "few-shot":
      return `Consider these examples:\nExample 1: [Input] -> [Output]\nExample 2: [Input] -> [Output]\nNow answer: ${originalPrompt}`;
    case "chain-of-thought":
      return `Let's approach this step-by-step:\n1) Understand the question: ${originalPrompt}\n2) Break it down\n3) Analyze each part\n4) Synthesize and answer`;
    default:
      return originalPrompt;
  }
};

// Create a new prompt
router.post("/", async (req, res) => {
  try {
    const { originalPrompt, technique } = req.body;
    const refinedPrompt = refinePrompt(originalPrompt, technique);

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
