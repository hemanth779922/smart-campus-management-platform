const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create an event
router.post("/", async (req, res) => {
  try {
    const { title, date, time, location, description } = req.body;

    const event = await Event.create({
      title,
      date,
      time,
      location,
      description,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;