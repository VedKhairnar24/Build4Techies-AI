import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { analyzeGitHub } from "../services/githubAnalyzerService";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function GitHubAnalyzer() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [extraStats, setExtraStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const result = await analyzeGitHub(username, user.token);
      setData(result.analysis.analysis);
      setExtraStats(result.extraStats);
      toast.success("GitHub analysis completed");
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to analyze GitHub profile.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">GitHub Analyzer</h1>
        
        <div className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <input 
              type="text" 
              placeholder="Enter GitHub Username (e.g. torvalds)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
            />
            <button 
              onClick={handleAnalyze} 
              disabled={!username || loading}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? <Spinner /> : null}
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 max-w-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Fetching repositories and analyzing code...</p>
          </div>
        )}

        {data && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">GitHub Score</p>
                  <div className={`text-4xl font-black ${data.githubScore >= 70 ? 'text-green-600' : 'text-orange-500'}`}>
                    {data.githubScore}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
                    <span className="bg-green-100 p-1 rounded">✓</span> Strengths
                  </h3>
                  <ul className="space-y-3">
                    {data.strengths?.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!data.strengths || data.strengths.length === 0) && (
                      <li className="text-gray-400 italic">No specific strengths identified.</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 text-red-700 flex items-center gap-2">
                    <span className="bg-red-100 p-1 rounded">✗</span> Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {data.weaknesses?.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-red-500 mt-0.5">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!data.weaknesses || data.weaknesses.length === 0) && (
                      <li className="text-gray-400 italic">No specific weaknesses identified.</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold mb-4 text-blue-800 flex items-center gap-2">
                  <span className="bg-blue-100 p-1 rounded text-blue-600">→</span> Suggestions
                </h3>
                <ul className="space-y-3">
                  {data.suggestions?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-800">
                      <span className="text-blue-500 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {(!data.suggestions || data.suggestions.length === 0) && (
                    <li className="text-gray-400 italic">No specific suggestions available.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Extra Stats Sidebar */}
            {extraStats && (
              <div className="bg-gray-900 text-white p-8 rounded-xl shadow-sm h-fit">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Profile Stats</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Repositories</p>
                    <p className="text-3xl font-bold">{extraStats.repositories}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Stars</p>
                    <p className="text-3xl font-bold flex items-center gap-2">
                      <span className="text-yellow-400">★</span> {extraStats.stars}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Top Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {extraStats.languages?.filter(Boolean).map((lang, idx) => (
                        <span key={idx} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                      {(!extraStats.languages || extraStats.languages.filter(Boolean).length === 0) && (
                        <span className="text-gray-500 italic">No languages detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default GitHubAnalyzer;
