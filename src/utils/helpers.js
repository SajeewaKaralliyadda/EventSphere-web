/**
 * Format date to readable string
 */
export const formatDate = (date, format = "long") => {
  const d = new Date(date);

  if (format === "short") {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (format === "time") {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (format === "datetime") {
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = "LKR") => {
  if (currency === "LKR") {
    return `Rs. ${parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount
  );
};

/**
 * Calculate time remaining until event
 */
export const getTimeRemaining = (eventDate) => {
  const now = new Date();
  const event = new Date(eventDate);
  const diff = event - now;

  if (diff < 0) return "Event has passed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} remaining`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
  return `${minutes} minute${minutes > 1 ? "s" : ""} remaining`;
};

/**
 * Check if event is upcoming
 */
export const isUpcoming = (eventDate) => {
  return new Date(eventDate) > new Date();
};

/**
 * Check if event is today
 */
export const isToday = (eventDate) => {
  const today = new Date();
  const event = new Date(eventDate);
  return today.toDateString() === event.toDateString();
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number (Sri Lankan format)
 */
export const isValidPhone = (phone) => {
  const regex =
    /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
  return regex.test(phone);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Generate QR data string for ticket
 */
export const generateQRData = (booking) => {
  return JSON.stringify({
    bookingId: booking.id,
    eventId: booking.eventId,
    userId: booking.userId,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Get event status badge color
 */
export const getEventStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
    completed: "bg-blue-100 text-blue-800",
  };
  return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
};

/**
 * Get booking status badge color
 */
export const getBookingStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    "checked-in": "bg-blue-100 text-blue-800",
    refunded: "bg-purple-100 text-purple-800",
  };
  return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Download file
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Get error message from error object
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
};
