// const Redis = require("ioredis");


// const redis = new Redis({
//   host: process.env.VALKEY_HOST,
//   port: process.env.VALKEY_PORT,
// });

// redis.on("connect", () => {
//   console.log("Connected to Valkey");
// });

// module.exports = redis;

const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redis = new Redis({
  host: process.env.VALKEY_HOST,
  port: process.env.VALKEY_PORT,
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

module.exports = redis;
