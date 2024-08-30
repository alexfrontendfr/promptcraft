import axios from "axios";

const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

export const refinePromptWithAI = async (prompt, context, tone, technique) => {
  try {
    let inputText = `Refine the following prompt for a ${tone} tone, considering this context: ${context}. 
    Original prompt: ${prompt}

    Instructions:
    1. Clarify the app's purpose and main features
    2. Break down the step-by-step plan into clear, actionable items
    3. Suggest specific frameworks or technologies that would be suitable
    4. Consider user experience and interface design
    5. Address potential challenges and solutions

    Refined prompt:`;

    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: inputText },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data[0] && response.data[0].generated_text) {
      return response.data[0].generated_text.trim();
    } else {
      throw new Error("Unexpected response format from AI service");
    }
  } catch (error) {
    console.error(
      "Error refining prompt with AI:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
