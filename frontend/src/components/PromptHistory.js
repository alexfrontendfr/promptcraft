import React from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

const PromptHistory = ({ history }) => {
  return (
    <Paper elevation={3} style={{ marginTop: "2rem", padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Prompt History
      </Typography>
      <List>
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ListItem>
              <ListItemText
                primary={item.refinedPrompt}
                secondary={`Original: ${item.originalPrompt}`}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Paper>
  );
};

export default PromptHistory;
