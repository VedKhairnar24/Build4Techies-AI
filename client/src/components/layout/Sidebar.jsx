import {
  LayoutDashboard,
  User,
  FileText,
  Map,
  Github,
  Code,
  Briefcase,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import ThemeToggle from "../ThemeToggle";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    name: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    name: "Roadmap",
    icon: Map,
    path: "/roadmap",
  },
  {
    name: "GitHub",
    icon: Github,
    path: "/github",
  },
  {
    name: "Open Source",
    icon: Code,
    path: "/open-source",
  },
  {
    name: "Job Readiness",
    icon: Briefcase,
    path: "/job-readiness",
  },
];

function Sidebar() {
  return (
    <aside
      className="
      w-[280px]
      bg-[#111111]
      border-r
      border-[#262626]
      min-h-screen
      fixed
      left-0
      top-0
      "
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/logo.png"
            alt="Build4Techies"
            className="w-10 h-10"
          />

          <div>
            <h2 className="font-bold">
              Build4Techies
            </h2>

            <p className="text-xs text-zinc-500">
              AI
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition

                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-900"
                }
                `
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
