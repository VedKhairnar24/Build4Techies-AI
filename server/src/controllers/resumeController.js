const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      originalFileName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  uploadResume,
  getUserResumes,
};
