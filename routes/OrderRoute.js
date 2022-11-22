const express = require("express");
const { getOrders, addOrder } = require("../controllers/OrderController");
const router = express.Router();
router.get("/get-orders", getOrders);
router.post("/add-order", addOrder);

module.exports = router;
