const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    profile: `${API_BASE_URL}/auth/profile`,
    subscribe: `${API_BASE_URL}/auth/subscribe`,
    clubMembers: `${API_BASE_URL}/auth/club-members`,
    users: `${API_BASE_URL}/auth/users`,
    toggleStatus: (userId) => `${API_BASE_URL}/auth/users/${userId}/toggle-status`,
    googleAuth: `${API_BASE_URL}/auth/google-auth`,
  },
  events: {
    base: `${API_BASE_URL}/events`,
    create: `${API_BASE_URL}/events/create`,
    all: `${API_BASE_URL}/events/all`,
    single: (eventId) => `${API_BASE_URL}/events/${eventId}`,
    approve: (eventId) => `${API_BASE_URL}/events/${eventId}/approve`,
    reject: (eventId) => `${API_BASE_URL}/events/${eventId}/reject`,
    purchaseTicket: (eventId) => `${API_BASE_URL}/events/${eventId}/purchase-ticket`,
    myTickets: `${API_BASE_URL}/events/my-tickets`,
    eventTickets: (eventId) => `${API_BASE_URL}/events/${eventId}/tickets`,
  }
};

export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
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

