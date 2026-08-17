const express = require("express");
const Complaint = require("../models/Complaint");

const {
  authenticateToken,
  requireFaculty,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// GET ALL COMPLAINTS
// Faculty only
// ==========================================
router.get(
  "/",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const complaints = await Complaint.find()
        .populate("studentId", "name email")
        .sort({ createdAt: -1 });

      res.json(complaints);
    } catch (error) {
      console.error(
        "Get complaints error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// GET COMPLAINTS OF ONE STUDENT
// Student only
// ==========================================
router.get(
  "/student/:studentId",
  authenticateToken,
  async (req, res) => {
    try {
      // Student can only access their own complaints
      if (
        req.user.role === "student" &&
        req.user.id !== req.params.studentId
      ) {
        return res.status(403).json({
          message:
            "You can only view your own complaints",
        });
      }

      // Faculty can access any student's complaints
      if (
        req.user.role !== "student" &&
        req.user.role !== "faculty"
      ) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      const complaints =
        await Complaint.find({
          studentId: req.params.studentId,
        })
          .populate(
            "studentId",
            "name email"
          )
          .sort({ createdAt: -1 });

      res.json(complaints);
    } catch (error) {
      console.error(
        "Get student complaints error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// CREATE COMPLAINT
// Student only
// ==========================================
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "student") {
        return res.status(403).json({
          message:
            "Only students can submit complaints",
        });
      }

      const {
        studentId,
        title,
        description,
        category,
      } = req.body;

      // Student ID must match logged-in user
      if (studentId !== req.user.id) {
        return res.status(403).json({
          message:
            "You can only submit complaints for yourself",
        });
      }

      if (
        !studentId ||
        !title ||
        !description ||
        !category
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      const complaint =
        await Complaint.create({
          studentId,
          title,
          description,
          category,
        });

      const populatedComplaint =
        await Complaint.findById(
          complaint._id
        ).populate(
          "studentId",
          "name email"
        );

      res.status(201).json(
        populatedComplaint
      );
    } catch (error) {
      console.error(
        "Create complaint error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// UPDATE COMPLAINT STATUS
// Faculty only
// ==========================================
router.put(
  "/:id",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "In Progress",
        "Resolved",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid complaint status",
        });
      }

      const complaint =
        await Complaint.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            returnDocument: "after",
          }
        ).populate(
          "studentId",
          "name email"
        );

      if (!complaint) {
        return res.status(404).json({
          message:
            "Complaint not found",
        });
      }

      res.json(complaint);
    } catch (error) {
      console.error(
        "Update complaint error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;