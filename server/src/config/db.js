const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.error("Database Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
