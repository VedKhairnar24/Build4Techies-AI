import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Target,
  LogOut,
} from "lucide-react";
import { Github } from "./Icons";
import toast from "react-hot-toast";

function Sidebar({ onClose }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    if (onClose) onClose();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h1 className="font-bold text-xl text-gray-900">
          Build4Techies AI
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">
          Career Growth Platform
        </p>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          to="/resume"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <FileText size={20} />
          Resume Analysis
        </Link>

        <Link
          to="/roadmap"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Target size={20} />
          Career Roadmap
        </Link>

        <Link
          to="/github"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Github size={20} />
          GitHub Analyzer
        </Link>

        <Link
          to="/opensource"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
        >
          <Briefcase size={20} />
          Open Source
        </Link>

        <Link
          to="/job-readiness"
          onClick={onClose}
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
