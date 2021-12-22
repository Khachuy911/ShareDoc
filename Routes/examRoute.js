const express = require("express");
const Route = express.Router();
const examController = require("../Controllers/examController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");

Route.get("/download/", examController.download)
Route.route("/")
                .get(examController.get)
                
Route.route("/:id")
                .post(protect.protect, upload.array("examDetail", 10), examController.create)
                .get(examController.getDetail)
                .delete(protect.protect, examController.delete)
                .put(protect.protect, examController.edit)    
               
module.exports = Route;                
