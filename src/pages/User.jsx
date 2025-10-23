import React from "react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../assets/api/auth";


export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <p>Loading your dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Welcome back, {user?.username}! 🎉
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg text-center">
        <p className="text-gray-700 mb-2">Email: {user?.email}</p>
        <p className="text-gray-700 mb-6">Role: {user?.role}</p>

        <button
          onClick={() => alert("Events feature coming soon 🚀")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View Upcoming Events
        </button>
      </div>
    </div>
  );
}
