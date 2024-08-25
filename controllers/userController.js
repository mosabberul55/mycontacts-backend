const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
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
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
//@desc Login a user
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
        const token = jwt.sign({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }, process.env.JWT_SECRET, {expiresIn: "30d"});
        res.status(200).json({token});

    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
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