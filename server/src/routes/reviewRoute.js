import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createReview,
  getMyReviews,
  getReviewByDecision,
} from "../controllers/reviewController.js";

const router = express.Router();

// 🔐 Protect all review routes
router.use(protect);

router.post("/", createReview);
router.get("/", getMyReviews);
router.get("/:decisionId", getReviewByDecision);

export default router;
