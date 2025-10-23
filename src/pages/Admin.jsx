import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers,toggleUserStatus } from "../assets/api/admin";


export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      const updatedUser = await toggleUserStatus(userId);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? updatedUser : u))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard 👑</h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      u.active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {u.active ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleStatus(u.id)}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
