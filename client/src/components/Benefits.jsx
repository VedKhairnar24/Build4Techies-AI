import { UserCheck, Code2, Users } from "lucide-react";

function Benefits() {
  const benefits = [
    {
      icon: <UserCheck size={40} className="text-gray-900 mb-4" />,
      title: "For Students",
      desc: "Become job ready faster by understanding exactly what employers are looking for."
    },
    {
      icon: <Code2 size={40} className="text-gray-900 mb-4" />,
      title: "For Developers",
      desc: "Improve your GitHub profile quality and build a standout portfolio."
    },
    {
      icon: <Users size={40} className="text-gray-900 mb-4" />,
      title: "For Open Source Contributors",
      desc: "Discover meaningful contribution opportunities tailored to your skill level."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Who is it for?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Designed for everyone in the tech ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-10 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
