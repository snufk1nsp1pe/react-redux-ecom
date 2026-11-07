// Catches requests that didn't match any route.
function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Centralized error handler. Any error passed to next(error) ends up here.
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "A record with this value already exists" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || "Internal server error" });
}

module.exports = { notFound, errorHandler };
