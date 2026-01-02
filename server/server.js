require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/api/config/db");
const routes = require("./src/routes/router");

const app = express();

// ===== CORS (IMPORTANT FOR LOGIN COOKIES) =====
app.use(
  cors({
    origin: "http://localhost:3100", // your frontend URL
    credentials: true
  })
);

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cookieParser());

// ===== DATABASE =====
connectDB();

// ===== ROUTES =====
app.use("/api", routes);

// ===== TEST =====
app.get("/", (req, res) => {
  res.send("Server Running Successfully 🚀");
});

// ===== PORT =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
