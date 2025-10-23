import React from "react";
import { useEffect, useState } from "react";
import { activateSubscription, getClubMembers } from "../assets/api/Leader";


export default function LeaderDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subMessage, setSubMessage] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getClubMembers();
        setMembers(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  const handleSubscription = async () => {
    try {
      const res = await activateSubscription();
      setSubMessage(res.message || "Subscription activated ✅");
    } catch (err) {
      setSubMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Leader Dashboard 🧭</h1>

      <button
        onClick={handleSubscription}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Activate Subscription
      </button>

      {subMessage && <p className="mt-3 text-green-700">{subMessage}</p>}

      <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Club Members 👥</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : members.length > 0 ? (
          <ul className="space-y-2">
            {members.map((m) => (
              <li
                key={m.id}
                className="border p-3 rounded-lg flex justify-between hover:bg-gray-50"
              >
                <span>{m.username}</span>
                <span className="text-gray-500">{m.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members yet.</p>
        )}
      </div>
    </div>
  );
}
