import { useState } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Design Conference',
      date: 'Mar 15, 2024',
      time: '10:00 AM',
      location: 'San Francisco',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      category: 'Design'
    },
    {
      id: 2,
      title: 'Tech Summit 2024',
      date: 'Apr 20, 2024',
      time: '9:00 AM',
      location: 'New York',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Music Festival',
      date: 'May 10, 2024',
      time: '6:00 PM',
      location: 'Los Angeles',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      category: 'Music'
    }
  ])

  const [activeTab, setActiveTab] = useState('All Events')
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = ['All Events', 'Design', 'Technology', 'Music']

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'All Events' || event.category === activeTab
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">EventHub</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Events</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <button className="profile-btn">Profile</button>
      </nav>

      <div className="hero">
        <h1>Discover Amazing Events</h1>
        <p>Find and join events that match your interests</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <span className="category">{event.category}</span>
              <h3>{event.title}</h3>
              <div className="event-details">
                <p>📅 {event.date}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
              <div className="event-footer">
                <span className="price">{event.price}</span>
                <button className="join-btn">Join Event</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
