import React from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

const PromptList = ({ prompts }) => {
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
          </Paper>
        </motion.div>
      ))}
    </List>
  );
};

export default PromptList;
