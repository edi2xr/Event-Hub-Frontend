import React, { createContext, useContext, useState } from "react";
import { eventService } from "../services/eventService";

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEvents = async (page = 1, perPage = 10, status = null) => {
    try {
      setLoading(true);
      setError(null);
      
      // Always try authenticated endpoint first (uses cookies)
      try {
        const data = await eventService.getAllEvents(page, perPage, status);
        setEvents(data.events || []);
        return data;
      } catch (authErr) {
        console.log('Auth failed, trying public endpoint:', authErr);
        // Fall back to public endpoint for regular users
        const response = await fetch('https://event-hub-backend-3.onrender.com/api/events/public');
        const data = await response.json();
        setEvents(data.events || []);
        return data;
      }
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMyTickets = async (page = 1, perPage = 10) => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getMyTickets(page, perPage);
      setMyTickets(data.tickets);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      setError(null);
      const result = await eventService.createEvent(eventData);
      await loadEvents();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      setError(null);
      const result = await eventService.updateEvent(eventId, eventData);
      await loadEvents();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setError(null);
      await eventService.deleteEvent(eventId);
      await loadEvents();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const approveEvent = async (eventId) => {
    try {
      setError(null);
      await eventService.approveEvent(eventId);
      await loadEvents();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const rejectEvent = async (eventId) => {
    try {
      setError(null);
      await eventService.rejectEvent(eventId);
      await loadEvents();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const purchaseTicket = async (eventId, phoneNumber) => {
    try {
      setError(null);
      const result = await eventService.purchaseTicket(eventId, phoneNumber);
      await loadMyTickets();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getEventTickets = async (eventId) => {
    try {
      setError(null);
      return await eventService.getEventTickets(eventId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    events,
    myTickets,
    loading,
    error,
    loadEvents,
    loadMyTickets,
    createEvent,
    updateEvent,
    deleteEvent,
    approveEvent,
    rejectEvent,
    purchaseTicket,
    getEventTickets,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

