import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="py-24 bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to accelerate your tech career?
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join developers who are leveling up their skills, improving their profiles, and landing better jobs with AI.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
          >
            Create Free Account <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
