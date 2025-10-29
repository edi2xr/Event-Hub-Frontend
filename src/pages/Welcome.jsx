import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden bg-gradient-to-br from-primary-900 via-secondary-800 to-accent-600">

      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-md z-10">
        <h1 className="text-3xl font-extrabold tracking-wide select-none transition-transform duration-700 transform hover:scale-105 hover:-translate-y-1">
          Event<span className="text-accent-300">Hub</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white/10 rounded-lg font-semibold transition transform duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/20 shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-accent-400 text-black rounded-lg font-semibold transition transform duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-accent-300 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex flex-col flex-1 justify-center items-center text-center px-6 z-10">
        <div className="max-w-4xl w-full p-10 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md shadow-xl transition-all duration-700 hover:scale-105">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg transition-all duration-1000 hover:scale-105">
            Where Every Event Starts with a Spark ✨
          </h2>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-gray-100 mb-8 transition-opacity duration-1000 hover:opacity-90">
            From class projects to corporate meetings, from talent shows to team
            retreats — EventHub makes organizing, discovering, and managing events
            feel effortless. No more chaos or endless chats — just smooth,
            connected experiences for everyone.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-accent-400 rounded-full text-lg font-semibold transition transform duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-accent-300 shadow-md"
          >
            Get Started 🚀
          </button>
        </div>
      </div>

      <div className="bg-white text-gray-800 text-center py-12 z-10 transition-transform duration-700 hover:-translate-y-1">
        <h3 className="text-3xl font-bold mb-4">Plan Smarter. Communicate Better.</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Experience events the modern way — fun, fast, and seamless. Whether
          you're a student planning campus fun or a leader coordinating serious
          goals — EventHub brings everyone together.
        </p>
      </div>

      <footer className="bg-black/70 text-center py-8 text-gray-100 z-10 transition-transform duration-700 hover:-translate-y-1">
        <p className="text-lg mb-2">
          EventHub blends technology and creativity to simplify life.
        </p>
        <p className="text-md">
          It demonstrates teamwork, real-world integration with M-Pesa, and
          strong full-stack design.
        </p>
        <h4 className="mt-4 text-xl font-bold text-accent-300">JOIN US TODAY!</h4>
      </footer>
    </div>
  );
}
