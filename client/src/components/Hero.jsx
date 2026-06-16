import { Link } from "react-router-dom";
import { FileText, Map, Github, Code } from "lucide-react";

function Hero() {
  return (
    <section className="bg-white border-b overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800 mb-8 border border-gray-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Build4Techies AI 2.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl leading-tight">
          Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Career Growth</span> &amp; Open Source Platform
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
          Analyze your resume, improve your GitHub profile, generate personalized roadmaps, and discover meaningful open-source opportunities.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-lg w-full sm:w-auto flex justify-center items-center"
          >
            Get Started Free
          </Link>
          <a
            href="#features"
            className="bg-white text-gray-800 border border-gray-300 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all text-lg w-full sm:w-auto flex justify-center items-center"
          >
            View Features
          </a>
        </div>

        {/* Hero Statistics Cards */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Resume Analysis</h3>
            <p className="text-gray-500 text-sm mt-1">ATS scoring &amp; review</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Map size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Career Roadmaps</h3>
            <p className="text-gray-500 text-sm mt-1">AI generated paths</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Github size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">GitHub Insights</h3>
            <p className="text-gray-500 text-sm mt-1">Profile optimization</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Open Source</h3>
            <p className="text-gray-500 text-sm mt-1">Smart matching</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
