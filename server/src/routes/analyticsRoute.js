import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/analyticsController.js";

const router = express.Router();

// 🔐 Protected
router.use(protect);

router.get("/dashboard", getDashboardStats);

export default router;
