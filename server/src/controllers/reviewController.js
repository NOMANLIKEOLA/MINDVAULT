import Review from "../models/Review.js";
import Decision from "../models/Decision.js";

// ➕ Create Review
export const createReview = async (req, res) => {
  try {
    const { decisionId, actualOutcome, outcomeRating, lessonLearned } = req.body;

    // Check decision ownership
    const decision = await Decision.findOne({
      _id: decisionId,
      user: req.user._id,
    });

    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({ decision: decisionId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists" });
    }

    const review = await Review.create({
      decision: decisionId,
      user: req.user._id,
      actualOutcome,
      outcomeRating,
      lessonLearned,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📥 Get Reviews for Logged-in User
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("decision", "title category confidenceLevel");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get Review by Decision ID
export const getReviewByDecision = async (req, res) => {
  try {
    const review = await Review.findOne({
      decision: req.params.decisionId,
      user: req.user._id,
    }).populate("decision");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
