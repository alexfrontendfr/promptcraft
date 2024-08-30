import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { ContentCopy, Check } from "@mui/icons-material";
import { refinePromptWithAI } from "../services/aiPromptService";

const PromptForm = ({ onSubmit, addToHistory }) => {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await refinePromptWithAI(prompt, context, tone);
      setRefinedPrompt(result);
      onSubmit({
        originalPrompt: prompt,
        refinedPrompt: result,
        context,
        tone,
      });
      addToHistory({
        originalPrompt: prompt,
        refinedPrompt: result,
        context,
        tone,
      });
    } catch (error) {
      setError("Failed to refine prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          label="Context (optional)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tone</InputLabel>
          <Select value={tone} onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="neutral">Neutral</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? "Refining..." : "Refine Prompt"}
        </Button>
      </form>

      {refinedPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Refined Prompt"
            value={refinedPrompt}
            margin="normal"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopy}>
                  {copied ? <Check /> : <ContentCopy />}
                </IconButton>
              ),
            }}
          />
        </motion.div>
      )}

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </motion.div>
  );
};

export default PromptForm;
