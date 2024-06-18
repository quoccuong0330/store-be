const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { adminRoleMiddleware } = require("../middleware/authMiddleware");

router.post("/create", adminRoleMiddleware, ProductController.createProduct);
router.put("/update/:id", adminRoleMiddleware, ProductController.updateProduct);
router.get("/get-detail/:id", ProductController.getProduct);
router.get("/get-all", ProductController.getAll);
router.delete(
  "/delete/:id",
  adminRoleMiddleware,
  ProductController.deleteProduct
);

module.exports = router;
