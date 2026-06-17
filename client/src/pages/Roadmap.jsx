import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { generateRoadmap, getRoadmapHistory } from "../services/roadmapService";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import handleApiError from "../utils/handleApiError";
import { UI } from "../constants/ui";

function Roadmap() {
  const { user } = useContext(AuthContext);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const careerGoal = user?.user?.careerGoal || user?.careerGoal || "Not Set";

  useEffect(() => {
    document.title = "Build4Techies AI | Career Roadmap";
    const fetchHistory = async () => {
      try {
        if (user?.token) {
          const res = await getRoadmapHistory(user.token);
          if (res.roadmaps && res.roadmaps.length > 0) {
            setRoadmapData(res.roadmaps[0].roadmap);
          }
        }
      } catch (err) {
        console.error("Failed to fetch roadmap history", err);
      }
    };
    fetchHistory();
  }, [user]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await generateRoadmap(user.token);
      setRoadmapData(result.roadmap.roadmap);
      toast.success("Roadmap generated");
    } catch (error) {
      console.error(error);
      handleApiError(error, "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className={UI.pageContainer}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className={`${UI.pageTitle} mb-2`}>Career Roadmap</h1>
            <p className="text-gray-600 text-lg">Goal: <span className="font-semibold text-gray-800">{careerGoal}</span></p>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={loading || careerGoal === "Not Set"}
            className={`${UI.buttonPrimary} flex justify-center items-center gap-2 mt-4 md:mt-0 disabled:opacity-50`}
          >
            {loading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : "Generate Roadmap"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-16 gap-2">
            <Spinner />
            <p className="text-gray-500 font-medium">Our AI is crafting your personalized roadmap...</p>
          </div>
        )}

        {roadmapData && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timeline Column */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Timeline</h2>
              <div className="space-y-6">
                {roadmapData.timeline?.map((phase, idx) => (
                  <div key={idx} className={`${UI.card} relative overflow-hidden`}>
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                    <h3 className="text-xl font-bold mb-3 text-blue-800">{phase.month}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics?.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Column */}
            <div className="space-y-8">
              {/* Projects */}
              <div className={UI.card}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
                <ul className="space-y-3">
                  {roadmapData.projects?.map((project, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className={UI.card}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
                <ul className="space-y-3">
                  {roadmapData.certifications?.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 mt-0.5">🏆</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Open Source */}
              <div className={UI.card}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Open Source</h2>
                <ul className="space-y-3">
                  {roadmapData.openSource?.map((os, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-500 mt-0.5">★</span>
                      <span>{os}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {!roadmapData && !loading && (
          <EmptyState
            title="No Roadmap Generated"
            description="Generate your career roadmap."
          />
        )}
        </div>
      </div>
    </Layout>
  );
}

export default Roadmap;
