
const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume: analyzeWithAI } = require("../services/resumeAnalysisService");

const uploadResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file required",
      });
    }

    const dataBuffer = req.file.buffer;

    const pdfData =
      await pdfParse(dataBuffer);

    await Resume.create({
      user: req.user.id,
      resumeText: pdfData.text,
    });



    return res.status(200).json({
      success: true,
      message:
        "Resume processed successfully",
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.stack
    });
  }
};

const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResult = await analyzeWithAI(resume.resumeText);

    resume.analysis = aiResult;
    resume.atsScore = aiResult.atsScore || 0;
    await resume.save();

    return res.json({
      success: true,
      analysis: aiResult,
    });
  } catch (error) {
    console.error("Analyze Error:", error);
    return res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
};

module.exports = {
  uploadResume,
  analyzeResume,
};
