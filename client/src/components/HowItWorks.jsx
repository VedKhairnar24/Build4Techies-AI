function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Create Account",
      desc: "Sign up and set up your basic developer profile."
    },
    {
      num: "2",
      title: "Complete Profile",
      desc: "Add your tech stack, skills, and career goals."
    },
    {
      num: "3",
      title: "Upload Resume & Analyze GitHub",
      desc: "Let our AI process your existing professional materials."
    },
    {
      num: "4",
      title: "Receive AI Insights & Recommendations",
      desc: "Get actionable steps to land your dream job."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Four simple steps to transform your career trajectory.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-900 shadow-sm z-10 mb-6 relative">
                  {step.num}
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
