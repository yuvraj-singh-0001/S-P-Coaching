const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/api/config/db");
const routes = require("./src/routes/router");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// API routes
app.use("/api", routes);

// Test
app.get("/", (req, res) => {
  res.send("Server Running Successfully 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
