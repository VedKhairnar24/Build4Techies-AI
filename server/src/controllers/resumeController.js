const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { analyzeResume: analyzeWithAI } = require("../services/resumeAnalysisService");

const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume file required",
    });
  }

  const dataBuffer = req.file.buffer;
  const pdfData = await pdfParse(dataBuffer);

  await Resume.create({
    user: req.user.id,
    resumeText: pdfData.text,
  });

  return res.status(200).json({
    success: true,
    message: "Resume processed successfully",
  });
};

const analyzeResume = async (req, res) => {
  const resume = await Resume.findOne({
    user: req.user.id,
  }).sort({
    createdAt: -1,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Please upload a resume first",
    });
  }

  const aiResult = await analyzeWithAI(resume.resumeText);

  resume.analysis = aiResult;
  resume.atsScore = aiResult.atsScore || 0;
  await resume.save();

  return res.status(200).json({
    success: true,
    message: "Resume analyzed successfully",
    analysis: aiResult,
  });
};

module.exports = {
  uploadResume,
  analyzeResume,
};
