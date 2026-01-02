require("dotenv").config();   // note : Load before anything else ,dotenv was loading AFTER your email utility file, so the Brevo API key was read as empty.

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/api/config/db");
const routes = require("./src/routes/router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use("/api", routes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running Successfully 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
