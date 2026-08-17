const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ==========================================
// REGISTER
// ==========================================
router.post("/register", async (req, res) => {
  try {
    let {
      name,
      email,
      registrationNumber,
      password,
      role,
    } = req.body;

    // Clean input
    name = name?.trim();
    email = email?.trim().toLowerCase();
    registrationNumber =
      registrationNumber
        ?.trim()
        .toUpperCase();

    role = role?.trim().toLowerCase();

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (
      !name ||
      !email ||
      !registrationNumber ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }

    // ==========================================
    // ROLE
    // ==========================================

    role = role || "student";

    const allowedRoles = [
      "student",
      "faculty",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message:
          "Only Student and Faculty accounts are allowed",
      });
    }

    // ==========================================
    // PASSWORD
    // ==========================================

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long",
      });
    }

    // ==========================================
    // CHECK EMAIL
    // ==========================================

    const existingEmail =
      await User.findOne({
        email,
      });

    if (existingEmail) {
      return res.status(400).json({
        message:
          "An account with this email already exists",
      });
    }

    // ==========================================
    // CHECK REGISTRATION NUMBER
    // ==========================================

    const existingRegistration =
      await User.findOne({
        registrationNumber,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message:
          "This registration number is already registered",
      });
    }

    // ==========================================
    // HASH PASSWORD
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ==========================================
    // CREATE USER
    // ==========================================

    const user = await User.create({
      name,
      email,
      registrationNumber,
      password: hashedPassword,
      role,
    });

    console.log(
      `User registered: ${user.registrationNumber} (${user.role})`
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      message:
        "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        registrationNumber:
          user.registrationNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    // Duplicate key protection
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Email or registration number already exists",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ==========================================
// LOGIN USING REGISTRATION NUMBER
// ==========================================
router.post("/login", async (req, res) => {
  try {
    let {
      registrationNumber,
      password,
    } = req.body;

    // Clean registration number
    registrationNumber =
      registrationNumber
        ?.trim()
        .toUpperCase();

    // ==========================================
    // VALIDATE INPUT
    // ==========================================

    if (
      !registrationNumber ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Registration number and password are required",
      });
    }

    console.log(
      `Login attempt: ${registrationNumber}`
    );

    // ==========================================
    // FIND USER BY REGISTRATION NUMBER
    // ==========================================

    const user =
      await User.findOne({
        registrationNumber,
      });

    if (!user) {
      console.log(
        "User found: NO"
      );

      return res.status(401).json({
        message:
          "Invalid registration number or password",
      });
    }

    console.log(
      `User found: ${user.registrationNumber} (${user.role})`
    );

    // ==========================================
    // ALLOWED ROLES
    // ==========================================

    if (
      user.role !== "student" &&
      user.role !== "faculty"
    ) {
      return res.status(403).json({
        message:
          "This account type is not supported",
      });
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "Password match:",
      passwordMatch
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid registration number or password",
      });
    }

    // ==========================================
    // JWT SECRET
    // ==========================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing"
      );

      return res.status(500).json({
        message:
          "Server configuration error",
      });
    }

    // ==========================================
    // CREATE TOKEN
    // ==========================================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log(
      `Login successful: ${user.registrationNumber} (${user.role})`
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.json({
      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        registrationNumber:
          user.registrationNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;