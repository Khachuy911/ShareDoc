const express = require("express");
const Route = express.Router();
const documentController = require("../Controllers/documentController");
const upload = require("../Models/uploadModel");

Route.get("/download/", documentController.download)
Route.route("/")
                .get(documentController.get)
                .post(upload.array("docDetail", 10), documentController.create)

Route.route("/:id")
                .get(documentController.getDetail)
                .put(documentController.edit)
                .delete(documentController.delete)

module.exports = Route;
