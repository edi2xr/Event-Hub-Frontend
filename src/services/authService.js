import { API_ENDPOINTS, apiRequest } from "../config/api";

export const authService = {
  async signup(userData) {
    return apiRequest(API_ENDPOINTS.auth.signup, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    return apiRequest(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    return apiRequest(API_ENDPOINTS.auth.logout, {
      method: "POST",
    });
  },

  async getProfile(skipRefresh = false) {
    try {
      const data = await apiRequest(API_ENDPOINTS.auth.profile, {
        method: "GET",
      });
      return data.user;
    } catch (error) {
      if (error.status === 401 && !skipRefresh) {
        try {
          await this.refreshToken();
          return await this.getProfile(true);
        } catch (refreshError) {
          const sessionError = new Error("Session expired. Please login again.");
          sessionError.status = 401;
          throw sessionError;
        }
      }
      throw error;
    }
  },

  async refreshToken() {
    return apiRequest(API_ENDPOINTS.auth.refresh, {
      method: "POST",
    });
  },

  async subscribe() {
    return apiRequest(API_ENDPOINTS.auth.subscribe, {
      method: "POST",
    });
  },

  async getClubMembers() {
    return apiRequest(API_ENDPOINTS.auth.clubMembers, {
      method: "GET",
    });
  },

  async getAllUsers() {
    const data = await apiRequest(API_ENDPOINTS.auth.users, {
      method: "GET",
    });
    return data.users;
  },

  async toggleUserStatus(userId) {
    const data = await apiRequest(API_ENDPOINTS.auth.toggleStatus(userId), {
      method: "PATCH",
    });
    return data.user;
  },

  async googleAuth(idToken) {
    return apiRequest(API_ENDPOINTS.auth.googleAuth, {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    });
  },
};

