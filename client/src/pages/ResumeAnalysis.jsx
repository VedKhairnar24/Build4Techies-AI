import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadResume, analyzeResume } from "../services/resumeService";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import handleApiError from "../utils/handleApiError";
import { UI } from "../constants/ui";

function ResumeAnalysis() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Build4Techies AI | Resume Analyzer";
  }, []);

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
      handleApiError(error, "Resume upload failed");
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
      handleApiError(error, "Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className={UI.pageContainer}>
          <h1 className={`${UI.pageTitle} mb-8`}>Resume Analysis</h1>
          
          <div className={`${UI.card} mb-8`}>
            <div className="flex flex-col gap-4 w-full max-w-md">
            <input 
              type="file" 
              accept=".pdf"
              aria-label="Upload Resume PDF"
              onChange={(e) => setFile(e.target.files[0])} 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                onClick={handleUpload} 
                disabled={!file || loading}
                className={`${UI.buttonPrimary} flex justify-center items-center gap-2 disabled:opacity-50`}
              >
                {loading && file ? (
                  <>
                    <Spinner />
                    Uploading...
                  </>
                ) : "Upload PDF"}
              </button>
              <button 
                onClick={handleAnalyze} 
                disabled={loading}
                className={`${UI.buttonPrimary} flex justify-center items-center gap-2 disabled:opacity-50`}
              >
                {loading && !file ? (
                  <>
                    <Spinner />
                    Analyzing...
                  </>
                ) : "Analyze Resume"}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-12 gap-2">
            <Spinner />
            <div className="text-gray-500 font-medium">Loading...</div>
          </div>
        )}

        {analysis && !loading && (
          <div className={`${UI.card} mb-8`}>
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

        {!analysis && !loading && (
          <EmptyState
            title="No Analysis Yet"
            description="Upload a resume and analyze it."
          />
        )}
        </div>
      </div>
    </Layout>
  );
}

export default ResumeAnalysis;
