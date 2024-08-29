import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const PromptForm = ({ onSubmit }) => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [technique, setTechnique] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/prompts`, {
        originalPrompt,
        technique,
      });
      onSubmit(response.data);
      setOriginalPrompt("");
      setTechnique("");
    } catch (error) {
      console.error("Error refining prompt:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default PromptForm;
