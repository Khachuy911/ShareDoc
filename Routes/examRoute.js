const express = require("express");
const Route = express.Router();
const examController = require("../Controllers/examController");
const upload = require("../Models/uploadModel");

Route.get("/download/", examController.download)
Route.route("/")
                .get(examController.get)
                .post(upload.array("examDetail", 10), examController.create)

Route.route("/:id")
                .get(examController.getDetail)
                .delete(examController.delete)
                .put(examController.edit)    
               
module.exports = Route;                