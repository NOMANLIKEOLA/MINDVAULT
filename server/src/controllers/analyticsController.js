import Decision from "../models/Decision.js";
import Review from "../models/Review.js";

// 📊 Overall Stats
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total decisions
    const totalDecisions = await Decision.countDocuments({ user: userId });

    // Reviewed decisions
    const totalReviews = await Review.countDocuments({ user: userId });

    // Success rate
    const outcomeStats = await Review.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$outcomeRating",
          count: { $sum: 1 },
        },
      },
    ]);

    // Category performance
    const categoryPerformance = await Review.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "decisions",
          localField: "decision",
          foreignField: "_id",
          as: "decision",
        },
      },
      { $unwind: "$decision" },
      {
        $group: {
          _id: "$decision.category",
          successRate: {
            $avg: {
              $cond: [{ $eq: ["$outcomeRating", "success"] }, 1, 0],
            },
          },
          total: { $sum: 1 },
        },
      },
    ]);

    // Confidence vs success
    const confidenceAnalysis = await Review.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "decisions",
          localField: "decision",
          foreignField: "_id",
          as: "decision",
        },
      },
      { $unwind: "$decision" },
      {
        $group: {
          _id: "$decision.confidenceLevel",
          successRate: {
            $avg: {
              $cond: [{ $eq: ["$outcomeRating", "success"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalDecisions,
      totalReviews,
      unreviewedDecisions: totalDecisions - totalReviews,
      outcomeStats,
      categoryPerformance,
      confidenceAnalysis,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
