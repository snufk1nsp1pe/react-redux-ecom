const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { generalLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const secureRoutes = require("./routes/secureRoutes");

const app = express();

app.set("trust proxy", 1);

function parseCorsOrigin(value) {
  if (!value || value.trim() === "*") return true;
  const origins = value
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
  return origins.length <= 1 ? origins[0] || true : origins;
}

app.use(cors({ origin: parseCorsOrigin(process.env.CORS_ORIGIN) }));
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

app.use("/api", notFound);

const frontendDistPath = path.resolve(__dirname, "../../dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

if (fs.existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    res.sendFile(frontendIndexPath, (error) => {
      if (error) next(error);
    });
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
