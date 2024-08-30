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
import { refinePromptWithAI } from "../services/aiPromptService";

const API_URL = process.env.REACT_APP_API_URL;

const PromptForm = ({ onSubmit }) => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [context, setContext] = useState("");
  const [technique, setTechnique] = useState("");
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let refinedPrompt;
      if (technique === "ai-powered") {
        refinedPrompt = await refinePromptWithAI(originalPrompt, context, tone);
      } else {
        // Use your existing refinement logic here
        refinedPrompt = originalPrompt; // Placeholder
      }

      const response = await axios.post(`${API_URL}/prompts`, {
        originalPrompt,
        refinedPrompt,
        technique,
        tone,
        context,
      });
      onSubmit(response.data);
      setOriginalPrompt("");
      setContext("");
      setTechnique("");
      setTone("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while refining the prompt"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Your Prompt"
        value={originalPrompt}
        onChange={(e) => setOriginalPrompt(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Context (optional)"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Refinement Technique</InputLabel>
        <Select
          value={technique}
          onChange={(e) => setTechnique(e.target.value)}
        >
          <MenuItem value="zero-shot">Zero-Shot</MenuItem>
          <MenuItem value="few-shot">Few-Shot</MenuItem>
          <MenuItem value="chain-of-thought">Chain-of-Thought</MenuItem>
          <MenuItem value="ai-powered">AI-Powered</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tone</InputLabel>
        <Select value={tone} onChange={(e) => setTone(e.target.value)}>
          <MenuItem value="formal">Formal</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="creative">Creative</MenuItem>
        </Select>
      </FormControl>
      <Box textAlign="center" mt={3}>
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
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PromptForm;
