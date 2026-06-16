const User = require("../models/User");
const Resume = require("../models/Resume");
const Roadmap = require("../models/Roadmap");

const getJobReadiness = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const resume = await Resume.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const roadmap = await Roadmap.findOne({
      user: req.user.id,
    });

    let score = 0;

    // Resume: 40%
    score += (resume?.atsScore || 0) * 0.4;

    // Profile: 20%
    if (user.skills?.length && user.careerGoal) {
      score += 20;
    }

    // Skills: 20%
    if (user.skills?.length >= 5) {
      score += 20;
    }

    // Roadmap: 20%
    if (roadmap) {
      score += 20;
    }
    
    // Ensure score doesn't exceed 100
    score = Math.min(Math.round(score), 100);

    user.jobReadinessScore = score;
    await user.save();

    res.json({
      success: true,
      score,
      factors: {
        resumeScore: resume?.atsScore || 0,
        profileComplete: Boolean(user.skills?.length && user.careerGoal),
        skillsCount: user.skills?.length || 0,
        roadmapGenerated: Boolean(roadmap)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getJobReadiness,
};
