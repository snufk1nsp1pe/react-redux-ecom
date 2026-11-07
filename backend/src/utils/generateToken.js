const jwt = require("jsonwebtoken");

// Signs a short-lived JWT identifying the given user.
// The secret is read from the environment - never hardcoded.
function generateToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

module.exports = generateToken;
