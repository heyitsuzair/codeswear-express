const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/ProductController");
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
