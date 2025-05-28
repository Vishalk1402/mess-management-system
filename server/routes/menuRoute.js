import express from "express";
import {addMenu, getWeeklyMenu,deleteMenuItem  } from "../controllers/menuController.js";

const router = express.Router();

// Route to get weekly menu
router.post("/add", addMenu);
router.get("/week", getWeeklyMenu);
router.delete("/delete", deleteMenuItem);


export default router;
