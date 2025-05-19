const asyncHandler = require("express-async-handler");

// @desc register a user
// @route GET/api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register user" });
});

// @desc login a user
// @route post/api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" });
});

// @desc current user
// @route post/api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user info" });
});

module.exports = { registerUser, loginUser,currentUser };