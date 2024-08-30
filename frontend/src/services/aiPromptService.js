import axios from "axios";

const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/opt-1.3b";
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

export const refinePromptWithAI = async (prompt, context, tone) => {
  try {
    const inputText = `Context: ${context}\nTone: ${tone}\nRefine the following prompt:\n${prompt}`;
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: inputText },
      { headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` } }
    );
    return response.data[0].generated_text;
  } catch (error) {
    console.error("Error refining prompt with AI:", error);
    throw error;
  }
};
