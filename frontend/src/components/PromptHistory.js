import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const PromptHistory = ({ history }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Prompt History
      </Typography>
      <List aria-label="Prompt history">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ListItem
                sx={{
                  mb: 2,
                  backgroundColor: "rgba(78, 205, 196, 0.05)",
                  borderRadius: 2,
                }}
              >
                <ListItemText
                  primary={item.refinedPrompt}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Original: {item.originalPrompt}
                      </Typography>
                      <Chip
                        label={`Tone: ${item.tone}`}
                        size="small"
                        sx={{ mt: 1, mr: 1 }}
                      />
                      {item.context && (
                        <Chip
                          label="With Context"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Paper>
  );
};

export default PromptHistory;
