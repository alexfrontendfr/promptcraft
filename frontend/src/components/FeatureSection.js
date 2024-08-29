import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Lightbulb, Zap, Rocket } from "lucide-react";

const FeatureItem = ({ icon, title, description }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Box textAlign="center" p={3}>
      {icon}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </motion.div>
);

const FeatureSection = () => {
  return (
    <Box my={8}>
      <Typography variant="h2" align="center" gutterBottom>
        Why PromptCraft?
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FeatureItem
            icon={<Lightbulb size={48} color="#FF6B6B" />}
            title="Intelligent Refinement"
            description="Our AI-powered system analyzes and enhances your prompts for optimal results."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureItem
            icon={<Zap size={48} color="#4ECDC4" />}
            title="Lightning Fast"
            description="Get instant refinements and suggestions to improve your prompts in seconds."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureItem
            icon={<Rocket size={48} color="#45B7D1" />}
            title="Boost Creativity"
            description="Unlock new possibilities and ideas with our advanced prompt engineering techniques."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeatureSection;
