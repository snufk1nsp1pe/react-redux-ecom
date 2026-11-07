const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// Generic OAuth2 / OpenID Connect access-token verification.
//
// Unlike the JWT middleware above (which verifies tokens *we* issued with
// our own secret), this middleware verifies access tokens issued by an
// external OAuth2/OIDC provider (Auth0, Okta, Keycloak, Google, ...).
// It fetches the provider's public signing keys from its JWKS endpoint
// and validates the token's signature, issuer and audience against it.
//
// Configure OAUTH_ISSUER_BASE_URL and OAUTH_AUDIENCE in .env to point this
// at your own provider (see README "OAuth2 testing" section).
let jwks;

function getJwksClient() {
  if (!jwks) {
    const issuer = process.env.OAUTH_ISSUER_BASE_URL;
    if (!issuer) {
      throw new Error("OAUTH_ISSUER_BASE_URL is not configured");
    }
    jwks = jwksClient({
      jwksUri: new URL(".well-known/jwks.json", issuer).toString(),
      cache: true,
      rateLimit: true,
    });
  }
  return jwks;
}

function getSigningKey(header, callback) {
  getJwksClient().getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

function requireOAuth2(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or malformed Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    getSigningKey,
    {
      issuer: process.env.OAUTH_ISSUER_BASE_URL,
      audience: process.env.OAUTH_AUDIENCE,
    },
    (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired OAuth2 access token" });
      }
      req.oauthUser = payload;
      next();
    },
  );
}

module.exports = requireOAuth2;
