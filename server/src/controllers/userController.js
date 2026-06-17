const User = require("../models/User");
const getCurrentUser = require("../utils/getCurrentUser");

const getProfile = async (req, res) => {
  const user = await getCurrentUser(req.user.id, "-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user,
  });
};

const updateProfile = async (req, res) => {
  const { name, bio, skills, careerGoal, githubUsername } = req.body;

  if (name !== undefined && !name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name cannot be empty",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, bio, skills, careerGoal, githubUsername },
    { new: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

module.exports = {
  getProfile,
  updateProfile,
};
