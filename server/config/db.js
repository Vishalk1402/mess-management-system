import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
// SSL options: 
// - Local: undefined
// - Production (Render): rejectUnauthorized false (self-signed TiDB Cloud)
let sslOptions =
  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false } // forces Node to accept self-signed cert
    : undefined;

const db = mysql.createConnection({
=======
const isProduction = process.env.NODE_ENV === "production";

const pool = mysql.createPool({
>>>>>>> e11879b (controllers update in server)
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
<<<<<<< HEAD
  port: process.env.DB_PORT ,
  ssl: sslOptions,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log(
    `Connected to ${
      process.env.NODE_ENV === "production" ? "TiDB Cloud" : "Local"
    } Database ✅`
  );
});
=======
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

// test connection (optional but useful)
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
>>>>>>> e11879b (controllers update in server)

export default pool;
