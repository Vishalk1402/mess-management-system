import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// SSL options: 
// - Local: undefined
// - Production (Render): rejectUnauthorized false (self-signed TiDB Cloud)
let sslOptions =
  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false } // forces Node to accept self-signed cert
    : undefined;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

export default db;
