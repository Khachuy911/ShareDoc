const Route = require("express").Router();
const userController = require("../Controllers/userController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");

Route.get("/admin", protect.protect, role("admin"), userController.getAllUser);
Route.get("/delete/:id", protect.protect, role("admin"), userController.delete);
Route.route("/")
                .put(protect.protect, upload.single("avatar"), userController.edit)
                .get(protect.protect, userController.getMe)
module.exports = Route;                
