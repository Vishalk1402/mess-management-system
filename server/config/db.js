import mysql from "mysql2";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// If DB_CA_PEM exists, use it; otherwise undefined (for local)
const sslOptions = process.env.DB_CA_PEM
  ? { 
      ca: process.env.DB_CA_PEM.replace(/\\n/g, '\n'), 
      rejectUnauthorized: true 
    }
  : undefined;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: sslOptions
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
    return;
  }
  console.log("Connected to MySQL Database ✅");
});

export default db;
