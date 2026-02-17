import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: isProduction
    ? {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
      }
    : undefined,
});

// Test connection (optional)
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log(
      `Connected to ${isProduction ? "TiDB Cloud" : "Local"} Database ✅`
    );
    conn.release();
  } catch (err) {
    console.error("Database pool connection failed:", err.message);
  }
})();

export default pool;
