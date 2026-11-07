const rateLimit = require("express-rate-limit");

// General API rate limit: 100 requests per 15 minutes per client IP.
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Stricter limit on the login endpoint to slow down brute-force attempts:
// 5 attempts per 15 minutes per client IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later." },
});

module.exports = { generalLimiter, loginLimiter };
