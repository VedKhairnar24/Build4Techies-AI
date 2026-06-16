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
const githubRoutes = require("./src/routes/githubRoutes");
const openSourceRoutes = require("./src/routes/openSourceRoutes");
const jobReadinessRoutes = require("./src/routes/jobReadinessRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/opensource", openSourceRoutes);
app.use("/api/job-readiness", jobReadinessRoutes);
app.use("/api/test", require("./src/routes/testRoute"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Build4Techies-AI API Running",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
