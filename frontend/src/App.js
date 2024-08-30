import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Paper } from "@mui/material";
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
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchPrompts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/prompts`, {
        headers: token !== "guest" ? { Authorization: `Bearer ${token}` } : {},
      });
      setPrompts(response.data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPrompts();
    }
  }, [token, fetchPrompts]);

  const handleSubmit = async (promptData) => {
    try {
      const response = await axios.post(`${API_URL}/prompts`, promptData, {
        headers: token !== "guest" ? { Authorization: `Bearer ${token}` } : {},
      });
      setPrompts([response.data, ...prompts]);
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
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h2" align="center" gutterBottom>
          PromptCraft
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Refine your prompts with AI assistance
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          How to use PromptCraft:
        </Typography>
        <ol>
          <li>Enter your original prompt in the text field</li>
          <li>Provide context to help the AI understand your needs</li>
          <li>Select the desired tone for the refined prompt</li>
          <li>Choose a refinement technique</li>
          <li>Click "Refine Prompt" to generate an improved version</li>
        </ol>
        <Typography variant="body1" paragraph>
          PromptCraft uses advanced AI to enhance your prompts, making them more
          effective and tailored to your needs.
        </Typography>
      </Paper>

      <PromptForm onSubmit={handleSubmit} />
      <PromptList prompts={prompts} />
    </Container>
  );
};

export default App;
