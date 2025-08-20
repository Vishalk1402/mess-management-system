import mysql from "mysql2";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const CERT_PATH = path.resolve('./server/certs/temp-ca.pem');

// Write the PEM file if SSL is enabled
if (process.env.DB_SSL === 'true') {
  fs.mkdirSync(path.dirname(CERT_PATH), { recursive: true });
  fs.writeFileSync(
    CERT_PATH,
    process.env.DB_CA_PEM.replace(/\\n/g, '\n') // Converts single-line PEM to proper format
  );
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? {
    ca: fs.readFileSync(CERT_PATH),
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
