const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      bio,
      skills,
      careerGoal,
      githubUsername,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        skills,
        careerGoal,
        githubUsername,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
