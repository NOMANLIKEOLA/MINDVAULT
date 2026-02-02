import Decision from "../models/Decision.js";

// ➕ Create Decision
export const createDecision = async (req, res) => {
  try {
    const decision = await Decision.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(decision);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📥 Get All User Decisions
export const getDecisions = async (req, res) => {
  try {
    const decisions = await Decision.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(decisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get Single Decision
export const getDecisionById = async (req, res) => {
  try {
    const decision = await Decision.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }

    res.json(decision);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Decision
export const updateDecision = async (req, res) => {
  try {
    const decision = await Decision.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }

    res.json(decision);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🗑️ Delete Decision
export const deleteDecision = async (req, res) => {
  try {
    const decision = await Decision.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }

    res.json({ message: "Decision deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
