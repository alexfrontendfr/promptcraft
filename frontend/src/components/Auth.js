import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setError = useState("");
  const setSuccess = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await axios.post(`${API_URL}${endpoint}`, {
        username,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else if (!isLogin) {
        setSuccess("Registration successful! Please log in.");
        setIsLogin(true);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleContinueWithoutAccount = () => {
    setToken("guest");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {isLogin ? "Welcome Back" : "Join PromptCraft"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
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
              variant="outlined"
            />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </motion.div>
            <Box textAlign="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsLogin(!isLogin)}
                sx={{ textDecoration: "none" }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </Box>
            <Box textAlign="center" mt={2}>
              <Link
                component="button"
                variant="body2"
                onClick={handleContinueWithoutAccount}
                sx={{ textDecoration: "underline" }}
              >
                Continue without logging in
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Auth;
