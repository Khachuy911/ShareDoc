const express = require("express");
const Route = express.Router();
const examController = require("../Controllers/examController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");;

Route.get("/download/", examController.download)
Route.get("/detailexam/:id", examController.getDetail)
Route.get("/create/:id", examController.getCreate);
Route.post("/create/:id", protect.protect, upload.array("examDetail", 10), examController.create);
Route.get("/getAll",protect.protect,role("admin"), examController.getAll);
Route.get("/delete/:id", protect.protect,role("admin") , examController.delete)
Route.route("/:id")
                .get(examController.get)             
                .delete(protect.protect, examController.delete)
                .put(protect.protect, examController.edit)    
               
module.exports = Route;                
