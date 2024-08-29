import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const PromptTypeCard = ({ title, description }) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
    <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Paper>
  </motion.div>
);

const PromptTypeInfo = () => {
  return (
    <Box my={8}>
      <Typography variant="h2" align="center" gutterBottom>
        Prompt Types Explained
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PromptTypeCard
            title="Zero-Shot Prompting"
            description="Ideal for straightforward tasks. The AI generates responses without specific examples, using its pre-existing knowledge."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PromptTypeCard
            title="Few-Shot Prompting"
            description="Perfect for complex tasks. Provide a few examples to guide the AI, resulting in more accurate and contextually relevant outputs."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PromptTypeCard
            title="Chain-of-Thought Prompting"
            description="Best for problem-solving. Encourages the AI to break down complex problems into steps, providing detailed reasoning."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromptTypeInfo;
