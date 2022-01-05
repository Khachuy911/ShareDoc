const express = require("express");
const Route = express.Router();
const authController = require("../Controllers/authController");
const protect = require("../Middleware/protect");

Route.get("/login", authController.getLogin);
Route.get("/signup", authController.getSignup);
Route.get("/forgotPassword", authController.getForgotPw);
Route.get("/reset/:token", authController.getResetPw);
Route.get("/logout", protect.protect, authController.logout)

Route.post("/reset/:token", authController.resetPW);
Route.post("/forgotPassword", authController.forgotPw);
Route.post("/accessToken", authController.accessRefreshToken);
Route.post("/signup", authController.signup);
Route.post("/login", authController.login);

module.exports = Route;