const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

        // token = authHeader.split(" ")[1];
        // jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        //     if (error) {
        //         res.status(401);
        //         throw new Error("Not authorized, token failed");
        //     }
        //     console.log(decoded);
        //     req.user = decoded.user;
        //     next();
        // });
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});


module.exports = {validateTokenHandler};