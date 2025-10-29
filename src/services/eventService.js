import { API_ENDPOINTS, apiRequest } from "../config/api";

export const eventService = {
  async createEvent(eventData) {
    return apiRequest(API_ENDPOINTS.events.create, {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  },

  async getAllEvents(page = 1, perPage = 10, status = null) {
    const params = new URLSearchParams({ page, per_page: perPage });
    if (status) params.append("status", status);

    // Always use authenticated endpoint for admin/leader access
    return apiRequest(`${API_ENDPOINTS.events.all}?${params}`, {
      method: "GET",
    });
  },

  async getEvent(eventId) {
    const data = await apiRequest(API_ENDPOINTS.events.single(eventId), {
      method: "GET",
    });
    return data.event;
  },

  async updateEvent(eventId, eventData) {
    return apiRequest(API_ENDPOINTS.events.single(eventId), {
      method: "PATCH",
      body: JSON.stringify(eventData),
    });
  },

  async deleteEvent(eventId) {
    return apiRequest(API_ENDPOINTS.events.single(eventId), {
      method: "DELETE",
    });
  },

  async approveEvent(eventId) {
    return apiRequest(API_ENDPOINTS.events.approve(eventId), {
      method: "PATCH",
    });
  },

  async rejectEvent(eventId) {
    return apiRequest(API_ENDPOINTS.events.reject(eventId), {
      method: "PATCH",
    });
  },

  async purchaseTicket(eventId, phoneNumber) {
    return apiRequest(API_ENDPOINTS.events.purchaseTicket(eventId), {
      method: "POST",
      body: JSON.stringify({ phone_number: phoneNumber }),
    });
  },

  async getMyTickets(page = 1, perPage = 10) {
    const params = new URLSearchParams({ page, per_page: perPage });
    return apiRequest(`${API_ENDPOINTS.events.myTickets}?${params}`, {
      method: "GET",
    });
  },

  async getEventTickets(eventId) {
    return apiRequest(API_ENDPOINTS.events.eventTickets(eventId), {
      method: "GET",
    });
  },
};

