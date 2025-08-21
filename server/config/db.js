import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Determine SSL options based on environment
let sslOptions;

// Production (Render) with TiDB Cloud
if (process.env.NODE_ENV === "production" && process.env.DB_CA_PEM) {
  sslOptions = {
    ca: process.env.DB_CA_PEM.replace(/\\n/g, "\n"),
    rejectUnauthorized: true
  };
// Optional fallback: Production without CA (self-signed)
} else if (process.env.NODE_ENV === "production") {
  sslOptions = { rejectUnauthorized: false };
} else {
  // Local development: no SSL needed
  sslOptions = undefined;
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: sslOptions
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log(`Connected to ${process.env.NODE_ENV === "production" ? "TiDB Cloud" : "Local"} Database ✅`);
});

export default db;
