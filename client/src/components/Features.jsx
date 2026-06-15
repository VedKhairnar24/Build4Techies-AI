function Features() {
  const features = [
    {
      title: "Resume Analysis",
      description:
        "Upload your resume and receive AI-powered ATS feedback.",
    },
    {
      title: "Career Roadmaps",
      description:
        "Generate personalized learning paths for your goals.",
    },
    {
      title: "GitHub Analyzer",
      description:
        "Evaluate your GitHub profile and identify improvement areas.",
    },
    {
      title: "Open Source Discovery",
      description:
        "Find beginner-friendly and skill-matched repositories.",
    },
    {
      title: "Job Readiness Score",
      description:
        "Track your overall readiness using multiple career signals.",
    },
    {
      title: "AI Career Mentor",
      description:
        "Receive actionable recommendations for growth.",
    },
  ];

  return (
    <section className="py-24 border-t">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Everything You Need To Grow In Tech
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-xl mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
