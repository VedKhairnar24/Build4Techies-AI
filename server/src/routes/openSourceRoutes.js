const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateRecommendations,
  getRecommendationHistory,
} = require("../controllers/openSourceController");

router.post("/generate", protect, generateRecommendations);
router.get("/history", protect, getRecommendationHistory);

module.exports = router;
