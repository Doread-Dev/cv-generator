const CV = require("../models/cvModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userMolduls");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const createCv = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cvData = req.body;

    const newCV = new CV({
      userId,
      ...cvData,
    });

    const savedCV = await newCV.save();

    res.status(201).json({
      message: "CV created successfully",
      cv: savedCV,
    });
  } catch (error) {
    console.error("Error creating CV:", error);
    res.status(500).json({ message: "Failed to create CV" });
  }
};

const getUserCVs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cvs = await CV.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "CVs retrieved successfully",
      cvs,
    });
  } catch (error) {
    console.error("Error getting CVs:", error);
    res.status(500).json({ message: "Failed to get CVs" });
  }
};

const getCVById = async (req, res) => {
  try {
    const { cvId } = req.params;
    const userId = req.user.userId;

    const cv = await CV.findOne({ _id: cvId, userId });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({
      message: "CV retrieved successfully",
      cv,
    });
  } catch (error) {
    console.error("Error getting CV:", error);
    res.status(500).json({ message: "Failed to get CV" });
  }
};

const updateCV = async (req, res) => {
  try {
    const { cvId } = req.params;
    const userId = req.user.userId;
    const updateData = req.body;

    const updatedCV = await CV.findOneAndUpdate(
      { _id: cvId, userId },
      updateData,
      { new: true }
    );

    if (!updatedCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({
      message: "CV updated successfully",
      cv: updatedCV,
    });
  } catch (error) {
    console.error("Error updating CV:", error);
    res.status(500).json({ message: "Failed to update CV" });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { cvId } = req.params;
    const userId = req.user.userId;

    const deletedCV = await CV.findOneAndDelete({ _id: cvId, userId });

    if (!deletedCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({
      message: "CV deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting CV:", error);
    res.status(500).json({ message: "Failed to delete CV" });
  }
};

module.exports = {
  createCv,
  auth,
  getUserCVs,
  getCVById,
  updateCV,
  deleteCV,
};
