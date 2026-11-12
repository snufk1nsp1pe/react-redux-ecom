const express = require("express");
const cors = require("cors");
const { generalLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const secureRoutes = require("./routes/secureRoutes");

const app = express();

// <<<<<<< HEAD
// // Needed so express-rate-limit sees the real client IP behind Render/Railway/etc.
// app.set("trust proxy", 1);

// function parseCorsOrigin(value) {
//   if (!value || value.trim() === "*") return true;
//   const list = value
//     .split(",")
//     .map((origin) => origin.trim().replace(/\/+$/, ""))
//     .filter(Boolean);
//   return list.length <= 1 ? list[0] || true : list;
// }

// app.use(
//   cors({
//     origin: parseCorsOrigin(process.env.CORS_ORIGIN),
//   }),
// );
// =======
// Only allow requests from the configured frontend origin (the React dev
// server from TD-TP 2 by default).
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
// >>>>>>> parent of 603a691 (bb)
app.use(express.json());

// Applied to every route: 100 requests per 15 minutes per client IP.
app.use(generalLimiter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/secure", secureRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
