const express = require("express");
const Route = express.Router();
const documentController = require("../Controllers/documentController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");

Route.get("/download/", documentController.download)
Route.route("/")
                .get(documentController.get)
                .post(protect.protect, upload.array("docDetail", 10), documentController.create)

Route.route("/:id")
                .get(documentController.getDetail)
                .put(protect.protect, documentController.edit)
                .delete(protect.protect,role(["admin"]) , documentController.delete)

module.exports = Route;
