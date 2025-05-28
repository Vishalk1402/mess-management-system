import db from "../config/db.js";

export const getAllStudents = (req, res) => {
  const sql = "SELECT id, username FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Failed to fetch students:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(result);
  });
};
