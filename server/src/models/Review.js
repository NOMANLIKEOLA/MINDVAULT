import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    decision: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Decision",
      required: true,
      unique: true, // one review per decision
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actualOutcome: {
      type: String,
      required: true,
    },
    outcomeRating: {
      type: String,
      enum: ["success", "neutral", "fail"],
      required: true,
    },
    lessonLearned: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
