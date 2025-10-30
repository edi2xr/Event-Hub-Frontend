import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";

const LeaderContext = createContext(null);

export const LeaderProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadClubMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.getClubMembers();
      setMembers(data.members || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    members,
    loading,
    error,
    loadClubMembers,
  };

  return <LeaderContext.Provider value={value}>{children}</LeaderContext.Provider>;
};

export const useLeader = () => {
  const context = useContext(LeaderContext);
  if (!context) {
    throw new Error("useLeader must be used within a LeaderProvider");
  }
  return context;
};

