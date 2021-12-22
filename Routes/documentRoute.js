const express = require("express");
const Route = express.Router();
const documentController = require("../Controllers/documentController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");

Route.get("/download/",protect.protect, documentController.download)
Route.route("/")
                .get(documentController.get)
                
Route.route("/:id")
                .post(protect.protect, upload.array("docDetail", 10), documentController.create)
                .get(documentController.getDetail)
                .put(protect.protect, documentController.edit)
                .delete(protect.protect,role(["admin"]) , documentController.delete)

module.exports = Route;
