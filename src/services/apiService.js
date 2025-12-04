import api from "./api";

// Authentication Services
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};

// Event Services
export const eventService = {
  getAllEvents: async (filters = {}) => {
    const response = await api.get("/events", { params: filters });
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  getEventsByOrganizer: async () => {
    const response = await api.get("/events/organizer/my-events");
    return response.data;
  },
};

// Booking/Ticket Services
export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get("/bookings/user/my-bookings");
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.post(`/bookings/${id}/cancel`);
    return response.data;
  },

  getEventBookings: async (eventId) => {
    const response = await api.get(`/bookings/event/${eventId}`);
    return response.data;
  },

  validateTicket: async (qrCode) => {
    const response = await api.post("/bookings/validate-ticket", { qrCode });
    return response.data;
  },

  checkInTicket: async (bookingId) => {
    const response = await api.post(`/bookings/${bookingId}/check-in`);
    return response.data;
  },
};

// Payment Services
export const paymentService = {
  createPaymentIntent: async (bookingId) => {
    const response = await api.post("/payments/create-intent", { bookingId });
    return response.data;
  },

  confirmPayment: async (paymentData) => {
    const response = await api.post("/payments/confirm", paymentData);
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get("/payments/history");
    return response.data;
  },
};

// Review Services
export const reviewService = {
  createReview: async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  },

  getEventReviews: async (eventId) => {
    const response = await api.get(`/reviews/event/${eventId}`);
    return response.data;
  },

  updateReview: async (id, reviewData) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

// Admin Services
export const adminService = {
  getPendingEvents: async () => {
    const response = await api.get("/admin/events/pending");
    return response.data;
  },

  approveEvent: async (eventId) => {
    const response = await api.post(`/admin/events/${eventId}/approve`);
    return response.data;
  },

  rejectEvent: async (eventId, reason) => {
    const response = await api.post(`/admin/events/${eventId}/reject`, {
      reason,
    });
    return response.data;
  },

  getPendingOrganizers: async () => {
    const response = await api.get("/admin/organizers/pending");
    return response.data;
  },

  approveOrganizer: async (organizerId) => {
    const response = await api.post(`/admin/organizers/${organizerId}/approve`);
    return response.data;
  },

  rejectOrganizer: async (organizerId, reason) => {
    const response = await api.post(`/admin/organizers/${organizerId}/reject`, {
      reason,
    });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get("/admin/analytics");
    return response.data;
  },

  getTransactions: async () => {
    const response = await api.get("/admin/transactions");
    return response.data;
  },
};

// User/Profile Services
export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  updateProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/users/profile/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.post("/users/change-password", passwordData);
    return response.data;
  },
};

// Notification Services
export const notificationService = {
  getNotifications: async () => {
    const response = await api.get("/notifications");
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};
