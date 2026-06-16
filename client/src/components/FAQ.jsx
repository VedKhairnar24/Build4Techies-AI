import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      q: "What is Build4Techies AI?",
      a: "It's an AI-powered platform designed to help developers accelerate their career growth through resume analysis, personalized roadmaps, and GitHub insights."
    },
    {
      q: "How does resume analysis work?",
      a: "Our AI model analyzes your uploaded PDF against industry standard ATS parsers, providing a score, highlighting strengths, and offering actionable improvement suggestions."
    },
    {
      q: "Is GitHub login required?",
      a: "No! We only need your public GitHub username to analyze your public repositories and profile metrics."
    },
    {
      q: "Can beginners use this platform?",
      a: "Absolutely. In fact, our Open Source recommendation engine specifically targets 'good first issue' labels to help beginners make their first contributions."
    },
    {
      q: "How are recommendations generated?",
      a: "We query the GitHub API based on your tech stack and career goals, and then use our AI model to rank the best matching repositories."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about the platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-colors"
            >
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-900 text-lg">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
