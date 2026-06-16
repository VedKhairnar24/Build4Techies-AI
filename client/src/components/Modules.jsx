import { Target, FileText, Briefcase, Award } from "lucide-react";
import { Github } from "./Icons";

function Modules() {
  const modules = [
    {
      icon: <FileText className="text-gray-900" size={24} />,
      title: "Resume Analyzer",
      desc: "ATS scoring and AI review."
    },
    {
      icon: <Target className="text-gray-900" size={24} />,
      title: "Career Roadmap",
      desc: "Step-by-step career progression."
    },
    {
      icon: <Award className="text-gray-900" size={24} />,
      title: "Job Readiness Score",
      desc: "Track your overall hireability."
    },
    {
      icon: <Github className="text-gray-900" size={24} />,
      title: "GitHub Analyzer",
      desc: "Profile & repository insights."
    },
    {
      icon: <Briefcase className="text-gray-900" size={24} />,
      title: "Open Source Recommendations",
      desc: "Curated beginner issues."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Complete Platform Modules</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Build4Techies AI provides a comprehensive suite of tools designed to take you from a beginner developer to a job-ready engineer.
            </p>
            <div className="space-y-4">
              {modules.map((mod, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors bg-gray-50">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    {mod.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{mod.title}</h4>
                    <p className="text-gray-500">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <Target size={80} className="mx-auto mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold">All in one place.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Modules;
