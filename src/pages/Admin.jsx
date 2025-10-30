import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { useEvents } from "../context/EventContext";
import { Calendar, Users, LogOut, CheckCircle, XCircle, Shield, Home } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { users, loading: usersLoading, loadUsers, toggleUserStatus } = useAdmin();
  const { events, loading: eventsLoading, loadEvents, approveEvent, rejectEvent } = useEvents();
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    } else {
      loadEvents();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      await approveEvent(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRejectEvent = async (eventId) => {
    try {
      await rejectEvent(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  const loading = activeTab === "users" ? usersLoading : eventsLoading;

  return (
    <div className="page-container min-h-screen">
      <nav className="bg-white dark:bg-gray-800 shadow-custom-md dark:shadow-dark-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              <h1 className="text-2xl font-display font-bold gradient-text">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/welcome")}
                className="btn-secondary flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("events")}
            className={activeTab === "events" ? "nav-link-active" : "nav-link"}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Events Management
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "nav-link-active" : "nav-link"}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Users Management
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        )}

        {!loading && activeTab === "events" && (
          <div className="card animate-fade-in">
            <div className="p-6 gradient-primary">
              <h2 className="text-2xl font-bold text-white">Event Approvals</h2>
              <p className="text-white/80 mt-1">Review and approve events created by leaders</p>
            </div>
            
            {events.length === 0 ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No events to review</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {events.map((event) => (
                  <div key={event.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h3>
                          <span className={`badge ${
                            event.status === "pending" ? "badge-warning" :
                            event.status === "approved" ? "badge-success" : "badge-danger"
                          }`}>
                            {event.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Date:</span>
                            <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                              {new Date(event.event_date).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Location:</span>
                            <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{event.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Organizer:</span>
                            <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{event.leader_name}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Price:</span>
                            <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">KES {event.ticket_price}</span>
                          </div>
                        </div>
                      </div>
                      {event.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveEvent(event.id)}
                            className="btn-primary flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectEvent(event.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && activeTab === "users" && (
          <div className="card animate-fade-in overflow-hidden">
            <div className="p-6 gradient-primary">
              <h2 className="text-2xl font-bold text-white">Users Management</h2>
              <p className="text-white/80 mt-1">Manage user accounts and permissions</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.username}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="badge-primary capitalize">{user.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={user.is_active ? "badge-success" : "badge-danger"}>
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="btn-secondary"
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
