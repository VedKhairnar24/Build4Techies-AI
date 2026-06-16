import { FileText, Map, BookOpen } from "lucide-react";
import { Github } from "./Icons";

function Features() {
  const features = [
    {
      icon: <FileText size={32} className="text-blue-600" />,
      title: "Resume Analysis",
      description: "Get ATS scores, strengths, weaknesses, and improvement suggestions.",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Map size={32} className="text-green-600" />,
      title: "Career Roadmap",
      description: "Generate a personalized learning path based on your skills and goals.",
      bgColor: "bg-green-50"
    },
    {
      icon: <Github size={32} className="text-purple-600" />,
      title: "GitHub Analyzer",
      description: "Understand project quality, activity, and portfolio readiness.",
      bgColor: "bg-purple-50"
    },
    {
      icon: <BookOpen size={32} className="text-orange-600" />,
      title: "Open Source Recommendations",
      description: "Find beginner-friendly repositories that match your skills.",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to accelerate your tech career in one unified platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-shadow group">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
