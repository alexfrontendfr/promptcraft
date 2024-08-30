import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import PromptList from "./components/PromptList";
import Auth from "./components/Auth";

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
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [prompts, setPrompts] = useState([]);
  const [latestRefinedPrompt, setLatestRefinedPrompt] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchPrompts(token);
    }
  }, [token]);

  const fetchPrompts = async () => {
    try {
      const response = await axios.get(`${API_URL}/prompts`, {
        headers: token !== "guest" ? { Authorization: `Bearer ${token}` } : {},
      });
      setPrompts(response.data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  const handleSubmit = async (promptData) => {
    try {
      const response = await axios.post(`${API_URL}/prompts`, promptData, {
        headers: token !== "guest" ? { Authorization: `Bearer ${token}` } : {},
      });
      setPrompts([response.data, ...prompts]);
      setLatestRefinedPrompt(response.data);
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm">
          <Auth setToken={setToken} />
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setToken={setToken} isGuest={token === "guest"} />
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

        {latestRefinedPrompt && (
          <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
            <Typography variant="h6" gutterBottom>
              Latest Refined Prompt:
            </Typography>
            <Typography variant="body1">
              {latestRefinedPrompt.refinedPrompt}
            </Typography>
          </Paper>
        )}

        <Box my={8}>
          <Typography variant="h2" align="center" gutterBottom>
            Refined Prompts
          </Typography>
          <PromptList prompts={prompts} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
