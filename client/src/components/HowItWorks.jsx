function HowItWorks() {
  const steps = [
    "Create Your Profile",
    "Upload Resume",
    "Analyze GitHub",
    "Generate Career Roadmap",
    "Discover Open Source Projects",
    "Improve Job Readiness",
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="border bg-white rounded-xl p-6"
            >
              <div className="text-3xl font-bold mb-4">
                {index + 1}
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
