import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadResume, analyzeResume } from "../services/resumeService";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function ResumeAnalysis() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await uploadResume(formData, user.token);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeResume(user.token);
      setAnalysis(result.analysis);
      toast.success("Analysis completed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Resume Analysis</h1>
        
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col gap-4 max-w-md">
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])} 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <div className="flex gap-4 mt-2">
              <button 
                onClick={handleUpload} 
                disabled={!file || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && file ? <Spinner /> : null}
                {loading && file ? "Uploading..." : "Upload Resume"}
              </button>
              <button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && !file ? <Spinner /> : null}
                {loading && !file ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {analysis && !loading && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              ATS Score: <span className={analysis.atsScore >= 70 ? "text-green-600" : "text-orange-500"}>{analysis.atsScore}/100</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50/50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-bold mb-4 text-green-800">Strengths</h3>
                <ul className="space-y-3">
                  {analysis.strengths?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {(!analysis.strengths || analysis.strengths.length === 0) && (
                    <li className="text-gray-500 italic">No specific strengths identified.</li>
                  )}
                </ul>
              </div>

              <div className="bg-red-50/50 p-6 rounded-lg border border-red-100">
                <h3 className="text-xl font-bold mb-4 text-red-800">Weaknesses</h3>
                <ul className="space-y-3">
                  {analysis.weaknesses?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {(!analysis.weaknesses || analysis.weaknesses.length === 0) && (
                    <li className="text-gray-500 italic">No specific weaknesses identified.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50/50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Suggestions</h3>
              <ul className="space-y-3">
                {analysis.suggestions?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
                {(!analysis.suggestions || analysis.suggestions.length === 0) && (
                  <li className="text-gray-500 italic">No specific suggestions available.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ResumeAnalysis;
