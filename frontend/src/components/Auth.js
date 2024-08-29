import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await axios.post(`${API_URL}${endpoint}`, {
        username,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5">{isLogin ? "Login" : "Register"}</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {isLogin ? "Login" : "Register"}
      </Button>
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Need an account? Register"
          : "Already have an account? Login"}
      </Button>
    </Box>
  );
};

export default Auth;
