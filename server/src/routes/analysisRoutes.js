const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeResume,
  getAnalysisHistory,
} = require("../controllers/analysisController");

router.post("/resume", protect, analyzeResume);
router.get("/history", protect, getAnalysisHistory);

module.exports = router;
