import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobReadiness } from "../services/jobReadinessService";

function DashboardCards() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.token) {
          const res = await getJobReadiness(user.token);
          setData(res);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  const cards = [
    {
      title: "Resume Score",
      value: loading ? "..." : (data?.factors?.resumeScore > 0 ? data.factors.resumeScore : "0"),
    },
    {
      title: "Job Readiness",
      value: loading ? "..." : (data?.score || "0"),
    },
    {
      title: "Roadmaps",
      value: loading ? "..." : (data?.factors?.roadmapGenerated ? "1" : "0"),
    },
    {
      title: "Skills",
      value: loading ? "..." : (data?.factors?.skillsCount || "0"),
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 bg-white shadow-sm border-gray-100"
        >
          <p className="text-gray-500 font-medium">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
