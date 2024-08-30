import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { ThumbUp, ThumbDown, ContentCopy } from "@mui/icons-material";

const PromptList = ({ prompts }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a snackbar notification here
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
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="h6" gutterBottom>
                    Refined Prompt:
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.primary"
                      sx={{ display: "inline", mb: 2 }}
                    >
                      {prompt.refinedPrompt}
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Original: {prompt.originalPrompt}
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Chip
                          label={`Technique: ${prompt.technique}`}
                          sx={{ mr: 1 }}
                        />
                        <Chip label={`Tone: ${prompt.tone}`} />
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => handleCopy(prompt.refinedPrompt)}
                        >
                          <ContentCopy />
                        </IconButton>
                        <IconButton>
                          <ThumbUp />
                        </IconButton>
                        <IconButton>
                          <ThumbDown />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                }
              />
            </ListItem>
          </Paper>
        </motion.div>
      ))}
    </List>
  );
};

export default PromptList;
