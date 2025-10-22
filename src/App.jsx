import React from "react";
import "./App.css";

function App() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login button clicked!");
  };

  const handleSignup = () => {
    alert("Redirecting to Sign Up page...");
  };

  return (
    <div className="login-container">
      {/* Left Side - Image */}
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
          <p className="tagline">Connect. Discover. Celebrate.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <div className="form-box">
          <h2>Welcome Back 👋</h2>
          <p>Login to your account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
            </div>

            <button type="submit" className="btn login-btn">Login</button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <button onClick={handleSignup} className="btn signup-btn">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
