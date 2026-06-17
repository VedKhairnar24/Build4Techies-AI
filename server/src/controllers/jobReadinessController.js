const Resume = require("../models/Resume");
const Roadmap = require("../models/Roadmap");
const User = require("../models/User");
const getCurrentUser = require("../utils/getCurrentUser");

const getJobReadiness = async (req, res) => {
  const user = await getCurrentUser(req.user.id);
  
  const resume = await Resume.findOne({ user: req.user.id }).sort({ createdAt: -1 });
  const roadmap = await Roadmap.findOne({ user: req.user.id });

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
  
  score = Math.min(Math.round(score), 100);

  await User.findByIdAndUpdate(req.user.id, { jobReadinessScore: score });

  res.status(200).json({
    success: true,
    message: "Job readiness fetched successfully",
    score,
    factors: {
      resumeScore: resume?.atsScore || 0,
      profileComplete: Boolean(user.skills?.length && user.careerGoal),
      skillsCount: user.skills?.length || 0,
      roadmapGenerated: Boolean(roadmap)
    }
  });
};

module.exports = {
  getJobReadiness,
};
