const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

//---------------------------------------------------------------------------------------------------------
// @desc    login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { useremail, password } = req.body;
  if (!useremail || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ useremail });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        useremail: user.useremail,
        id: user.id
      }
    }, process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password not valid!!!!")
  }
  
});
//---------------------------------------------------------------------------------------------------------
// @desc    current user
// @route   POST /api/users/current
// @access  Public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user info" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
