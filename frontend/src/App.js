import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import PromptList from "./components/PromptList";
import FeatureSection from "./components/FeatureSection";
import PromptTypeInfo from "./components/PromptTypeInfo";

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      backgroundImage: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#333",
    },
    body1: {
      fontSize: "1rem",
      color: "#555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          padding: "10px 20px",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          backgroundImage: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
          color: "white",
          "&:hover": {
            backgroundImage: "linear-gradient(45deg, #FF8E8E, #6EDFD9)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

const App = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetch prompts logic here
  }, []);

  const handleSubmit = async (promptData) => {
    // Submit prompt logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box my={8}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" align="center" gutterBottom>
              Craft Your Perfect Prompt
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Elevate your AI interactions with PromptCraft – Where Precision
              Meets Creativity
            </Typography>
          </motion.div>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
          <PromptForm onSubmit={handleSubmit} />
        </Paper>

        <FeatureSection />

        <Box my={8}>
          <Typography variant="h2" align="center" gutterBottom>
            Refined Prompts
          </Typography>
          <PromptList prompts={prompts} />
        </Box>

        <PromptTypeInfo />
      </Container>
    </ThemeProvider>
  );
};

export default App;
