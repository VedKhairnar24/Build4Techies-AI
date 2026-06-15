import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-6xl font-bold mb-6">

          Build Your Career With AI

        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">

          Analyze your resume, evaluate your GitHub profile,
          discover open-source projects, generate career roadmaps,
          and measure your job readiness with AI.

        </p>

        <div className="flex justify-center gap-4">

          <Link
            to="/register"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border px-6 py-3 rounded-lg"
          >
            Login
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;
