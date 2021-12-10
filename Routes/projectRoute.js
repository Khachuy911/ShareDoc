const express = require("express");
const Route = express.Router();
const projectController = require("../Controllers/projectController");

Route.route("/")
                .get(projectController.get)
                .post(projectController.post)
                
Route.route("/:id")
                .get(projectController.getDetail)
                .delete(projectController.delete)
                .put(projectController.edit)    
                
module.exports = Route;     