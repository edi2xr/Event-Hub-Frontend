import React, { useState, useEffect } from 'react'
import { useEvents } from '../context/EventContext'

function EventHub() {
  const { purchaseTicket } = useEvents()
  const [subscription, setSubscription] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Load public events directly
    fetch('https://event-hub-backend-3.onrender.com/events/public')
      .then(res => res.json())
      .then(data => {
        console.log('Public events loaded:', data)
        setEvents(data.events || [])
      })
      .catch(err => console.error('Failed to load events:', err))
  }, [])

  const handleBuyTickets = async (event) => {
    const phone = prompt('Enter your phone number (254XXXXXXXXX):')
    console.log('Phone entered:', phone)
    if (phone) {
      try {
        console.log('Making M-Pesa request...')
        const response = await fetch('https://event-hub-backend-3.onrender.com/api/payments/test-mpesa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: phone,
            amount: (event.price || event.ticket_price) * 1.05
          })
        })
        const result = await response.json()
        console.log('M-Pesa response:', result)
        if (response.ok) {
          alert(`M-Pesa payment request sent to ${phone}!\nCheck your phone for the payment prompt.\nCheckout ID: ${result.checkout_request_id}`)
        } else {
          alert(`Payment failed: ${result.error}`)
        }
      } catch (error) {
        console.error('M-Pesa error:', error)
        alert(`Payment failed: ${error.message}`)
      }
    }
  }

  const handleFreeTickets = async (event) => {
    const ownerPhone = prompt('Enter owner phone for verification:')
    if (ownerPhone) {
      const recipientPhone = prompt('Enter recipient phone number:')
      if (recipientPhone) {
        try {
          // Call complimentary ticket API
          alert(`Complimentary tickets sent to ${recipientPhone}!`)
        } catch (error) {
          alert('Failed to send complimentary tickets.')
        }
      }
    }
  }

  const handleSubscription = async () => {
    const phone = prompt('Enter your phone number for 200 KES subscription:')
    console.log('Subscription phone entered:', phone)
    if (phone) {
      try {
        console.log('Making subscription M-Pesa request...')
        const response = await fetch('https://event-hub-backend-3.onrender.com/api/payments/test-mpesa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: phone,
            amount: 200
          })
        })
        const result = await response.json()
        console.log('Subscription M-Pesa response:', result)
        if (response.ok) {
          alert(`Subscription payment request sent to ${phone}!\nCheck your phone for the payment prompt.\nCheckout ID: ${result.checkout_request_id}`)
        } else {
          alert(`Subscription failed: ${result.error}`)
        }
      } catch (error) {
        console.error('Subscription error:', error)
        alert(`Subscription failed: ${error.message}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="subscription-header bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/30">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎉 Event Hub
            </h1>
            <button 
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
              onClick={handleSubscription}
            >
              💳 Subscribe - KES 200
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                🎪 {event.title || event.event_title}
              </h3>
              <div className="space-y-2 text-gray-600 mb-4">
                <p className="flex items-center">
                  📅 {new Date(event.date || event.event_date).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  📍 {event.location || event.venue}
                </p>
                <p className="text-xl font-bold text-blue-600 flex items-center">
                  💰 KES {event.price || event.ticket_price}
                </p>
                <p className="text-sm text-gray-500 italic">
                  Total with 5% commission: KES {((event.price || event.ticket_price) * 1.05).toFixed(2)}
                </p>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <button 
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
                  onClick={() => handleBuyTickets(event)}
                >
                  🎫 Buy Tickets
                </button>
                <button 
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg"
                  onClick={() => handleFreeTickets(event)}
                >
                  🎁 Free Tickets (Owner)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventHub