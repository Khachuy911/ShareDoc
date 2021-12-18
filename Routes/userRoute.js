const Route = require("express").Router();
const userController = require("../Controllers/userController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");

Route.route("/")
                .put(protect.protect, upload.single("avatar"), userController.edit)
                .get(protect.protect, userController.getMe)
module.exports = Route;                
