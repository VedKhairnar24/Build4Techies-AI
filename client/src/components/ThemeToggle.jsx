import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "../context/ThemeContext";

function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      border
      border-[#262626]
      "
    >
      {theme === "dark"
        ? <Sun size={18} />
        : <Moon size={18} />
      }

      {theme === "dark"
        ? "Light Mode"
        : "Dark Mode"
      }
    </button>
  );
}

export default ThemeToggle;
