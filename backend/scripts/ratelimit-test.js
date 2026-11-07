/**
 * Focused check that the login rate limiter kicks in after 5 attempts
 * within the configured window, returning 429 Too Many Requests.
 * Run with: node scripts/ratelimit-test.js
 */
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "smoke_test_secret";
process.env.CORS_ORIGIN = "*";

async function main() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  await mongoose.connect(process.env.MONGODB_URI);

  const app = require("../src/app");
  const server = app.listen(0);
  const port = server.address().port;
  const base = `http://localhost:${port}`;

  const attempt = () =>
    fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "nobody@example.com", password: "wrong" }),
    });

  const statuses = [];
  for (let i = 0; i < 7; i += 1) {
    const res = await attempt();
    statuses.push(res.status);
  }

  console.log("Statuses for 7 consecutive login attempts:", statuses);
  const firstFive = statuses.slice(0, 5).every((s) => s === 401);
  const rest = statuses.slice(5).every((s) => s === 429);
  console.log(firstFive ? "[OK  ] first 5 attempts return 401" : "[FAIL] first 5 attempts");
  console.log(rest ? "[OK  ] 6th+ attempts return 429" : "[FAIL] 6th+ attempts");

  server.close();
  await mongoose.connection.close();
  await mongod.stop();
  process.exit(firstFive && rest ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
