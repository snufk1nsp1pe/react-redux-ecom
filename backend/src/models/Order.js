const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    imageUrl: { type: String },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [(v) => v.length > 0, "Order must contain at least one item"],
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
