# Virestis API — React & Redux E-Commerce Lab Backend

> TD-TP 3: Build an E-Commerce Backend — REST API with Node.js, Express.js, MongoDB, JWT, OAuth2, and rate limiting

- **Student name:** _ _ _ _ _ _ _ _ _ _ (fill in your name)
- **Application name:** Virestis
- **Module:** WAMD

## Application Description

This is the backend for the Virestis e-commerce app built in TD-TP 2 (React +
Redux frontend). It exposes a REST API that:

- manages the **product catalog** in MongoDB (full CRUD),
- handles **user registration and login**, hashing passwords with bcrypt,
- issues and verifies **JWTs** to protect product creation/modification/deletion,
- additionally exposes one endpoint protected by a real **OAuth2 / OpenID
  Connect** access token (verified against an external provider's JWKS), and
- applies **rate limiting** to the whole API, with a stricter limit on login.

The React frontend never talks to MongoDB directly — it only calls this API
over HTTP and receives JSON, matching the architecture diagram in the lab
statement.

```
React + Redux Frontend  --HTTP/JSON-->  Node.js + Express REST API  -->  MongoDB
```

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web framework / REST API routing |
| MongoDB | Database |
| Mongoose | MongoDB object modeling for Node.js |
| bcryptjs | Password hashing |
| jsonwebtoken | Signing and verifying our own JWTs |
| jwks-rsa | Fetching an OAuth2/OIDC provider's public signing keys |
| express-rate-limit | Rate limiting |
| cors | Allowing the React dev server to call the API |
| dotenv | Loading configuration from `.env` |
| mongodb-memory-server (dev only) | Automated smoke tests, no real DB needed |

## Project Structure

```
backend/
  server.js                    # Entry point: connects to MongoDB, starts Express
  src/
    app.js                     # Express app: middleware + routes
    config/
      db.js                    # Mongoose connection
    models/
      Product.js               # Product schema
      User.js                  # User schema (passwordHash only, never plain text)
    controllers/
      authController.js        # register, login
      productController.js     # CRUD handlers
    routes/
      authRoutes.js             # /api/auth/*
      productRoutes.js           # /api/products/*
      secureRoutes.js             # /api/secure/oauth (OAuth2 demo)
    middleware/
      auth.js                    # JWT verification (our own tokens)
      oauth2.js                   # OAuth2/OIDC access-token verification (JWKS)
      rateLimiter.js               # General + login rate limiters
      errorHandler.js               # 404 + centralized error -> status code mapping
    seed/
      seedProducts.js                # Populates sample products (mirrors the frontend catalog)
  scripts/
    smoke-test.js                     # Optional: automated end-to-end check (see below)
    ratelimit-test.js                  # Optional: verifies the login rate limiter
  postman_collection.json               # Importable Postman collection for manual testing
  .env.example                           # Template for your own .env
```

## Database Models

### Product
Represents an item available in the store.

| Field | Type | Notes |
|---|---|---|
| name | String | required |
| description | String | required |
| price | Number | required, >= 0 |
| category | String | required |
| imageUrl | String | required |
| stock | Number | required, >= 0, default 0 |
| createdAt / updatedAt | Date | automatic (`timestamps: true`) |

### User
Represents a registered customer.

| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique, lowercased |
| passwordHash | String | required, bcrypt hash only - **never** the plain password |
| createdAt / updatedAt | Date | automatic |

## JWT Authentication Mechanism

1. **Register** (`POST /api/auth/register`): the client sends `name`,
   `email`, `password`. The password is hashed with bcrypt
   (`bcrypt.hash(password, 10)`) and only the hash is stored — the plain
   password is never persisted or logged.
2. **Login** (`POST /api/auth/login`): the client sends `email` and
   `password`. The server looks up the user, compares the password against
   the stored hash with `bcrypt.compare`, and if valid, signs a JWT with
   `jsonwebtoken` containing the user's id and email as the payload. The
   secret used to sign the token comes from `process.env.JWT_SECRET` — it is
   **never hardcoded** in the source.
3. **Protected requests**: the client must send the token on every
   subsequent request to a protected endpoint, in the header:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
4. **Middleware** (`src/middleware/auth.js`): reads the `Authorization`
   header, rejects the request with `401` if it's missing/malformed, verifies
   the token's signature and expiry with `jwt.verify`, and either attaches
   the decoded user to `req.user` and calls `next()`, or returns `401` if the
   token is invalid/expired.

Product retrieval (`GET`) stays public per the lab scope; only product
creation, update and deletion require a valid JWT.

## REST API Endpoints

### Authentication

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Authenticate and return a JWT | Public (rate-limited) |

### Products

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products | Public |
| GET | `/api/products/:id` | Retrieve one product | Public |
| POST | `/api/products` | Create a product | JWT required |
| PUT | `/api/products/:id` | Update a product | JWT required |
| DELETE | `/api/products/:id` | Delete a product | JWT required |

### OAuth2 demo

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/api/secure/oauth` | Protected demo endpoint for testing the OAuth2 flow | OAuth2 access token required |

### Misc

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/api/health` | Health check | Public |

### Status codes used

- `200 OK` — successful retrieval or update
- `201 Created` — successful creation (register, create product)
- `400 Bad Request` — invalid input (missing fields, invalid ObjectId, etc.)
- `401 Unauthorized` — missing/invalid credentials or token
- `404 Not Found` — resource or route not found
- `409 Conflict` — duplicate email on registration
- `429 Too Many Requests` — rate limit exceeded
- `500 Internal Server Error` — unexpected server error

## Rate Limiting

Implemented with `express-rate-limit` in `src/middleware/rateLimiter.js`:

- **General API limiter** — 100 requests / 15 minutes per client IP, applied
  to every route in `src/app.js`.
- **Login limiter** — 5 requests / 15 minutes per client IP, applied only to
  `POST /api/auth/login`.

Once a limit is exceeded, the API responds with `429 Too Many Requests` and a
JSON message. You can verify this yourself with
`npm run ratelimit-test` (see below), or manually in Postman by sending the
login request 6+ times in a row.

## Installing and Running

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your own values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `MONGODB_URI` | MongoDB connection string (local or Atlas - see below) |
| `JWT_SECRET` | Long random string used to sign/verify JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `1h` |
| `CORS_ORIGIN` | Allowed frontend origin, e.g. `http://localhost:5173` |
| `OAUTH_ISSUER_BASE_URL` | Your OAuth2/OIDC provider's issuer URL (only needed for the `/api/secure/oauth` demo) |
| `OAUTH_AUDIENCE` | The API identifier/audience registered with your provider |

### 3. Configuring MongoDB

**Option A — Local MongoDB Community Server**

Install and run `mongod` locally, then use:
```
MONGODB_URI=mongodb://127.0.0.1:27017/virestis
```

**Option B — MongoDB Atlas (cloud, free tier)**

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow your current IP address.
3. Copy the connection string it gives you and use it as `MONGODB_URI`,
   e.g. `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/virestis`.

### 4. (Optional) Seed sample products

Populates the database with a small catalog (matching the frontend's demo
products) so the API can be tested immediately:

```bash
npm run seed
```

### 5. Run the server

```bash
npm run dev     # with nodemon (auto-restarts on file changes)
# or
npm start       # plain node
```

The API will be available at `http://localhost:5000` (or your configured
`PORT`).

### 6. (Optional) Run the automated checks

These spin up a real in-memory MongoDB instance (no setup required) and
exercise the whole API, including the rate limiter. They're a convenience
check during development — they do **not** replace the Postman/Thunder
Client testing required for this lab.

```bash
npm run smoke-test      # registers a user, logs in, full product CRUD, error cases
npm run ratelimit-test  # confirms the login endpoint returns 429 after 5 attempts
```

## Testing with Postman / Thunder Client

Import `postman_collection.json` into Postman (or Thunder Client in VS Code)
to get every request pre-built, including a script that automatically saves
the JWT returned by "Login" into a `token` collection variable for use by the
protected product requests.

Recommended test sequence (see lab section 10 for the full checklist):

1. **Auth**: register a new user → register again with the same email (expect
   `409`) → login with wrong password (expect `401`) → login with correct
   credentials (expect `200` + token).
2. **Products**: get all products → get one product → create a product
   without a token (expect `401`) → create a product with the token (expect
   `201`) → update it → delete it.
3. **Security**: try a protected request with an invalid/garbage token
   (expect `401`) and request an invalid product ID (expect `400`) or a
   non-existent one (expect `404`).
4. **Rate limiting**: send the login request 6+ times in a row and confirm
   the 6th response is `429 Too Many Requests`.

Take screenshots of these requests/responses for your submission.

## OAuth2 Testing

The `/api/secure/oauth` endpoint is protected by a real OAuth2/OIDC
access-token check (`src/middleware/oauth2.js`), independent from our own
JWT system. To test it end-to-end with Postman:

1. **Pick a free OAuth2/OIDC provider**, e.g. [Auth0](https://auth0.com)
   (recommended — free tier, supports Authorization Code + PKCE and OIDC
   Discovery out of the box). Create an application of type "Single Page
   Application" (so PKCE is used instead of a client secret), and an API
   (this becomes your `audience`).
2. In your `.env`, set:
   - `OAUTH_ISSUER_BASE_URL` to your tenant's issuer URL, e.g.
     `https://YOUR_TENANT.us.auth0.com/`
   - `OAUTH_AUDIENCE` to the API identifier you created, e.g.
     `https://virestis-api`
3. In Postman, open the **"Protected endpoint via OAuth2 access token"**
   request (OAuth2 demo folder), go to the **Authorization** tab, and choose
   **OAuth 2.0**.
4. Configure:
   - Grant type: **Authorization Code (With PKCE)**
   - Auth URL: `https://YOUR_TENANT.us.auth0.com/authorize`
   - Access Token URL: `https://YOUR_TENANT.us.auth0.com/oauth/token`
   - Client ID: your application's client ID
   - Redirect URI: exactly the callback URL registered with your provider
     (Postman shows this value - copy it into your provider's "Allowed
     Callback URLs")
   - Audience/Scope: your API identifier and e.g. `openid profile email`
5. Click **Get New Access Token**, authenticate in the popup, and click **Use
   Token**.
6. Send the request:
   - A **valid** token → `200 OK` with a confirmation message.
   - No token or an **invalid/expired** token → `401 Unauthorized`.

## CORS and Frontend Integration

`src/app.js` enables CORS for the origin configured in `CORS_ORIGIN`
(defaults to the Vite dev server at `http://localhost:5173`). For production,
set the frontend host's `VITE_API_URL` build variable to this service's base
URL (without `/api`), and set this service's `CORS_ORIGIN` to the frontend
origin (without a trailing slash). Redeploy the frontend after changing
`VITE_API_URL`; Vite embeds it in the production build.

All `/api/products` responses are plain JSON arrays/objects, so the React app
can fetch them directly, for example:

```js
fetch("http://localhost:5000/api/products")
  .then((res) => res.json())
  .then((products) => console.log(products));
```
