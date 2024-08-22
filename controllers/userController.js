const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

//@desc Register a user
//@route POST /api/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password: hashedPassword
    });

});
//@desc Login a user
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send("Login route");
});
//@desc Get user profile
//@route GET /api/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("Profile route");
});
//@desc Update user profile
//@route PUT /api/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("Update profile route");
});

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};