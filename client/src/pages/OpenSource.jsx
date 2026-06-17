import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getRecommendations, getRecommendationHistory } from "../services/openSourceService";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import handleApiError from "../utils/handleApiError";
import { UI } from "../constants/ui";

function OpenSource() {
  const { user } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (user?.token) {
          const res = await getRecommendationHistory(user.token);
          if (res.history && res.history.length > 0) {
            setRepositories(res.history[0].repositories);
          }
        }
      } catch (err) {
        console.error("Failed to fetch open source history", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getRecommendations(user.token);
      setRepositories(res.repositories);
      toast.success("Recommendations generated");
    } catch (error) {
      console.error(error);
      handleApiError(error, "Failed to generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className={UI.pageContainer}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className={`${UI.pageTitle} mb-2 text-gray-800`}>Open Source Recommendations</h1>
            <p className="text-gray-500 text-lg">AI curated repositories based on your skills and career goal.</p>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={loading || initialLoading}
            className={`${UI.buttonPrimary} flex justify-center items-center gap-2 disabled:opacity-50`}
          >
            {loading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : "Generate Recommendations"}
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
            <p className="text-gray-600 font-medium">Searching GitHub & Ranking Projects with AI...</p>
          </div>
        )}

        {!loading && repositories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {repositories.map((repo, idx) => (
              <div key={idx} className={`${UI.card} flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800 truncate" title={repo.name}>
                    {repo.name}
                  </h2>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-bold border border-yellow-100">
                    <span>⭐</span>
                    {repo.stars > 1000 ? (repo.stars / 1000).toFixed(1) + 'k' : repo.stars}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-1 rounded text-xs font-medium">
                      {repo.language}
                    </span>
                  )}
                  {repo.difficulty && (
                    <span className={`px-2 py-1 rounded text-xs font-bold border uppercase tracking-wider ${getDifficultyColor(repo.difficulty)}`}>
                      Difficulty: {repo.difficulty}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {repo.description || "No description provided."}
                </p>

                <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
                  <p className="text-sm font-semibold text-purple-900 mb-1">Why this project?</p>
                  <p className="text-sm text-purple-800 line-clamp-2" title={repo.reason}>{repo.reason}</p>
                </div>

                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${UI.buttonPrimary} w-full text-center mt-auto`}
                >
                  View Repository
                </a>
              </div>
            ))}
          </div>
        )}

        {(!repositories || repositories.length === 0) && !loading && !initialLoading && (
          <EmptyState
            title="No Recommendations"
            description="Generate recommendations first."
          />
        )}
        </div>
      </div>
    </Layout>
  );
}

export default OpenSource;
