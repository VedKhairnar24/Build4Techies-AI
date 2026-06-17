const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  getJobReadiness,
} = require("../controllers/jobReadinessController");

router.get("/", protect, asyncHandler(getJobReadiness));

module.exports = router;
