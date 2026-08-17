const express = require("express");
const LostFound = require("../models/LostFound");

const {
  authenticateToken,
  requireFaculty,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// GET ALL LOST & FOUND ITEMS
// Faculty only
// ==========================================
router.get(
  "/",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const items = await LostFound.find()
        .populate("studentId", "name email")
        .sort({ createdAt: -1 });

      res.json(items);
    } catch (error) {
      console.error(
        "Get lost and found error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// GET ONE STUDENT'S LOST & FOUND ITEMS
// Student can see own items
// Faculty can see any student's items
// ==========================================
router.get(
  "/student/:studentId",
  authenticateToken,
  async (req, res) => {
    try {
      // Student can only access their own records
      if (
        req.user.role === "student" &&
        req.user.id !== req.params.studentId
      ) {
        return res.status(403).json({
          message:
            "You can only view your own lost and found items",
        });
      }

      // Only student and faculty are supported
      if (
        req.user.role !== "student" &&
        req.user.role !== "faculty"
      ) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      const items = await LostFound.find({
        studentId: req.params.studentId,
      })
        .populate("studentId", "name email")
        .sort({ createdAt: -1 });

      res.json(items);
    } catch (error) {
      console.error(
        "Get student lost and found error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// CREATE LOST / FOUND REPORT
// Student only
// ==========================================
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      // Only students can create reports
      if (req.user.role !== "student") {
        return res.status(403).json({
          message:
            "Only students can report lost or found items",
        });
      }

      const {
        studentId,
        type,
        itemName,
        description,
        location,
        date,
      } = req.body;

      // Student must submit for themselves
      if (studentId !== req.user.id) {
        return res.status(403).json({
          message:
            "You can only report items for yourself",
        });
      }

      // Validate required fields
      if (
        !studentId ||
        !type ||
        !itemName ||
        !description ||
        !location
      ) {
        return res.status(400).json({
          message:
            "Please fill all required fields",
        });
      }

      // Validate type
      if (
        type !== "Lost" &&
        type !== "Found"
      ) {
        return res.status(400).json({
          message:
            "Type must be Lost or Found",
        });
      }

      const item = await LostFound.create({
        studentId,
        type,
        itemName: itemName.trim(),
        description: description.trim(),
        location: location.trim(),
        date: date || Date.now(),
      });

      const populatedItem =
        await LostFound.findById(
          item._id
        ).populate(
          "studentId",
          "name email"
        );

      res.status(201).json(
        populatedItem
      );
    } catch (error) {
      console.error(
        "Create lost and found error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// UPDATE LOST & FOUND STATUS
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
        "Active",
        "Resolved",
        "Claimed",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid lost and found status",
        });
      }

      const item =
        await LostFound.findByIdAndUpdate(
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

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      res.json(item);
    } catch (error) {
      console.error(
        "Update lost and found error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;