import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">
          404
        </h1>
        <p className="mt-4 text-gray-500 text-xl">
          Page not found
        </p>
        <div className="mt-8">
          <Link to="/" className="text-blue-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
