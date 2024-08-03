import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_KEY,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client
  .connect()
  .then(() => {
    console.log("redis");
  })
  .catch((err) => {
    console.error("Could not connect to Redis", err);
  });

client.on("error", (err) => {
  console.error("Redis error", err);
});

export default client;
