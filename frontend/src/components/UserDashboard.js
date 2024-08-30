import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserDashboard = ({ token }) => {
  const [userPrompts, setUserPrompts] = useState([]);
  const [promptStats, setPromptStats] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const promptsResponse = await axios.get(`${API_URL}/prompts/user`, {
          headers: { "x-auth-token": token },
        });
        setUserPrompts(promptsResponse.data);

        const statsResponse = await axios.get(`${API_URL}/prompts/stats`, {
          headers: { "x-auth-token": token },
        });
        setPromptStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Prompt History</Typography>
            <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
              {userPrompts.map((prompt) => (
                <Box key={prompt._id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {prompt.refinedPrompt}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Technique: {prompt.technique}, Tone: {prompt.tone}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Your Prompt Stats</Typography>
            {promptStats && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={promptStats.techniqueUsage}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;
