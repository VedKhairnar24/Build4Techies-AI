const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  analyzeGitHub,
  getGitHubHistory,
} = require("../controllers/githubController");

router.post("/analyze", protect, asyncHandler(analyzeGitHub));
router.get("/history", protect, asyncHandler(getGitHubHistory));

module.exports = router;
