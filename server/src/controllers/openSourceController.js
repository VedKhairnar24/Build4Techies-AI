const User = require("../models/User");
const OpenSourceRecommendation = require("../models/OpenSourceRecommendation");

const {
  generateOpenSourceRecommendations,
} = require("../services/aiService");

const parseAIResponse = require("../utils/parseAIResponse");

const generateRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const aiResponse = await generateOpenSourceRecommendations({
      skills: user.skills,
      careerGoal: user.careerGoal,
    });

    const parsed = parseAIResponse(aiResponse);

    const recommendation = await OpenSourceRecommendation.create({
      userId: user._id,
      skills: user.skills,
      careerGoal: user.careerGoal,
      recommendations: parsed,
    });

    res.json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecommendationHistory = async (req, res) => {
  const history = await OpenSourceRecommendation.find({
    userId: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    history,
  });
};

module.exports = {
  generateRecommendations,
  getRecommendationHistory,
};
