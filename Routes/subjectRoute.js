const Route = require("express").Router();
const protect = require("../Middleware/protect");
const role = require("../Middleware/authorization");
const subjectController = require("../Controllers/subjectController");

Route.get("/create", protect.protect, role("admin"), subjectController.getCreate);
Route.post("/create", protect.protect, role("admin"), subjectController.create)

Route.get("/search", subjectController.search);
Route.get("/", subjectController.get)
Route.get("/admin", subjectController.getAdmin)
Route.get("/delete/:id", protect.protect,role("admin") , subjectController.delete)

Route.route("/:id")
                .get(subjectController.getDetail)
                .put(protect.protect, subjectController.edit)

module.exports = Route;