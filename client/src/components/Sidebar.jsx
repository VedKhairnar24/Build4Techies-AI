import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  User,
  FileText,
  Github,
  Briefcase,
  Target,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h1 className="font-bold text-xl">
          Build4Techies-AI
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          to="/resume"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <FileText size={20} />
          Resume Analysis
        </Link>

        <Link
          to="/roadmap"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Target size={20} />
          Career Roadmap
        </Link>

        <Link
          to="/github"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Github size={20} />
          GitHub Analyzer
        </Link>

        <Link
          to="/opensource"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Briefcase size={20} />
          Open Source
        </Link>

        <Link
          to="/job-readiness"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Target size={20} />
          Job Readiness
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded hover:bg-red-50 text-red-600 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
