const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get All Users
router.get("/users", getAllUsers);

module.exports = router;

