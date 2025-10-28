import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLeader } from "../context/LeaderContext";
import { useEvents } from "../context/EventContext";
import { Home } from "lucide-react";

export default function LeaderDashboard() {
  const navigate = useNavigate();
  const { user, logout, subscribe, refreshUser } = useAuth();
  const { members, loadClubMembers } = useLeader();
  const { events, loadEvents, createEvent, deleteEvent, getEventTickets } = useEvents();
  
  const [activeTab, setActiveTab] = useState("events");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTickets, setEventTickets] = useState(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    ticket_price: 0,
    max_attendees: "",
    banner_url: ""
  });

  useEffect(() => {
    if (activeTab === "events") {
      loadEvents();
    } else if (activeTab === "members") {
      loadClubMembers();
    }
  }, [activeTab]);

  const handleSubscribe = async () => {
    try {
      const result = await subscribe();
      alert(`Subscription activated! Your club code: ${result.club_access_code}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await createEvent(newEvent);
      alert("Event created and submitted for admin approval!");
      setShowCreateModal(false);
      setNewEvent({
        title: "",
        description: "",
        event_date: "",
        location: "",
        ticket_price: 0,
        max_attendees: "",
        banner_url: ""
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(eventId);
      alert("Event deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleViewTickets = async (eventId) => {
    try {
      const data = await getEventTickets(eventId);
      setEventTickets(data);
      setSelectedEvent(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Leader Dashboard 👑
              </h1>
              {user?.club_name && (
                <span className="text-sm text-gray-600">• {user.club_name}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/welcome")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user?.subscription_active ? (
          <div className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Activate Your Subscription</h3>
                <p className="text-amber-100">Subscribe for KES 200/month to create events and invite members</p>
              </div>
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-amber-50 transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">✓ Subscription Active</h3>
                <p className="text-green-100">Club Access Code: <span className="font-mono font-bold">{user.club_access_code}</span></p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-green-50 transition-colors"
              >
                + Create Event
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 flex space-x-4 border-b bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "events"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            My Events
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "members"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            Club Members
          </button>
        </div>

        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-6xl">
                  🎉
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : event.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📅</span>
                      {new Date(event.event_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">🎫</span>
                      KES {event.ticket_price} • {event.tickets_sold} sold
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewTickets(event.id)}
                      className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      View Tickets
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "members" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Club Members</h2>
            {members.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">👥</div>
                <p>No members yet. Share your club code to invite members!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {member.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{member.username}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                <input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                  <input
                    type="datetime-local"
                    value={newEvent.event_date}
                    onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ticket Price (KES)</label>
                  <input
                    type="number"
                    value={newEvent.ticket_price}
                    onChange={(e) => setNewEvent({ ...newEvent, ticket_price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Attendees</label>
                  <input
                    type="number"
                    value={newEvent.max_attendees}
                    onChange={(e) => setNewEvent({ ...newEvent, max_attendees: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {eventTickets && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{eventTickets.event_title} - Tickets</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600 font-semibold">Total Tickets</p>
                <p className="text-2xl font-bold text-indigo-700">{eventTickets.total_tickets}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-semibold">Revenue</p>
                <p className="text-2xl font-bold text-green-700">KES {eventTickets.total_revenue}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-semibold">Commission</p>
                <p className="text-2xl font-bold text-purple-700">KES {eventTickets.total_commission}</p>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {eventTickets.tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-4 py-3">{ticket.username}</td>
                      <td className="px-4 py-3">KES {ticket.total_amount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {ticket.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(ticket.purchased_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setEventTickets(null)}
              className="mt-6 w-full px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
