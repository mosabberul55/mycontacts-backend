const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getUserProfile, updateUserProfile} = require("../controllers/userController");
const {validateTokenHandler} = require("../middleware/validateTokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(validateTokenHandler, getUserProfile).put(validateTokenHandler, updateUserProfile);

module.exports = router;