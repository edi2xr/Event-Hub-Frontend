import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-sky-800 to-emerald-600 opacity-95"></div>

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g1" cx="20%" cy="10%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="80%" cy="90%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
          <rect width="100%" height="100%" fill="url(#g2)" />
        </svg>

 
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.15'/></svg>")`}}></div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-md z-10">
        <h1 className="text-3xl font-extrabold tracking-wide select-none">
          Event<span className="text-amber-300">Hub</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </div>
      </nav>


      <div className="flex flex-col flex-1 justify-center items-center text-center px-6 z-10">
        <div className="max-w-4xl w-full p-10 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md shadow-xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Where Every Event Starts with a Spark ✨
          </h2>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-gray-100 mb-8">
            From class projects to corporate meetings, from talent shows to team
            retreats — EventHub makes organizing, discovering, and managing events
            feel effortless. No more chaos or endless chats — just smooth,
            connected experiences for everyone.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-amber-400 hover:bg-amber-300 rounded-full text-lg font-semibold transition shadow-md"
          >
            Get Started 🚀
          </button>
        </div>
      </div>

      {/* Mid Section */}
      <div className="bg-white text-gray-800 text-center py-12 z-10">
        <h3 className="text-3xl font-bold mb-4">Plan Smarter. Communicate Better.</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Experience events the modern way — fun, fast, and seamless. Whether
          you're a student planning campus fun or a leader coordinating serious
          goals — EventHub brings everyone together.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-black/70 text-center py-8 text-gray-100 z-10">
        <p className="text-lg mb-2">
          EventHub blends technology and creativity to simplify life.
        </p>
        <p className="text-md">
          It demonstrates teamwork, real-world integration with M-Pesa, and
          strong full-stack design.
        </p>
        <h4 className="mt-4 text-xl font-bold text-amber-300">JOIN US TODAY!</h4>
      </footer>
    </div>
  );
}
