const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getUserProfile, updateUserProfile} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

module.exports = router;