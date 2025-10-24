import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { events, myTickets, loadEvents, loadMyTickets, purchaseTicket } = useEvents();
  
  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (activeTab === "events") {
      loadEvents();
    } else {
      loadMyTickets();
    }
  }, [activeTab]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Please enter your M-Pesa phone number");
      return;
    }
    try {
      await purchaseTicket(selectedEvent.id, phoneNumber);
      alert("Ticket purchase initiated! Check your phone for M-Pesa prompt.");
      setSelectedEvent(null);
      setPhoneNumber("");
      } catch (err) {
      alert(err.message);
      }
    };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome, {user?.username}! 🎉
      </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Profile</h3>
              <p className="text-blue-100">Email: {user?.email}</p>
              <p className="text-blue-100">Role: {user?.role}</p>
            </div>
            <div className="text-6xl">👤</div>
          </div>
        </div>

        <div className="mb-6 flex space-x-4 border-b bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "events"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Available Events
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "tickets"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            My Tickets
          </button>
        </div>

        {activeTab === "events" && (
          <div>
            {events.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🎪</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Available</h3>
                <p className="text-gray-600">Check back later for exciting events!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-2">🎉</div>
                        <p className="text-sm font-semibold">{event.club_name}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📅</span>
                          <span>{new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">👤</span>
                          <span>By {event.leader_name}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-lg font-bold text-blue-600">
                            KES {event.ticket_price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.tickets_sold}/{event.max_attendees || "∞"} sold
                          </div>
                        </div>
                      </div>

        <button
                        onClick={() => setSelectedEvent(event)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
        >
                        Purchase Ticket 🎫
        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600">
              <h2 className="text-2xl font-bold text-white">My Tickets</h2>
              <p className="text-blue-100 mt-1">All your purchased event tickets</p>
            </div>
            
            {myTickets.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🎫</div>
                <p>You haven't purchased any tickets yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {myTickets.map((ticket) => (
                  <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{ticket.event_title}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Ticket Price:</span>
                            <span className="ml-2 font-medium">KES {ticket.ticket_price}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Commission:</span>
                            <span className="ml-2 font-medium">KES {ticket.commission}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Paid:</span>
                            <span className="ml-2 font-bold text-blue-600">KES {ticket.total_amount}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Purchased:</span>
                            <span className="ml-2 font-medium">{new Date(ticket.purchased_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            ticket.payment_status === "completed"
                              ? "bg-green-100 text-green-800"
                              : ticket.payment_status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ticket.payment_status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Purchase Ticket</h2>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{selectedEvent.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📅 {new Date(selectedEvent.event_date).toLocaleDateString()}</p>
                <p>📍 {selectedEvent.location}</p>
                <div className="pt-2 mt-2 border-t border-blue-200">
                  <p className="text-gray-700">Ticket Price: <span className="font-semibold">KES {selectedEvent.ticket_price}</span></p>
                  <p className="text-gray-700">Commission (5%): <span className="font-semibold">KES {(selectedEvent.ticket_price * 0.05).toFixed(2)}</span></p>
                  <p className="text-lg font-bold text-blue-600 mt-2">Total: KES {(selectedEvent.ticket_price * 1.05).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254700000000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa number to receive payment prompt</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700"
                >
                  Confirm Purchase
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(null);
                    setPhoneNumber("");
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
