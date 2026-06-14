const mongoose = require("mongoose");

const resumeAnalysisSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },

      atsScore: Number,

      strengths: [String],

      weaknesses: [String],

      missingSkills: [String],

      suggestions: [String],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);
