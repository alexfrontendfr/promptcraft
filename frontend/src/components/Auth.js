import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await axios.post(`${API_URL}${endpoint}`, {
        username,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        setError(response.data.message || "Authentication successful");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleContinueWithoutAccount = () => {
    setToken("guest");
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setIsLogin(!isLogin)}
            sx={{ mb: 1 }}
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={handleContinueWithoutAccount}
            sx={{ fontSize: "0.9rem" }}
          >
            Continue without an account
          </Button>
        </Box>
      </CardContent>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Auth;
