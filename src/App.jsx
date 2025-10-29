import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { AdminProvider } from "./context/AdminContext";
import { LeaderProvider } from "./context/LeaderContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/Error";
import AdminDashboard from "./pages/Admin";
import LeaderDashboard from "./pages/Leader";
import UserDashboard from "./pages/User";
import Welcome from "./pages/Welcome";
import EventHub from "./components/EventHub";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-lg text-gray-600 font-semibold">Loading EventHub...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
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
            <Navigate to="/welcome" />
          )
        }
      />

      <Route path="/welcome" element={<Welcome />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Signup />}
      />

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? (
            <AdminProvider>
              <EventProvider>
                <AdminDashboard />
              </EventProvider>
            </AdminProvider>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/leader"
        element={
          user?.role === "leader" ? (
            <LeaderProvider>
              <EventProvider>
                <LeaderDashboard />
              </EventProvider>
            </LeaderProvider>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/user"
        element={
          user?.role === "user" ? (
            <EventProvider>
              <UserDashboard />
            </EventProvider>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/eventhub"
        element={
          user ? (
            <EventProvider>
              <EventHub />
            </EventProvider>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
