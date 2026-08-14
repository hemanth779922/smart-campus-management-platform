const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

// Get all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get complaints error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a complaint
router.post("/", async (req, res) => {
  try {
    const { studentId, title, description, category } = req.body;

    const complaint = await Complaint.create({
      studentId,
      title,
      description,
      category,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error("Create complaint error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update complaint status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Update complaint error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;