const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProduct,
} = require("../controllers/ProductController");
router.post("/", addProduct);
router.post("/:id", updateProduct);
router.get("/:category", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:slug", getProduct);

module.exports = router;
