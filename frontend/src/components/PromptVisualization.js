import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

const PromptVisualization = ({ originalPrompt, refinedPrompt }) => {
  const comparePrompts = () => {
    const original = originalPrompt.split(" ");
    const refined = refinedPrompt.split(" ");
    const result = [];

    for (let i = 0; i < Math.max(original.length, refined.length); i++) {
      if (original[i] !== refined[i]) {
        result.push(
          <motion.span
            key={i}
            initial={{ backgroundColor: "#FF6B6B" }}
            animate={{ backgroundColor: "#4ECDC4" }}
            transition={{ duration: 1 }}
          >
            {refined[i] || ""}
          </motion.span>
        );
      } else {
        result.push(<span key={i}>{original[i] || ""}</span>);
      }
      result.push(" ");
    }

    return result;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Prompt Transformation
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Original Prompt:</Typography>
        <Typography variant="body1">{originalPrompt}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1">Refined Prompt:</Typography>
        <Typography variant="body1">{comparePrompts()}</Typography>
      </Box>
    </Paper>
  );
};

export default PromptVisualization;
