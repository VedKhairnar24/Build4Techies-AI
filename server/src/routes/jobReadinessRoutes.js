const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateScore,
} = require("../controllers/jobReadinessController");

router.get("/generate", protect, generateScore);

module.exports = router;
