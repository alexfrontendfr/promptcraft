import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const refinePromptWithAI = async (prompt, context, tone) => {
  try {
    const response = await axios.post(`${API_URL}/refine-prompt`, {
      prompt,
      context,
      tone,
    });
    if (response.data && response.data.refinedPrompt) {
      return response.data.refinedPrompt;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `Server error: ${
          error.response.data.error || error.response.statusText
        }`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response received from server. Please check your internet connection."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};
