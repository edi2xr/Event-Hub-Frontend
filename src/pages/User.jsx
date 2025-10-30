import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Home } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { events, myTickets, loadEvents, loadMyTickets, purchaseTicket } = useEvents();
  
  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showClubModal, setShowClubModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubSubscriptions, setClubSubscriptions] = useState([]);
  const [subscriptionPrice, setSubscriptionPrice] = useState(200);
  const [platformFee, setPlatformFee] = useState(20);

  useEffect(() => {
    if (activeTab === "events") {
      loadEvents();
    } else if (activeTab === "tickets") {
      loadMyTickets();
    } else if (activeTab === "subscriptions") {
      loadClubSubscriptions();
    }
  }, [activeTab]);

  const loadClubSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/subscriptions', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (response.ok) {
        setClubSubscriptions(data.subscriptions || []);
      }
    } catch (err) {
      console.error('Failed to load subscriptions:', err);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Please enter your M-Pesa phone number");
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/payments/test-mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          amount: selectedEvent.ticket_price * 1.05
        })
      })
      const result = await response.json()
      if (response.ok) {
        alert("Ticket purchase initiated! Check your phone for M-Pesa prompt.");
        setSelectedEvent(null);
        setPhoneNumber("");
      } else {
        alert(`Payment failed: ${result.error}`);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleJoinClub = (clubCode, clubName, renewalPeriod = 'monthly') => {
    // Calculate price based on renewal period
    let basePrice = 200;
    let fee = 20;
    
    switch(renewalPeriod) {
      case 'weekly': basePrice = 50; fee = 5; break;
      case 'monthly': basePrice = 200; fee = 20; break;
      case 'quarterly': basePrice = 500; fee = 50; break;
      case 'yearly': basePrice = 1800; fee = 180; break;
    }
    
    setSubscriptionPrice(basePrice);
    setPlatformFee(fee);
    setSelectedClub({ code: clubCode, name: clubName, renewalPeriod });
    setShowClubModal(true);
  };

  const handleClubSubscription = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Please enter your M-Pesa phone number");
      return;
    }
    try {
      // First initiate M-Pesa payment with 10% commission
      const response = await fetch('http://localhost:8000/api/payments/club-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          club_access_code: selectedClub.code,
          amount: subscriptionPrice + platformFee
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Club subscription payment sent to ${phoneNumber}!\nCheck your phone for M-Pesa prompt.\nClub: ${selectedClub.name}`);
        setShowClubModal(false);
        setSelectedClub(null);
        setPhoneNumber("");
        loadClubSubscriptions(); // Refresh subscriptions
      } else {
        alert(`Subscription failed: ${result.error}`);
      }
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/eventhub")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                🎪 Event Hub
              </button>
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
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "subscriptions"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Club Subscriptions
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
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white relative">
                      {event.banner_url ? (
                        <img 
                          src={event.banner_url} 
                          alt="Event Banner" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                      ) : null}
                      <div className={`text-center ${event.banner_url ? 'absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center' : ''}`}>
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
                          <span className="mr-2">🏢</span>
                          <span className="font-semibold text-blue-600">{event.club_name}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">👤</span>
                          <span>By {event.leader_name}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <div className="text-lg font-bold text-blue-600">
                              KES {event.ticket_price}
                            </div>
                            {event.user_is_club_member && (
                              <div className="text-xs text-green-600 font-semibold">
                                🎁 Member: KES {(event.ticket_price * 0.8).toFixed(0)} (-20%)
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.tickets_sold}/{event.max_attendees || "∞"} sold
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                        >
                          Purchase Ticket 🎫
                        </button>
                        <button
                          onClick={() => handleJoinClub(event.club_access_code, event.club_name, event.renewal_period)}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                          title="Join this club"
                        >
                          Join Club
                        </button>
                      </div>
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

        {activeTab === "subscriptions" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
              <h2 className="text-2xl font-bold text-white">Club Subscriptions</h2>
              <p className="text-purple-100 mt-1">Your active club memberships</p>
            </div>
            
            {clubSubscriptions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🏢</div>
                <p>You haven't subscribed to any clubs yet</p>
                <p className="text-sm mt-2">Join clubs from events to get exclusive access!</p>
              </div>
            ) : (
              <div className="divide-y">
                {clubSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{subscription.club_name}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Monthly Fee:</span>
                            <span className="ml-2 font-medium">KES 220</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Renewal:</span>
                            <span className="ml-2 font-medium">{subscription.renewal_period || 'Set by leader'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Joined:</span>
                            <span className="ml-2 font-medium">{new Date(subscription.created_at).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span className="ml-2 font-medium text-green-600">Active</span>
                          </div>
                        </div>
                        <div className="bg-green-50 p-2 rounded text-xs">
                          <p className="font-semibold text-green-800 mb-1">🎁 Active Benefits:</p>
                          <p className="text-green-700">20% ticket discounts • Early access • Chance to win free tickets</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          ACTIVE
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

      {showClubModal && selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Club</h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{selectedClub.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🏢 Club Access Code: <span className="font-mono font-bold">{selectedClub.code}</span></p>
                <p>⏰ Duration: <span className="font-semibold text-purple-600">Set by club leader (Flexible renewal)</span></p>
                
                <div className="bg-white p-3 rounded-lg mt-3">
                  <p className="font-semibold text-gray-800 mb-2">🎁 Member Privileges:</p>
                  <ul className="text-xs space-y-1">
                    <li>• 🎫 <strong>20% discount</strong> on all club event tickets</li>
                    <li>• 🎪 <strong>Early access</strong> to event bookings (24hrs before public)</li>
                    <li>• 🎁 <strong>Chance to win free tickets</strong> - Leaders pick lucky winners</li>
                    <li>• 📱 <strong>Exclusive updates</strong> and club announcements</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">🏆 VIP status available with VIP/Exclusive ticket purchases</p>
                </div>
                
                <div className="pt-2 mt-2 border-t border-purple-200">
                  <p className="text-gray-700">{selectedClub?.renewalPeriod || 'Monthly'} Subscription: <span className="font-semibold">KES {subscriptionPrice}</span></p>
                  <p className="text-gray-700">Platform Fee (10%): <span className="font-semibold">KES {platformFee}</span></p>
                  <p className="text-lg font-bold text-purple-600 mt-2">Total: KES {subscriptionPrice + platformFee}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleClubSubscription} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254700000000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa number to receive payment prompt</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700"
                >
                  Subscribe to Club
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowClubModal(false);
                    setSelectedClub(null);
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
