import { useContext } from "react";

import { AuthContext }
from "../context/AuthContext";

import Sidebar
from "../components/Sidebar";

import DashboardCards
from "../components/DashboardCards";

function Dashboard() {

  const { user } =
    useContext(AuthContext);

  return (
    <div className="flex">

      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50 min-h-screen">

        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.user?.name || user?.name}
        </h1>

        <p className="text-gray-600 mb-8">
          Track your career growth with AI.
        </p>

        <DashboardCards />

      </main>

    </div>
  );
}

export default Dashboard;
