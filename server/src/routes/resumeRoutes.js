const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getUserResumes,
} = require("../controllers/resumeController");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/all",
  protect,
  getUserResumes
);

module.exports = router;
