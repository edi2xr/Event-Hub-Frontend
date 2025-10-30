import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Frown } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-display font-bold gradient-text">
            404
          </h1>
          <Frown className="w-16 h-16 mx-auto mt-4 text-gray-400 dark:text-gray-600 animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-slide-up">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto animate-slide-up animate-delay-100">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center animate-slide-up animate-delay-200">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn-primary flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
