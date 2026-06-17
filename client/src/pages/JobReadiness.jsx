import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobReadiness } from "../services/jobReadinessService";
import Layout from "../components/Layout";
import { UI } from "../constants/ui";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";

function JobReadiness() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReadiness = async () => {
      try {
        if (user?.token) {
          const res = await getJobReadiness(user.token);
          setData(res);
        }
      } catch (err) {
        console.error("Failed to fetch job readiness score", err);
        setError("Could not load job readiness score.");
      } finally {
        setLoading(false);
      }
    };
    fetchReadiness();
  }, [user]);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-purple-600"; // Outstanding
    if (score >= 70) return "text-green-600"; // Job Ready
    if (score >= 40) return "text-orange-500"; // Improving
    return "text-red-500"; // Beginner
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Outstanding 🌟";
    if (score >= 70) return "Job Ready 🚀";
    if (score >= 40) return "Improving 📈";
    return "Beginner 🌱";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className={UI.pageContainer}>
          <h1 className={`${UI.pageTitle} mb-8`}>Job Readiness</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20 gap-2">
            <Spinner />
            <div className="text-gray-500 text-xl font-medium">Loading Job Readiness...</div>
          </div>
        ) : data ? (
          <div className="max-w-2xl mx-auto">
            <div className={`${UI.card} text-center mb-8`}>
              <h2 className="text-2xl text-gray-600 mb-4 font-medium">Your Score</h2>
              <div className={`text-8xl font-black mb-6 ${getScoreColor(data.score)}`}>
                {data.score} <span className="text-3xl text-gray-400 font-bold">/ 100</span>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
                {getScoreLabel(data.score)}
              </div>
            </div>

            <div className={UI.card}>
              <h3 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">Factors</h3>
              
              <ul className="space-y-6">
                <li className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-medium">Resume Score</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{data.factors?.resumeScore > 0 ? data.factors.resumeScore : "--"}</span>
                    {data.factors?.resumeScore > 0 ? (
                      <span className="text-green-500 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 text-xl">✗</span>
                    )}
                  </div>
                </li>

                <li className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-medium">Profile Completion</span>
                  <div className="flex items-center gap-3">
                    {data.factors?.profileComplete ? (
                      <span className="text-green-500 text-xl font-bold">Complete ✓</span>
                    ) : (
                      <span className="text-red-500 text-xl font-bold">Incomplete ✗</span>
                    )}
                  </div>
                </li>

                <li className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-medium">Skills Map (Min 5)</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{data.factors?.skillsCount} Added</span>
                    {data.factors?.skillsCount >= 5 ? (
                      <span className="text-green-500 text-xl">✓</span>
                    ) : (
                      <span className="text-orange-500 text-xl">!</span>
                    )}
                  </div>
                </li>

                <li className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-medium">Career Roadmap</span>
                  <div className="flex items-center gap-3">
                    {data.factors?.roadmapGenerated ? (
                      <span className="text-green-500 text-xl font-bold">Generated ✓</span>
                    ) : (
                      <span className="text-red-500 text-xl font-bold">Missing ✗</span>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </div>
        ) : (
          <EmptyState
            title="No Data"
            description="Could not load your job readiness score."
          />
        )}
        </div>
      </div>
    </Layout>
  );
}

export default JobReadiness;
