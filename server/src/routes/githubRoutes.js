const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeGitHub,
  getGitHubHistory,
} = require("../controllers/githubController");

router.post("/analyze", protect, analyzeGitHub);
router.get("/history", protect, getGitHubHistory);

module.exports = router;
