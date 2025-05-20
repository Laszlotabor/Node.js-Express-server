const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, useremail, password } = req.body;

  console.log("Received request body:", req.body);

  if (!username || !useremail || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!!!");
  }

  const userAvailable = await User.findOne({ useremail });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!!!");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashPassword);

  const newUser = await User.create({
    username,
    useremail,
    password: hashPassword,
  });

  console.log("User created:", newUser);

  if (newUser) {
    return res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      useremail: newUser.useremail,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// Placeholder login and current user handlers
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user info" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
