function DashboardCards() {
  const cards = [
    {
      title: "Resume Score",
      value: "--",
    },
    {
      title: "GitHub Score",
      value: "--",
    },
    {
      title: "Job Readiness",
      value: "--",
    },
    {
      title: "Roadmaps",
      value: "--",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 bg-white"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}

export default DashboardCards;
