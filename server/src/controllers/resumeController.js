const fs = require("fs");
const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");

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

    const dataBuffer =
      fs.readFileSync(req.file.path);

    const pdfData =
      await pdfParse(dataBuffer);

    await Resume.create({
      user: req.user.id,
      resumeText: pdfData.text,
    });

    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      message:
        "Resume processed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Resume upload failed",
    });
  }
};

module.exports = {
  uploadResume,
};
