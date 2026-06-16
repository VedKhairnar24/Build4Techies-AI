const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    careerGoal: String,

    roadmap: Object,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Roadmap",
    roadmapSchema
  );
