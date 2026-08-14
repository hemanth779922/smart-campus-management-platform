const express = require("express");
const Announcement = require("../models/Announcement");

const router = express.Router();

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (error) {
    console.error("Get announcements error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create an announcement
router.post("/", async (req, res) => {
  try {
    const { title, message, date, category } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      date,
      category,
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error("Create announcement error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;