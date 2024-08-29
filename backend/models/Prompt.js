const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  originalPrompt: {
    type: String,
    required: true,
  },
  refinedPrompt: {
    type: String,
    required: true,
  },
  technique: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prompt", PromptSchema);
