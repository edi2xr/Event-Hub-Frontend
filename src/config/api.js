const API_BASE_URL = import.meta.env.VITE_API_URL || "https://event-hub-backend-3.onrender.com";

export const API_ENDPOINTS = {
  auth: {
    signup: `${API_BASE_URL}/api/auth/signup`,
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    refresh: `${API_BASE_URL}/api/auth/refresh`,
    profile: `${API_BASE_URL}/api/auth/profile`,
    subscribe: `${API_BASE_URL}/api/auth/subscribe`,
    clubMembers: `${API_BASE_URL}/api/auth/club-members`,
    users: `${API_BASE_URL}/api/auth/users`,
    toggleStatus: (userId) => `${API_BASE_URL}/api/auth/users/${userId}/toggle-status`,
    googleAuth: `${API_BASE_URL}/api/auth/google-auth`,
  },
  events: {
    base: `${API_BASE_URL}/api/events`,
    create: `${API_BASE_URL}/api/events/create`,
    all: `${API_BASE_URL}/api/events/all`,
    single: (eventId) => `${API_BASE_URL}/api/events/${eventId}`,
    approve: (eventId) => `${API_BASE_URL}/api/events/${eventId}/approve`,
    reject: (eventId) => `${API_BASE_URL}/api/events/${eventId}/reject`,
    purchaseTicket: (eventId) => `${API_BASE_URL}/api/events/${eventId}/purchase-ticket`,
    myTickets: `${API_BASE_URL}/api/events/my-tickets`,
    eventTickets: (eventId) => `${API_BASE_URL}/api/events/${eventId}/tickets`,
  }
};

export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw new Error(`Network error: ${error.message}`);
  }
};

export default API_BASE_URL;

