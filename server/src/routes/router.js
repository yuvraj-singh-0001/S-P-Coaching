const express = require("express");
const { register, login } = require("../controllers/auth");
const auth = require("../middlewares/auth");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected Test
router.get("/secure", auth, (req, res) => {
  res.json({ message: "Protected Route Working", user: req.user });
});

module.exports = router;
