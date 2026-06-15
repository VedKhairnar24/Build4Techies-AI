const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/upload");

const {
  uploadResume,
  analyzeResume,
} = require(
  "../controllers/resumeController"
);

const protect =
  require("../middleware/authMiddleware");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.post(
  "/analyze",
  protect,
  analyzeResume
);

module.exports = router;
