import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Rating,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PromptList = ({ prompts, token }) => {
  const handleRating = async (promptId, newValue) => {
    try {
      await axios.post(
        `${API_URL}/prompts/${promptId}/rate`,
        { rating: newValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // You might want to update the local state or refetch prompts here
    } catch (error) {
      console.error("Error rating prompt:", error);
    }
  };

  return (
    <List>
      {prompts.map((prompt, index) => (
        <motion.div
          key={prompt._id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Paper elevation={2} sx={{ mb: 3, p: 3 }}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" gutterBottom>
                    {prompt.refinedPrompt}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Original: {prompt.originalPrompt}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Technique: {prompt.technique}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography component="legend">Rate this prompt:</Typography>
              <Rating
                name={`rating-${prompt._id}`}
                value={prompt.rating || 0}
                onChange={(event, newValue) => {
                  handleRating(prompt._id, newValue);
                }}
              />
            </Box>
          </Paper>
        </motion.div>
      ))}
    </List>
  );
};

export default PromptList;
