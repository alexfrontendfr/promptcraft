import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import PromptList from "./components/PromptList";
import Auth from "./components/Auth";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const App = () => {
  const [prompts, setPrompts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchPrompts();
    }
  }, [token]);

  const fetchPrompts = async () => {
    try {
      const response = await axios.get(`${API_URL}/prompts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrompts(response.data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  const handleSubmit = async (promptData) => {
    try {
      const response = await axios.post(`${API_URL}/prompts`, promptData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrompts([response.data, ...prompts]);
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Auth setToken={setToken} />
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Prompt Refinement
        </Typography>
        <PromptForm onSubmit={handleSubmit} />
        <Typography variant="h5" component="h2" gutterBottom>
          Refined Prompts
        </Typography>
        <PromptList prompts={prompts} />
      </Container>
    </div>
  );
};

export default App;
