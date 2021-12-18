const express = require("express");
const Route = express.Router();
const authController = require("../Controllers/authController");
const protect = require("../Middleware/protect");

Route.post("/reset/:token", authController.resetPW);
Route.post("/forgotPassword", authController.forgotPw);
Route.post("/accessToken", authController.accessRefreshToken);
Route.post("/signup", authController.signup);
Route.post("/login", authController.login);

module.exports = Route;