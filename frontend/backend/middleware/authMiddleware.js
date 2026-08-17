const jwt = require("jsonwebtoken");

// ==========================================
// VERIFY LOGIN TOKEN
// ==========================================
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing"
      );

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// ==========================================
// FACULTY ONLY
// ==========================================
const requireFaculty = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "faculty") {
    return res.status(403).json({
      message:
        "Faculty access required",
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireFaculty,
};