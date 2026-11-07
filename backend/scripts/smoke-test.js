/**
 * Lightweight end-to-end smoke test.
 *
 * Spins up a real in-memory MongoDB instance (no external DB or network
 * required) and exercises every API endpoint once, printing the status
 * code and response for each call. This is a convenience check for
 * development - it does NOT replace the required Postman/Thunder Client
 * testing described in the README.
 *
 * Run with: npm run smoke-test
 */
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "smoke_test_secret";
process.env.JWT_EXPIRES_IN = "1h";
process.env.CORS_ORIGIN = "*";

let failures = 0;

function check(label, condition) {
  const icon = condition ? "OK  " : "FAIL";
  if (!condition) failures += 1;
  console.log(`[${icon}] ${label}`);
}

async function main() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  await mongoose.connect(process.env.MONGODB_URI);

  const app = require("../src/app");
  const server = app.listen(0);
  const port = server.address().port;
  const base = `http://localhost:${port}`;

  const json = (body) => ({ headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

  // --- Auth ---
  let res = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    ...json({ name: "Test User", email: "test@example.com", password: "password123" }),
  });
  check("register new user -> 201", res.status === 201);

  res = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    ...json({ name: "Test User", email: "test@example.com", password: "password123" }),
  });
  check("register duplicate email -> 409", res.status === 409);

  res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    ...json({ email: "test@example.com", password: "wrongpassword" }),
  });
  check("login with wrong password -> 401", res.status === 401);

  res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    ...json({ email: "test@example.com", password: "password123" }),
  });
  const loginBody = await res.json();
  check("login with correct credentials -> 200 + token", res.status === 200 && !!loginBody.token);
  const token = loginBody.token;

  // --- Products (public reads) ---
  res = await fetch(`${base}/api/products`);
  check("get all products (public) -> 200", res.status === 200);

  // --- Products (protected writes) ---
  res = await fetch(`${base}/api/products`, {
    method: "POST",
    ...json({ name: "Test Product", description: "desc", price: 9.99, category: "Test", imageUrl: "http://x", stock: 5 }),
  });
  check("create product without token -> 401", res.status === 401);

  res = await fetch(`${base}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: "Test Product", description: "desc", price: 9.99, category: "Test", imageUrl: "http://x", stock: 5 }),
  });
  const createBody = await res.json();
  check("create product with token -> 201", res.status === 201);
  const productId = createBody._id;

  res = await fetch(`${base}/api/products/${productId}`);
  const fetchedProduct = await res.json();
  check("get product by id -> 200", res.status === 200 && fetchedProduct.name === "Test Product");

  res = await fetch(`${base}/api/products/not-a-valid-id`);
  check("get product with invalid id -> 400", res.status === 400);

  res = await fetch(`${base}/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ price: 19.99 }),
  });
  const updatedProduct = await res.json();
  check("update product with token -> 200", res.status === 200 && updatedProduct.price === 19.99);

  res = await fetch(`${base}/api/products/${productId}`, { method: "DELETE" });
  check("delete product without token -> 401", res.status === 401);

  res = await fetch(`${base}/api/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  check("delete product with token -> 200", res.status === 200);

  res = await fetch(`${base}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer not-a-real-token" },
    body: JSON.stringify({ name: "x" }),
  });
  check("create product with invalid token -> 401", res.status === 401);

  // --- Misc ---
  res = await fetch(`${base}/api/health`);
  check("health check -> 200", res.status === 200);

  res = await fetch(`${base}/api/this-route-does-not-exist`);
  check("unknown route -> 404", res.status === 404);

  server.close();
  await mongoose.connection.close();
  await mongod.stop();

  console.log(failures === 0 ? "\nAll smoke tests passed." : `\n${failures} smoke test(s) failed.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("Smoke test crashed:", error);
  process.exit(1);
});
