const Roadmap = require("../models/Roadmap");
const User = require("../models/User");

const {
  generateRoadmapWithAI,
} = require("../services/aiService");

const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;

    const user = await User.findById(req.user.id);

    const aiResponse = await generateRoadmapWithAI(
      goal,
      user.skills
    );

    const parsed = JSON.parse(aiResponse);

    const roadmap = await Roadmap.create({
      userId: req.user.id,
      goal,
      roadmap: parsed.roadmap,
    });

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoadmapHistory = async (req, res) => {
  const roadmaps = await Roadmap.find({
    userId: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    roadmaps,
  });
};

module.exports = {
  generateRoadmap,
  getRoadmapHistory,
};
