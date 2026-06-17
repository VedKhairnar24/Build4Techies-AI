import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const ResumeAnalysis = lazy(() => import("./pages/ResumeAnalysis"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const JobReadiness = lazy(() => import("./pages/JobReadiness"));
const GitHubAnalyzer = lazy(() => import("./pages/GitHubAnalyzer"));
const OpenSource = lazy(() => import("./pages/OpenSource"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner /></div>}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
