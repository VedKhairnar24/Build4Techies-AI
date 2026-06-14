const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const resumeRoutes = require("./src/routes/resumeRoutes");
const analysisRoutes = require("./src/routes/analysisRoutes");
const roadmapRoutes = require("./src/routes/roadmapRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Build4Techies-AI API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
