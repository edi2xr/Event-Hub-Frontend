import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { fetchUserProfile } from "./assets/api/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/Error";
import AdminDashboard from "./pages/Admin";
import LeaderDashboard from "./pages/Leader";
import UserDashboard from "./pages/User";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        console.warn("No active session:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "leader" ? (
                <Navigate to="/leader" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based Dashboards */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/leader"
          element={user?.role === "leader" ? <LeaderDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={user?.role === "user" ? <UserDashboard /> : <Navigate to="/" />}
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
