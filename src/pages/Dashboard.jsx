import React from "react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/auth";
import { getAllUsers } from "../api/admin";
import { getClubMembers } from "../api/leader";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile()
      .then((profile) => {
        setUser(profile);
        if (profile.role === "admin") {
          return getAllUsers();
        } else if (profile.role === "leader") {
          return getClubMembers();
        } else {
          return [];
        }
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome, {user.username} 👋
      </h1>
      <p className="text-gray-600 mb-6">Role: {user.role}</p>

      {user.role === "admin" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <ul>
            {data.map((u) => (
              <li key={u.id}>
                {u.username} — {u.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {user.role === "leader" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Club Members</h2>
          <ul>
            {data.map((m) => (
              <li key={m.id}>{m.username}</li>
            ))}
          </ul>
        </div>
      )}

      {user.role === "user" && (
        <p className="text-gray-700">You are logged in as a regular user 🎉</p>
      )}
    </div>
  );
}
