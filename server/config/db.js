import mysql from "mysql2";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
ssl: process.env.DB_SSL === 'true' ? {
    ca: fs.readFileSync('./certs/ca.pem'),
    rejectUnauthorized: true
  } : undefined
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
    return;
  }
  console.log("Connected to MySQL Database ✅");
});

export default db;
