const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  generateRecommendations,
  getRecommendationHistory,
} = require("../controllers/openSourceController");

router.get("/recommendations", protect, asyncHandler(generateRecommendations));
router.get("/history", protect, asyncHandler(getRecommendationHistory));

module.exports = router;
