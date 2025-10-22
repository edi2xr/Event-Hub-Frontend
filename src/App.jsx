import React from "react";
import "./App.css";

function App() {
  const handleUserLogin = (formSubmissionEvent) => {
    formSubmissionEvent.preventDefault();
    alert("Welcome back! Login successful! 🎉");
  };

  const redirectToSignup = () => {
    alert("Let's get you signed up! ✨");
  };

  return (
    <div className="login-container">
      <div
        className="login-left"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="overlay">
          <h1 className="logo">Event Hub</h1>
          <p className="tagline">Where Amazing Events Come to Life</p>
        </div>
      </div>

      <div className="login-right">
        <div className="form-box">
          <h2>Hey there! Welcome back 👋</h2>
          <p>We've missed you! Ready to discover amazing events?</p>

          <form onSubmit={handleUserLogin}>
            <div className="input-group">
              <label>Your Email Address</label>
              <input 
                type="email" 
                placeholder="What's your email? (e.g., sarah@example.com)" 
                required 
              />
            </div>

            <div className="input-group">
              <label>Your Password</label>
              <input 
                type="password" 
                placeholder="Enter your super secret password" 
                required 
              />
            </div>

            <button type="submit" className="btn login-btn">
              Let's Go! 🚀
            </button>
          </form>

          <p className="signup-text">
            First time here?{" "}
            <button onClick={redirectToSignup} className="btn signup-btn">
              Join Our Community
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;