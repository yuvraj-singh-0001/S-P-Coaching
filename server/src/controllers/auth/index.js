const express = require("express");
const router = express.Router();

const signup = require("../../api/auth/signup");
const login = require("../../api/auth/login");
const logout = require("../../api/auth/logout");
const me = require("../../api/auth/me");

// AUTH ROUTES
router.get("/me", me);

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
