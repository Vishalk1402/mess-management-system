import db from "../config/db.js";

export const getAllStudents = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT id, username FROM users"
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
