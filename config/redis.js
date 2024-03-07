import { createClient } from "redis";
import fs from "fs";
export const client = await createClient({
  socket: {
    tls: true,
    cert: fs.readFileSync("../attendex.shop.pem"),
    rejectUnauthorized: false,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
