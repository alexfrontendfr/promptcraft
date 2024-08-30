import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import PromptForm from "./components/PromptForm";
import PromptHistory from "./components/PromptHistory";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const App = () => {
  const [history, setHistory] = useState([]);

  const addToHistory = (promptData) => {
    setHistory((prevHistory) => [promptData, ...prevHistory.slice(0, 9)]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PromptCraft</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box my={4}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" align="center" gutterBottom>
              PromptCraft
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Refine your prompts with AI assistance
            </Typography>
          </motion.div>
        </Box>
        <PromptForm onSubmit={console.log} addToHistory={addToHistory} />
        <PromptHistory history={history} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
