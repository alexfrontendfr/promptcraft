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
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { ContentCopy, Check } from "@mui/icons-material";
import { refinePromptWithAI } from "../services/aiPromptService";

// PromptForm component handles the main functionality of prompt refinement
const PromptForm = ({ onSubmit, addToHistory }) => {
  // State variables for form inputs and UI state
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the AI service to refine the prompt
      const result = await refinePromptWithAI(prompt, context, tone);
      setRefinedPrompt(result);

      // Update parent components with the new prompt data
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

  // Handle copying the refined prompt to clipboard
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Craft Your Prompt
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Prompt input field */}
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            margin="normal"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          {/* Context input field */}
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            label="Context (optional)"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            margin="normal"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          {/* Tone selection dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Tone</InputLabel>
            <Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
            </Select>
          </FormControl>

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
            sx={{ mt: 2, borderRadius: 2 }}
          >
            {isLoading ? "Refining..." : "Refine Prompt"}
          </Button>
        </form>

        {/* Display refined prompt if available */}
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
              sx={{
                mt: 4,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                backgroundColor: "rgba(78, 205, 196, 0.1)",
              }}
            />
          </motion.div>
        )}

        {/* Error message snackbar */}
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
        />
      </Paper>
    </motion.div>
  );
};

export default PromptForm;
