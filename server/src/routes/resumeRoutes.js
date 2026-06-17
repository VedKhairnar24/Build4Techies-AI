const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  uploadResume,
  analyzeResume,
} = require("../controllers/resumeController");

router.post("/upload", protect, upload.single("resume"), asyncHandler(uploadResume));
router.post("/analyze", protect, asyncHandler(analyzeResume));

module.exports = router;
