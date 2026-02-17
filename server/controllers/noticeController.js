import db from "../config/db.js";

// GET all notices
export const getAllNotices = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM notices ORDER BY created_at DESC"
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching notices:", err);
    res.status(500).json({ message: "Failed to fetch notices" });
  }
};

// POST new notice
export const addNotice = async (req, res) => {
  try {
    const { notice } = req.body;

    if (!notice)
      return res.status(400).json({ message: "Notice content is required" });

    const [result] = await db.query(
      "INSERT INTO notices (notice) VALUES (?)",
      [notice]
    );

    const [rows] = await db.query(
      "SELECT * FROM notices WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error adding notice:", err);
    res.status(500).json({ message: "Failed to add notice" });
  }
};

// DELETE notice
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM notices WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Notice not found" });

    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    console.error("Error deleting notice:", err);
    res.status(500).json({ message: "Failed to delete notice" });
  }
};
