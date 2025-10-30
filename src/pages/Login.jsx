import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, User, Lock, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { signInWithGoogle } from "../config/firebase";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const response = await login({ idToken });
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container flex min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-10 text-center">
          <Sparkles className="w-20 h-20 text-white mb-6 animate-pulse" />
          <h1 className="text-6xl font-display font-bold text-white mb-4">EventHub</h1>
          <p className="text-2xl text-white/90 font-medium mb-2">Welcome Back!</p>
          <p className="text-lg text-white/80 max-w-md">
            Where memories are made and friendships bloom
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold gradient-text mb-2">
              Welcome Home!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Login to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center gap-2 animate-slide-down">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Let's Go!</span>
                </>
              )}
            </button>
          </form>



          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-2">or</p>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  <span className="font-medium">Signing in...</span>
                </>
              ) : (
                <>
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Continue with Google</span>
                </>
              )}
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            New around here?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold hover:underline"
            >
              Join the fun!
            </button>
            <p><button onClick={()=>navigate("/welcome")}>Go home</button></p>
          </p>
        </div>
      </div>
    </div>
  );
}
