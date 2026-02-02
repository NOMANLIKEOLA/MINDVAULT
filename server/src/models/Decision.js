import mongoose from "mongoose";

const decisionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["finance", "career", "health", "relationships", "other"],
      default: "other",
    },
    context: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    decisionTaken: {
      type: String,
      required: true,
    },
    confidenceLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    expectedOutcome: {
      type: String,
    },
  },
  { timestamps: true }
);

const Decision = mongoose.model("Decision", decisionSchema);
export default Decision;
