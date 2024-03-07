const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

const pool = new Pool({
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  user: "postgres.ilquqvtggidzmibcpoze",
  password: "karticjoshi",
});
try {
  pool.connect();
  console.log("Connected to the database.");
} catch (error) {
  console.error("Error connecting to the database:", error.message);
}
module.exports = pool;
