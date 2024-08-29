import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PromptForm = ({ onSubmit }) => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [technique, setTechnique] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
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
      setError(
        error.response?.data?.message ||
          "An error occurred while refining the prompt"
      );
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
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PromptForm;
