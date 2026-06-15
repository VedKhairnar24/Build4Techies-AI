import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Build4Techies-AI
        </h1>

        <div className="flex gap-4">
          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
