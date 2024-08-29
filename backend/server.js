const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const promptRoutes = require("./routes/prompts");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/prompts", promptRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
