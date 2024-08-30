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
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { refinePromptWithAI } from "../services/aiPromptService";

const PromptForm = ({ onSubmit }) => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [context, setContext] = useState("");
  const [technique, setTechnique] = useState("");
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const refinedPrompt = await refinePromptWithAI(
        originalPrompt,
        context,
        tone,
        technique
      );
      onSubmit({ originalPrompt, refinedPrompt, technique, tone, context });
      setSuccess(true);
      setOriginalPrompt("");
      setContext("");
      setTechnique("");
      setTone("");
    } catch (error) {
      setError(error.message || "An error occurred while refining the prompt");
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
        required
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
      <FormControl fullWidth margin="normal" required>
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
      <FormControl fullWidth margin="normal" required>
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
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Refining..." : "Refine Prompt"}
          </Button>
        </motion.div>
      </Box>
      <Snackbar
        open={error !== null}
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
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Prompt refined successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PromptForm;
