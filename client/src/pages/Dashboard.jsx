import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { getJobReadiness } from "../services/jobReadinessService";
import { getGitHubHistory } from "../services/githubAnalyzerService";
import { getRecommendationHistory } from "../services/openSourceService";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [githubScore, setGithubScore] = useState(0);
  const [openSourceCount, setOpenSourceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.token) {
          const [readinessRes, githubRes, osRes] = await Promise.all([
            getJobReadiness(user.token).catch(() => null),
            getGitHubHistory(user.token).catch(() => null),
            getRecommendationHistory(user.token).catch(() => null)
          ]);
          
          if (readinessRes) setData(readinessRes);
          if (githubRes?.history?.length > 0) {
            setGithubScore(githubRes.history[0].githubScore || 0);
          }
          if (osRes?.history?.length > 0) {
            setOpenSourceCount(osRes.history[0].repositories?.length || 0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  const getReadinessBadge = (score) => {
    if (!score) return "Analyze your resume first";
    if (score >= 90) return "Outstanding 🌟";
    if (score >= 70) return "Job Ready 🚀";
    if (score >= 40) return "Improving 📈";
    return "Beginner 🌱";
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        
        {/* Welcome Section */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {user?.user?.name || user?.name} 👋
          </h1>
          <p className="text-gray-500 mt-2 text-base md:text-lg">
            Track your career growth with AI-powered insights.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-xl font-medium animate-pulse">Loading Dashboard...</div>
          </div>
        ) : (
          <>
            {/* Dashboard Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <StatsCard 
                title="Resume Score" 
                value={data?.factors?.resumeScore > 0 ? data.factors.resumeScore : "0"} 
                subtitle="ATS Match"
              />
              <StatsCard 
                title="GitHub Score" 
                value={githubScore.toString()} 
                subtitle="Profile Quality"
              />
              <StatsCard 
                title="Job Readiness" 
                value={data?.score || "0"} 
                subtitle={getReadinessBadge(data?.score)}
              />
              <StatsCard 
                title="Open Source" 
                value={openSourceCount.toString()} 
                subtitle="Recommended Repos"
              />
            </div>

            {/* Quick Actions */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="/resume" className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow font-medium text-gray-800">
                  Upload Resume
                </Link>
                <Link to="/roadmap" className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow font-medium text-gray-800">
                  Generate Roadmap
                </Link>
                <Link to="/github" className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow font-medium text-gray-800">
                  Analyze GitHub
                </Link>
                <Link to="/opensource" className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow font-medium text-gray-800">
                  Explore Open Source
                </Link>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              {data?.factors?.resumeScore > 0 ? (
                <div className="bg-white border rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-gray-700">Resume analyzed recently</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <p className="text-gray-700">{data?.factors?.roadmapGenerated ? "Roadmap generated recently" : "Roadmap pending generation"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <p className="text-gray-700">{githubScore > 0 ? "GitHub profile analyzed" : "GitHub analysis pending"}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <p className="text-gray-500 mb-2">No resume uploaded yet.</p>
                  <Link to="/resume" className="text-blue-600 font-medium hover:underline">
                    Upload your first resume.
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </Layout>
  );
}

export default Dashboard;
