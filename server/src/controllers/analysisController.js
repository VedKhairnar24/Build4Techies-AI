const Resume = require("../models/Resume");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const {
  analyzeResumeWithAI,
} = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResponse = await analyzeResumeWithAI(
      resume.extractedText
    );

    const parsed = JSON.parse(aiResponse);

    const analysis = await ResumeAnalysis.create({
      userId: req.user.id,
      resumeId: resume._id,
      atsScore: parsed.atsScore,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      missingSkills: parsed.missingSkills,
      suggestions: parsed.suggestions,
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      analyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
};
