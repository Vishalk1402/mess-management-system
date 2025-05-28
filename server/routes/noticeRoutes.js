import express from "express";
import {
  getAllNotices,
  addNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

// GET all notices
router.get("/getnotice", getAllNotices);

// POST a new notice
router.post("/addnotice", addNotice);

// DELETE a notice by ID
router.delete("/:id", deleteNotice);

export default router;
