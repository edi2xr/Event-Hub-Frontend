import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Users, Crown, ArrowLeft, UserPlus, Mail, Lock, User, Building } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    club_name: "",
    club_access_code: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
<<<<<<< HEAD
=======

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://192.168.0.112:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      alert("Signup successful! You can now log in.");
      setMode("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
>>>>>>> b3742f8b69d7d41b1826749c7ab0d38c4cdb11e4
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: role
    };

    if (role === "leader") {
      payload.club_name = formData.club_name;
    } else if (role === "user" && formData.club_access_code) {
      payload.club_access_code = formData.club_access_code;
    }

    try {
      await signup(payload);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-10 text-center">
          <UserPlus className="w-20 h-20 text-white mb-6 animate-pulse" />
          <h1 className="text-6xl font-display font-bold text-white mb-4">EventHub</h1>
          <p className="text-2xl text-white/90 font-medium mb-2">Join the Community</p>
          <p className="text-lg text-white/80 max-w-md">
            Create events, connect with members, and make memories together
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md card p-8 animate-fade-in">
          {step === "role" && (
            <div>
              <h2 className="text-3xl font-display font-bold gradient-text text-center mb-2">Join EventHub</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Choose your account type</p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setRole("user");
                    setStep("form");
                  }}
                  className="card-hover w-full p-6 flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">User</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Join clubs and attend events</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRole("leader");
                    setStep("form");
                  }}
                  className="card-hover w-full p-6 flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-secondary-100 dark:bg-secondary-900 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800 transition-colors">
                    <Crown className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">Leader</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create and manage club events</p>
                  </div>
                </button>
              </div>

              <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold hover:underline">
                  Login
                </button>
              </p>
            </div>
          )}

          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-bold gradient-text mb-2">
                  Sign up as {role === "leader" ? "Leader" : "User"}
                </h2>
                <button
                  type="button"
                  onClick={() => setStep("role")}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change role
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg animate-slide-down">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              {role === "leader" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Club Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="club_name"
                      value={formData.club_name}
                      onChange={handleChange}
                      placeholder="Your club's name"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {role === "user" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Club Access Code</label>
                  <input
                    name="club_access_code"
                    value={formData.club_access_code}
                    onChange={handleChange}
                    placeholder="Enter your club's access code"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optional - you can join a club later</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
