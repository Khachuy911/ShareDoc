const express = require("express");
const Route = express.Router();
const projectController = require("../Controllers/projectController");
const protect = require("../Middleware/protect");
const upload = require("../Models/uploadModel");

Route.get("/download/",protect.protect, projectController.download)
Route.route("/")
                .get(projectController.get)
                
Route.route("/:id")
                .post(protect.protect, upload.array("proDetail", 10), projectController.create)
                .get(projectController.getDetail)
                .delete(protect.protect, projectController.delete)
                .put(protect.protect, projectController.edit)    
                
module.exports = Route;     