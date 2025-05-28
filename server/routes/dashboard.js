import express from "express";
import { verifyAdmin } from "../middleware/auth.js";  // Import the middleware

const router = express.Router();

// Protect the dashboard route by applying the verifyAdmin middleware
router.get("/dashboard", verifyAdmin, (req, res) => {
  // This code runs only if the user is an admin
  res.status(200).json({ message: "Welcome to the admin dashboard" });
});

export default router;
