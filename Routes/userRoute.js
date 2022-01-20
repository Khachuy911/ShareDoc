const Route = require("express").Router();
const userController = require("../Controllers/userController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");

Route.get("/getMe", protect.protect, userController.getMe)
Route.post("/getMe", protect.protect, upload.single("avatar"), userController.edit)
Route.get("/admin", protect.protect, role("admin"), userController.getAllUser);
Route.get("/delete/:id", protect.protect, role("admin"), userController.delete);
module.exports = Route;                
