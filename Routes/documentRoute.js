const express = require("express");
const Route = express.Router();
const documentController = require("../Controllers/documentController");
const upload = require("../Models/uploadModel");
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");

//Route.get("/download/",protect.protect, documentController.download);
Route.get("/download/", protect.protect, documentController.download);
Route.get("/detailDoc/:id", documentController.getDetail);
Route.get("/create/:id", documentController.getCreate);
Route.post("/create/:id", protect.protect, upload.array("docDetail", 10), documentController.create);
Route.get("/getAll",protect.protect,role("admin"), documentController.getAll);
Route.get("/delete/:id", protect.protect,role("admin") , documentController.delete)
Route.route("/:id")
                .get(documentController.get)
                .put(protect.protect, documentController.edit)

module.exports = Route;
