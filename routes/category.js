var express = require("express");
var categoryController = require("../controllers/category");
var router = express.Router();

//routes
router.post("/category", categoryController.createCategory);
router.get("/categories", categoryController.getCategories);

module.exports = router;
