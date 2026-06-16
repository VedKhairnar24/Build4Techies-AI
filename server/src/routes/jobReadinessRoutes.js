const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getJobReadiness,
} = require("../controllers/jobReadinessController");

router.get("/", protect, getJobReadiness);

module.exports = router;
