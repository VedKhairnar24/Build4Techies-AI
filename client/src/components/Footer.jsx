import { Github, Twitter, Linkedin } from "./Icons";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          <div className="md:col-span-2">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Build4Techies AI</h1>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">Career Growth Platform</p>
            <p className="text-gray-600 max-w-sm mb-6">
              Empowering the next generation of software engineers with AI-driven career insights, roadmap generation, and open-source contribution tracking.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-gray-900 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-gray-900 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-gray-900 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="/resume" className="hover:text-blue-600 transition-colors">Resume Analyzer</a></li>
              <li><a href="/github" className="hover:text-blue-600 transition-colors">GitHub Analyzer</a></li>
              <li><a href="/roadmap" className="hover:text-blue-600 transition-colors">Career Roadmaps</a></li>
              <li><a href="/opensource" className="hover:text-blue-600 transition-colors">Open Source</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">GitHub Repository <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">Star us!</span></a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Build4Techies AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
