const express = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const requireAuth = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, getMyOrders);

module.exports = router;
