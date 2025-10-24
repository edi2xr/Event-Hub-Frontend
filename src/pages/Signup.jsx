import React from "react";
import { useState } from "react";
import { loginUser, fetchUserProfile } from "../assets/api/auth";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [mode, setMode] = useState("choose");
  const [role, setRole] = useState(null); 
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser({ email: formData.email, password: formData.password });
      const user = await fetchUserProfile();
      if (user.role === "leader") navigate("/leader-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT*/}
      <div
        className="dashboard-left"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Welcome to EventHub 🚀
        </h1>
        <p className="text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            Your hub for every event ✨
        </p>


      </div>

      {/* RIGHT*/}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        {mode === "choose" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">You're signing up as...</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setRole("user");
                  setMode("signup");
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                User
              </button>
              <button
                onClick={() => {
                  setRole("leader");
                  setMode("signup");
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg"
              >
                Leader
              </button>
            </div>
            <p className="mt-6">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-semibold"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          </div>
        )}

        {mode === "signup" && (
          <form
            onSubmit={handleSignup}
            className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Sign up as {role}
            </h2>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />

            {/* Extra field for Leader */}
            {role === "leader" && (
              <input
                name="club_name"
                placeholder="Club Name"
                value={formData.club_name || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
              />
            )}

            {/* Extra field for User */}
            {role === "user" && (
              <input
                name="club_access_code"
                placeholder="Club Access Code"
                value={formData.club_access_code || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Login
              </span>
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        )}


        {mode === "login" && (
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("choose")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Sign Up
              </span>
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
