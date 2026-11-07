const express = require("express");
const requireOAuth2 = require("../middleware/oauth2");

const router = express.Router();

// Demo endpoint used specifically to practice the OAuth 2.0 Authorization
// Code + PKCE flow in Postman/Thunder Client (see README "OAuth2 testing").
// Unlike the product routes (protected with our own JWT), this route only
// accepts an access token issued by the external OAuth2/OIDC provider
// configured via OAUTH_ISSUER_BASE_URL / OAUTH_AUDIENCE.
router.get("/oauth", requireOAuth2, (req, res) => {
  res.status(200).json({
    message: "You successfully accessed a protected endpoint using an OAuth2 access token.",
    tokenSubject: req.oauthUser.sub,
  });
});

module.exports = router;
