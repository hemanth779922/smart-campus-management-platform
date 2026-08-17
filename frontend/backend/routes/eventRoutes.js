const express = require("express");
const Event = require("../models/Event");

const {
  authenticateToken,
  requireFaculty,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// GET ALL EVENTS
// Student + Faculty
// ==========================================
router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      const events = await Event.find()
        .sort({ date: 1 });

      res.json(events);
    } catch (error) {
      console.error(
        "Get events error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// GET SINGLE EVENT
// Student + Faculty
// ==========================================
router.get(
  "/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const event =
        await Event.findById(
          req.params.id
        );

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      res.json(event);
    } catch (error) {
      console.error(
        "Get event error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// CREATE EVENT
// Faculty only
// ==========================================
router.post(
  "/",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const {
        title,
        description,
        date,
        time,
        location,
        category,
      } = req.body;

      if (
        !title ||
        !description ||
        !date ||
        !time ||
        !location
      ) {
        return res.status(400).json({
          message:
            "Please fill all required fields",
        });
      }

      const event =
        await Event.create({
          title: title.trim(),
          description:
            description.trim(),
          date,
          time: time.trim(),
          location:
            location.trim(),
          category:
            category?.trim() ||
            "General",
        });

      res.status(201).json(event);
    } catch (error) {
      console.error(
        "Create event error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// UPDATE EVENT
// Faculty only
// ==========================================
router.put(
  "/:id",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const {
        title,
        description,
        date,
        time,
        location,
        category,
      } = req.body;

      const event =
        await Event.findByIdAndUpdate(
          req.params.id,
          {
            title,
            description,
            date,
            time,
            location,
            category,
          },
          {
            new: true,
            returnDocument: "after",
          }
        );

      if (!event) {
        return res.status(404).json({
          message:
            "Event not found",
        });
      }

      res.json(event);
    } catch (error) {
      console.error(
        "Update event error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ==========================================
// DELETE EVENT
// Faculty only
// ==========================================
router.delete(
  "/:id",
  authenticateToken,
  requireFaculty,
  async (req, res) => {
    try {
      const event =
        await Event.findByIdAndDelete(
          req.params.id
        );

      if (!event) {
        return res.status(404).json({
          message:
            "Event not found",
        });
      }

      res.json({
        message:
          "Event deleted successfully",
        event,
      });
    } catch (error) {
      console.error(
        "Delete event error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;