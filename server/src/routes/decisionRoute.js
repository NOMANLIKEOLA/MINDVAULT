import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createDecision,
  getDecisions,
  getDecisionById,
  updateDecision,
  deleteDecision,
} from "../controllers/decisionController.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createDecision)
  .get(getDecisions);

router.route("/:id")
  .get(getDecisionById)
  .put(updateDecision)
  .delete(deleteDecision);

export default router;
