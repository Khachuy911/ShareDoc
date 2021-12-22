const Route = require("express").Router();
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");
const subjectController = require("../Controllers/subjectController");

Route.route("/")
                .post(protect.protect, subjectController.create)
                .get(subjectController.get)

Route.route("/:id")
                .get(subjectController.getDetail)
                .put(protect.protect, subjectController.edit)
                .delete(protect.protect, subjectController.delete)

module.exports = Route;