import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Client-side prompt refinement function
const refinePromptLocally = (originalPrompt, technique) => {
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

const PromptForm = ({ onSubmit }) => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [technique, setTechnique] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!originalPrompt || !technique) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const refinedPrompt = refinePromptLocally(originalPrompt, technique);

    try {
      const response = await axios.post(`${API_URL}/prompts`, {
        originalPrompt,
        refinedPrompt,
        technique,
      });
      onSubmit(response.data);
      setOriginalPrompt("");
      setTechnique("");
    } catch (error) {
      console.error("Error refining prompt:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while refining the prompt"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Prompt"
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
          <InputLabel>Refinement Technique</InputLabel>
          <Select
            value={technique}
            onChange={(e) => setTechnique(e.target.value)}
          >
            <MenuItem value="zero-shot">Zero-Shot</MenuItem>
            <MenuItem value="few-shot">Few-Shot</MenuItem>
            <MenuItem value="chain-of-thought">Chain-of-Thought</MenuItem>
          </Select>
        </FormControl>
        <Box textAlign="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Refining..." : "Refine Prompt"}
            </Button>
          </motion.div>
        </Box>
      </form>
    </Box>
  );
};

export default PromptForm;
