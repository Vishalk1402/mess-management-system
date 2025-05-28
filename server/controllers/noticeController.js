import db from "../config/db.js";

// GET all notices
export const getAllNotices = (req, res) => {
  const query = "SELECT * FROM notices ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching notices:", err);
      return res.status(500).json({ message: "Failed to fetch notices" });
    }
    res.json(results);
  });
};

// POST new notice and return inserted notice with timestamp
export const addNotice = (req, res) => {
  const { notice } = req.body;

  if (!notice) {
    return res.status(400).json({ message: "Notice content is required" });
  }

  const insertQuery = "INSERT INTO notices (notice) VALUES (?)";
  db.query(insertQuery, [notice], (err, result) => {
    if (err) {
      console.error("Error adding notice:", err);
      return res.status(500).json({ message: "Failed to add notice" });
    }

    const insertedId = result.insertId;
    const selectQuery = "SELECT * FROM notices WHERE id = ?";
    db.query(selectQuery, [insertedId], (err2, rows) => {
      if (err2) {
        console.error("Error fetching newly inserted notice:", err2);
        return res.status(500).json({ message: "Notice added but failed to retrieve" });
      }
      res.status(201).json(rows[0]);
    });
  });
};

// DELETE a notice by ID
export const deleteNotice = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM notices WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting notice:", err);
      return res.status(500).json({ message: "Failed to delete notice" });
    }

    res.json({ message: "Notice deleted successfully" });
  });
};
