import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Roadmap from "./pages/Roadmap";
import JobReadiness from "./pages/JobReadiness";
import GitHubAnalyzer from "./pages/GitHubAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeAnalysis />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/job-readiness" element={<JobReadiness />} />
        <Route path="/github" element={<GitHubAnalyzer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
