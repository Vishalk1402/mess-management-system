
import express from "express";
import { getAllStudents } from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getAllStudents);

export default router;
