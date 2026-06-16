const Roadmap = require("../models/Roadmap");
const User = require("../models/User");
const Resume = require("../models/Resume");

const {
  generateRoadmapWithAI,
} = require("../services/aiService");

const generateRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
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

    let jsonString = aiResponse;
    if (jsonString.includes("```json")) {
      jsonString = jsonString.split("```json")[1].split("```")[0].trim();
    } else if (jsonString.includes("```")) {
      jsonString = jsonString.split("```")[1].split("```")[0].trim();
    }

    const parsed = JSON.parse(jsonString);

    const roadmap = await Roadmap.create({
      user: req.user.id,
      careerGoal: goal,
      roadmap: parsed,
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
  try {
    const roadmaps = await Roadmap.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateRoadmap,
  getRoadmapHistory,
};
