import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import EventsPage from "./pages/public/EventsPage";
import EventDetailsPage from "./pages/public/EventDetailsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import MyBookingsPage from "./pages/student/MyBookingsPage";
import BookingPage from "./pages/student/BookingPage";

// Organizer Pages
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEventPage from "./pages/organizer/CreateEventPage";
import MyEventsPage from "./pages/organizer/MyEventsPage";
import ValidateTicketsPage from "./pages/organizer/ValidateTicketsPage";
import EventAnalyticsPage from "./pages/organizer/EventAnalyticsPage";

// Import USER_ROLES constant
import { USER_ROLES } from "./utils/constants";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <LandingPage />
              </MainLayout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Events Routes */}
          <Route
            path="/events"
            element={
              <MainLayout>
                <EventsPage />
              </MainLayout>
            }
          />

          <Route
            path="/events/:eventId"
            element={
              <MainLayout>
                <EventDetailsPage />
              </MainLayout>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <MainLayout>
                  <StudentDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/bookings"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <MainLayout>
                  <MyBookingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/bookings/:bookingId"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <MainLayout>
                  <MyBookingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/booking"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <MainLayout>
                  <BookingPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Organizer Routes */}
          <Route
            path="/organizer/dashboard"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZER]}>
                <MainLayout>
                  <OrganizerDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/events/create"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZER]}>
                <MainLayout>
                  <CreateEventPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/events"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZER]}>
                <MainLayout>
                  <MyEventsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/validate"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZER]}>
                <MainLayout>
                  <ValidateTicketsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/events/:eventId/analytics"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZER]}>
                <MainLayout>
                  <EventAnalyticsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <MainLayout>
                  <div className="container-custom py-8">
                    <h1 className="text-3xl font-bold">
                      Admin Dashboard - Coming Soon
                    </h1>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
