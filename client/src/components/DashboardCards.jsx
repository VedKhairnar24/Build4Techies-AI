import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobReadiness } from "../services/jobReadinessService";
import { getGitHubHistory } from "../services/githubAnalyzerService";
import { getRecommendationHistory } from "../services/openSourceService";

function DashboardCards() {
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

  const cards = [
    {
      title: "Resume Score",
      value: loading ? "..." : (data?.factors?.resumeScore > 0 ? data.factors.resumeScore : "0"),
    },
    {
      title: "GitHub Score",
      value: loading ? "..." : githubScore.toString(),
    },
    {
      title: "Job Readiness",
      value: loading ? "..." : (data?.score || "0"),
    },
    {
      title: "Recommended Repos",
      value: loading ? "..." : openSourceCount.toString(),
    },
    {
      title: "Skills",
      value: loading ? "..." : (data?.factors?.skillsCount || "0"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 bg-white shadow-sm border-gray-100"
        >
          <p className="text-gray-500 font-medium">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
