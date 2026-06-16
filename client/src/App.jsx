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
import OpenSource from "./pages/OpenSource";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><ResumeAnalysis /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        <Route path="/job-readiness" element={<ProtectedRoute><JobReadiness /></ProtectedRoute>} />
        <Route path="/github" element={<ProtectedRoute><GitHubAnalyzer /></ProtectedRoute>} />
        <Route path="/opensource" element={<ProtectedRoute><OpenSource /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
