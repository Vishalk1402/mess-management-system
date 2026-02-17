import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, role, messId } = req.body;

    if (!username || !password || !role)
      return res.status(400).json({ error: "Username, password, and role are required" });

    if (role === "owner" && messId !== "8668385494")
      return res.status(400).json({ error: "Invalid Mess ID" });

    // check user
    const [existing] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existing.length > 0)
      return res.status(409).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "owner") {
      await db.query(
        "INSERT INTO users (username, password, role, mess_id) VALUES (?, ?, ?, ?)",
        [username, hashedPassword, role, messId]
      );
    } else {
      await db.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role]
      );
    }

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = users[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful ✅", token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
