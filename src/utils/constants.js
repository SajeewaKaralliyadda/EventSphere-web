// Event categories
export const EVENT_CATEGORIES = [
  { value: "concert", label: "Concert" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "sports", label: "Sports Event" },
  { value: "hackathon", label: "Hackathon" },
  { value: "competition", label: "Competition" },
  { value: "orientation", label: "Orientation" },
  { value: "cultural", label: "Cultural Event" },
  { value: "charity", label: "Charity Event" },
  { value: "exhibition", label: "Exhibition" },
  { value: "conference", label: "Conference" },
  { value: "other", label: "Other" },
];

// Faculties/Departments
export const FACULTIES = [
  { value: "computing", label: "Faculty of Computing" },
  { value: "engineering", label: "Faculty of Engineering" },
  { value: "business", label: "Faculty of Business" },
  { value: "medicine", label: "Faculty of Medicine" },
  { value: "science", label: "Faculty of Science" },
  { value: "arts", label: "Faculty of Arts" },
  { value: "law", label: "Faculty of Law" },
  { value: "management", label: "Faculty of Management" },
  { value: "humanities", label: "Faculty of Humanities" },
  { value: "all", label: "All Faculties" },
];

// User roles
export const USER_ROLES = {
  STUDENT: "STUDENT",
  ORGANIZER: "ORGANIZER",
  ADMIN: "ADMIN",
};

// Event status
export const EVENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

// Booking status
export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  CHECKED_IN: "CHECKED_IN",
  REFUNDED: "REFUNDED",
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
};

// Ticket types
export const TICKET_TYPES = [
  { value: "general", label: "General Admission" },
  { value: "vip", label: "VIP" },
  { value: "early_bird", label: "Early Bird" },
  { value: "student", label: "Student" },
  { value: "group", label: "Group" },
];

// Price ranges for filters
export const PRICE_RANGES = [
  { value: "0-500", label: "Under Rs. 500" },
  { value: "500-1000", label: "Rs. 500 - 1,000" },
  { value: "1000-2000", label: "Rs. 1,000 - 2,000" },
  { value: "2000-5000", label: "Rs. 2,000 - 5,000" },
  { value: "5000+", label: "Above Rs. 5,000" },
  { value: "free", label: "Free" },
];

// Date filter options
export const DATE_FILTERS = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "next_month", label: "Next Month" },
];

// Sort options
export const SORT_OPTIONS = [
  { value: "date_asc", label: "Date (Earliest First)" },
  { value: "date_desc", label: "Date (Latest First)" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "popular", label: "Most Popular" },
  { value: "name", label: "Name (A-Z)" },
];

// Items per page options
export const ITEMS_PER_PAGE = [12, 24, 36, 48];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  EVENTS: {
    BASE: "/events",
    BY_ID: (id) => `/events/${id}`,
    BY_ORGANIZER: "/events/organizer/my-events",
    UPLOAD_IMAGE: "/events/upload-image",
  },
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    MY_BOOKINGS: "/bookings/user/my-bookings",
    VALIDATE: "/bookings/validate-ticket",
    CHECK_IN: (id) => `/bookings/${id}/check-in`,
  },
  ADMIN: {
    EVENTS_PENDING: "/admin/events/pending",
    APPROVE_EVENT: (id) => `/admin/events/${id}/approve`,
    REJECT_EVENT: (id) => `/admin/events/${id}/reject`,
    ORGANIZERS_PENDING: "/admin/organizers/pending",
    APPROVE_ORGANIZER: (id) => `/admin/organizers/${id}/approve`,
    REJECT_ORGANIZER: (id) => `/admin/organizers/${id}/reject`,
    ANALYTICS: "/admin/analytics",
  },
};

// Maximum file size for uploads (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image formats
export const ALLOWED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Navigation menu items
export const STUDENT_NAV_ITEMS = [
  { path: "/student/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/events", label: "Browse Events", icon: "Calendar" },
  { path: "/student/bookings", label: "My Bookings", icon: "Ticket" },
  { path: "/student/profile", label: "Profile", icon: "User" },
];

export const ORGANIZER_NAV_ITEMS = [
  { path: "/organizer/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/organizer/events", label: "My Events", icon: "Calendar" },
  { path: "/organizer/create-event", label: "Create Event", icon: "Plus" },
  { path: "/organizer/scanner", label: "QR Scanner", icon: "QrCode" },
  { path: "/organizer/profile", label: "Profile", icon: "User" },
];

export const ADMIN_NAV_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/admin/events", label: "Event Approvals", icon: "Calendar" },
  { path: "/admin/organizers", label: "Organizer Approvals", icon: "Users" },
  { path: "/admin/analytics", label: "Analytics", icon: "BarChart" },
  { path: "/admin/users", label: "User Management", icon: "UserCog" },
];

// Toast notification types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  PASSWORD: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, and number",
  },
  PHONE: {
    pattern:
      /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/,
    message: "Please enter a valid Sri Lankan phone number",
  },
};
