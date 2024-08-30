import axios from "axios";

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

export const refinePromptWithAI = async (prompt, context, tone, technique) => {
  try {
    console.log("API Key:", HUGGING_FACE_API_KEY); // Remove this in production
    console.log("Sending request to:", HUGGING_FACE_API_URL);
    let inputText = "";
    switch (technique) {
      case "zero-shot":
        inputText = `Refine the following prompt without any additional context. Prompt: ${prompt}`;
        break;
      case "few-shot":
        inputText = `Here are some examples of refined prompts:
        Original: "Write a story"
        Refined: "Craft a compelling short story set in a dystopian future, focusing on themes of hope and resilience."
        
        Original: "Explain quantum computing"
        Refined: "Provide a concise explanation of quantum computing, highlighting its key principles and potential applications in layman's terms."
        
        Now, refine the following prompt: ${prompt}`;
        break;
      case "chain-of-thought":
        inputText = `Let's refine this prompt step by step:
        1. Understand the core idea: ${prompt}
        2. Consider the context: ${context}
        3. Apply the desired tone: ${tone}
        4. Expand on key points
        5. Ensure clarity and specificity
        
        Refined prompt:`;
        break;
      case "ai-powered":
      default:
        inputText = `You are an expert prompt engineer. Your task is to refine and improve the following prompt to make it more effective, clear, and likely to generate high-quality responses.

        Original Prompt: ${prompt}
        Context: ${context}
        Desired Tone: ${tone}
        
        Please provide a refined version of the prompt that:
        1. Incorporates the given context
        2. Matches the desired tone
        3. Is more specific and detailed
        4. Encourages thoughtful and comprehensive responses
        
        Refined Prompt:`;
    }

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

    console.log("API Response:", response.data);

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
