const Order = require("../models/Order");

// POST /api/orders (JWT required)
async function createOrder(req, res, next) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId || item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl || item.image,
    }));

    for (const item of normalizedItems) {
      if (!item.productId || !item.name || item.price === undefined || !item.quantity) {
        return res.status(400).json({
          message: "Each item needs productId, name, price and quantity",
        });
      }
    }

    const total = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user.id,
      items: normalizedItems,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

// GET /api/orders/mine (JWT required)
async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, getMyOrders };
