import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// authController.js
export const register = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }

    const { username, password, role, messId } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Username, password, and role are required" });
    }

    // Mess ID validation for owner role
    if (role === "owner" && messId !== "8668385494") {
        return res.status(400).json({ error: "Invalid Mess ID" });
    }

    // Step 1: Check if user exists
    const checkUserSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserSql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            return res.status(409).json({ error: "Username already exists" }); // 409 Conflict
        }

        // Step 2: Proceed to register if not exists
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Include messId for owners if it's valid
        const insertSql =
            role === "owner"
                ? "INSERT INTO users (username, password, role, mess_id) VALUES (?, ?, ?, ?)"
                : "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";

        const params = role === "owner" ? [username, hashedPassword, role, messId] : [username, hashedPassword, role];

        db.query(insertSql, params, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully ✅" });
        });
    });
};



export const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret123", {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful ✅", token, role: user.role });
    });
};
