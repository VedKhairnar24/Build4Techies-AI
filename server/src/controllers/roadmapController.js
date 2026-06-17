const Roadmap = require("../models/Roadmap");
const Resume = require("../models/Resume");
const getCurrentUser = require("../utils/getCurrentUser");
const parseAIResponse = require("../utils/parseAIResponse");

const {
  generateRoadmapWithAI,
} = require("../services/aiService");

const generateRoadmap = async (req, res) => {
  const user = await getCurrentUser(req.user.id);
  
  const goal = user.careerGoal;
  if (!goal) {
    return res.status(400).json({ success: false, message: "Career goal not set in profile." });
  }

  const latestResume = await Resume.findOne({ user: req.user.id }).sort({ createdAt: -1 });
  const atsScore = latestResume ? latestResume.atsScore : 0;

  const aiResponse = await generateRoadmapWithAI(
    goal,
    user.skills,
    atsScore
  );

  const parsed = parseAIResponse(aiResponse);

  const roadmap = await Roadmap.create({
    user: req.user.id,
    careerGoal: goal,
    roadmap: parsed,
  });

  res.status(200).json({
    success: true,
    message: "Roadmap generated successfully",
    roadmap,
  });
};

const getRoadmapHistory = async (req, res) => {
  const roadmaps = await Roadmap.find({
    user: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    message: "Roadmap history fetched",
    roadmaps,
  });
};

module.exports = {
  generateRoadmap,
  getRoadmapHistory,
};
