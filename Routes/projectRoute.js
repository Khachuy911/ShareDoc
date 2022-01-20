const express = require("express");
const Route = express.Router();
const projectController = require("../Controllers/projectController");
const protect = require("../Middleware/protect");
const upload = require("../Models/uploadModel");
const role = require("../Middleware/authorization");

Route.get("/download/", protect.protect, projectController.download);
Route.get("/detailpro/:id", projectController.getDetail);
Route.get("/create/:id", projectController.getCreate);
Route.post("/create/:id", protect.protect, upload.array("proDetail", 10), projectController.create);
Route.get("/getAll",protect.protect,role("admin"), projectController.getAll);
Route.get("/delete/:id", protect.protect,role("admin") , projectController.delete)

Route.route("/:id")
                .get(projectController.get)                
                .put(protect.protect, projectController.edit)    
                
module.exports = Route;     