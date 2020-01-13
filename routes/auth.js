var express = require("express");
var authController = require("../controllers/auth");

var router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/getuser", authController.getUser);

module.exports = router;
