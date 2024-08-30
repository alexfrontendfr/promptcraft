const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const connectDB = require("./db");
const promptRoutes = require("./routes/prompts");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Existing routes
app.use("/api/prompts", promptRoutes);
app.use("/api/auth", authRoutes);

// Palm2 setup
const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.PALM2_API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// New route for Palm2 prompt refinement
app.post("/api/refine-prompt", async (req, res) => {
  try {
    const { prompt, context, tone } = req.body;
    const result = await client.generateMessage({
      model: MODEL_NAME,
      prompt: {
        context: `You are an expert prompt engineer. Your task is to refine and improve prompts to make them more effective, clear, and likely to generate high-quality responses.`,
        messages: [
          {
            content: `Refine the following prompt for a ${tone} tone, considering this context: ${context}. 
        Original prompt: ${prompt}

        Instructions:
        1. Clarify the prompt's purpose and main points
        2. Make it more specific and detailed
        3. Ensure it encourages thoughtful and comprehensive responses
        4. Maintain the original intent while improving clarity and effectiveness

        Refined prompt:`,
          },
        ],
      },
    });

    if (
      result &&
      result[0] &&
      result[0].candidates &&
      result[0].candidates[0]
    ) {
      res.json({ refinedPrompt: result[0].candidates[0].content });
    } else {
      throw new Error("Unexpected response format from AI service");
    }
  } catch (error) {
    console.error("Error refining prompt:", error);
    res.status(500).json({ error: "Error refining prompt" });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
