const User = require("../models/User");
const Resume = require("../models/Resume");
const GitHubAnalysis = require("../models/GitHubAnalysis");

const {
  calculateJobReadinessScore,
} = require("../services/jobReadinessService");

const generateScore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const latestResume = await Resume.findOne({
      user: user._id,
    }).sort({
      createdAt: -1,
    });

    const latestGithub =
      await GitHubAnalysis.findOne({
        userId: user._id,
      }).sort({
        createdAt: -1,
      });

    const score =
      calculateJobReadinessScore({
        atsScore:
          latestResume?.atsScore || 0,

        githubScore:
          latestGithub?.aiInsights
            ?.portfolioScore || 0,

        skillsCount:
          user.skills.length,

        careerGoal:
          user.careerGoal,
      });

    user.jobReadinessScore = score;

    await user.save();

    res.json({
      success: true,
      score,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateScore,
};
