import express from "express";
import pool from "../config/pgConfig.cjs";
import { uuidv8 } from "uuid-v8";

const router = express.Router();
router.post("/newUser", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email:", email, "password:", password);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS testes (
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `;
    const insertQuery = `
      INSERT INTO testes (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `;

    await pool.query(createTableQuery);

    const result = await pool.query(insertQuery, [email, password]);
    console.log("Success in newUser");
    res.json(result.rows);
  } catch (err) {
    console.log("error in regNewUser", err);
    next(err);
  }
});
router.get("/checkDatabase", async (req, res, next) => {
  try {
    const query = "SELECT 'Database is working' AS status";
    const result = await pool.query(query);

    res.json({ result: result.rows });
  } catch (err) {
    console.log("Error checking database:", err);
    next(err);
  }
});

export default router;
