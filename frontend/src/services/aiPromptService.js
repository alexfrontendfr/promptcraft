import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const refinePromptWithAI = async (prompt, context, tone) => {
  try {
    const response = await axios.post(`${API_URL}/refine-prompt`, {
      prompt,
      context,
      tone,
    });
    return response.data.refinedPrompt;
  } catch (error) {
    console.error("Error refining prompt with AI:", error);
    throw error;
  }
};
