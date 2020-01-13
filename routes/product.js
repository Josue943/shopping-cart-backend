var express = require("express");
var productController = require("../controllers/product");
var router = express.Router();
//middlewares
var mdAuth = require("../middlewares/authenticated");

//mdAuth.ensureAuth
//ROUTES
router.post("/product", mdAuth.ensureAuth, productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProduct);
router.put("/product/:id", mdAuth.ensureAuth, productController.updateProduct);
router.delete("/product/:id", mdAuth.ensureAuth, productController.deleteProduct);

module.exports = router;
