const express = require("express");
const LostFound = require("../models/LostFound");

const router = express.Router();

// Get all active lost and found items
router.get("/", async (req, res) => {
  try {
    const items = await LostFound.find()
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Get lost and found error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Create lost/found item
router.post("/", async (req, res) => {
  try {
    const {
      studentId,
      type,
      itemName,
      description,
      location,
      date,
    } = req.body;

    if (
      !studentId ||
      !type ||
      !itemName ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const item = await LostFound.create({
      studentId,
      type,
      itemName,
      description,
      location,
      date: date || Date.now(),
    });

    const populatedItem = await item.populate(
      "studentId",
      "name email"
    );

    res.status(201).json(populatedItem);
  } catch (error) {
    console.error("Create lost and found error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Update item status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("studentId", "name email");

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.error("Update lost and found error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;