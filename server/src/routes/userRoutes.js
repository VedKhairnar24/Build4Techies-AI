const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

router.get("/profile", protect, asyncHandler(getProfile));
router.put("/profile", protect, asyncHandler(updateProfile));

module.exports = router;
