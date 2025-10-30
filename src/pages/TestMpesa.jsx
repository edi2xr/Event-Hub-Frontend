import React, { useState } from 'react'

export default function TestMpesa() {
  const [phone, setPhone] = useState('254712345678')
  const [result, setResult] = useState('')

  const testMpesa = async () => {
    try {
      const response = await fetch('https://event-hub-backend-2.onrender.com/api/payments/test-mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, amount: 5 })
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
      if (response.ok) {
        alert(`M-Pesa sent to ${phone}! Check your phone.`)
      } else {
        alert(`Failed: ${data.error}`)
      }
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">M-Pesa Test</h1>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="254712345678"
        />
        <button
          onClick={testMpesa}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
        >
          Send M-Pesa
        </button>
        {result && (
          <pre className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  )
}