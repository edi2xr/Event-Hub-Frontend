import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.getAllUsers();
      setUsers(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      setError(null);
      const updatedUser = await authService.toggleUserStatus(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    users,
    loading,
    error,
    loadUsers,
    toggleUserStatus,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

