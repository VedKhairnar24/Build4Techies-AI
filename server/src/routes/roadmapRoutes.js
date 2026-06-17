const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  generateRoadmap,
  getRoadmapHistory,
} = require("../controllers/roadmapController");

router.post("/generate", protect, asyncHandler(generateRoadmap));
router.get("/history", protect, asyncHandler(getRoadmapHistory));

module.exports = router;
