import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl md:text-2xl font-bold">
          Build4Techies AI
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-black">Features</a>
          <a href="#about" className="text-gray-600 hover:text-black">About</a>
          <Link to="/login" className="text-gray-600 hover:text-black">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-4 px-6 flex flex-col gap-4">
          <a href="#features" className="text-gray-600 hover:text-black py-2" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#about" className="text-gray-600 hover:text-black py-2" onClick={() => setIsOpen(false)}>About</a>
          <Link to="/login" className="text-gray-600 hover:text-black py-2" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 py-3 rounded-lg text-center mt-2"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
