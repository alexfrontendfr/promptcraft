const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const promptRoutes = require("./routes/prompts");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://alexfrontendfr.github.io",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

connectDB();

app.use("/api/prompts", promptRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
