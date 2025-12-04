import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { bookingService, eventService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  formatDate,
  formatCurrency,
  getTimeRemaining,
} from "../../utils/helpers";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    pastEvents: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user bookings
      const bookings = await bookingService.getUserBookings();
      const upcoming = bookings.filter(
        (b) => new Date(b.event.date) > new Date()
      );
      setUpcomingBookings(upcoming.slice(0, 3));

      // Fetch recommended events
      const events = await eventService.getAllEvents({
        status: "APPROVED",
        limit: 4,
      });
      setRecommendedEvents(events);

      // Calculate stats
      setStats({
        totalBookings: bookings.length,
        upcomingEvents: upcoming.length,
        pastEvents: bookings.length - upcoming.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data
      setUpcomingBookings(getMockBookings());
      setRecommendedEvents(getMockEvents());
      setStats({
        totalBookings: 5,
        upcomingEvents: 3,
        pastEvents: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const getMockBookings = () => {
    return [
      {
        id: "BK001",
        event: {
          id: 1,
          title: "Tech Innovation Summit 2025",
          date: "2025-12-15T09:00:00",
          venue: "Main Auditorium",
          imageUrl:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
        },
        ticketType: "General",
        quantity: 1,
        status: "CONFIRMED",
      },
      {
        id: "BK002",
        event: {
          id: 2,
          title: "Annual Cultural Festival",
          date: "2025-12-20T18:00:00",
          venue: "University Grounds",
          imageUrl:
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
        },
        ticketType: "VIP",
        quantity: 2,
        status: "CONFIRMED",
      },
    ];
  };

  const getMockEvents = () => {
    return [
      {
        id: 3,
        title: "Hackathon 2025: Build the Future",
        date: "2025-12-10T08:00:00",
        venue: "Computer Lab",
        category: "hackathon",
        minPrice: 1000,
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      },
      {
        id: 4,
        title: "Business Leadership Workshop",
        date: "2025-12-18T14:00:00",
        venue: "Business Faculty",
        category: "workshop",
        minPrice: 500,
        imageUrl:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
      },
    ];
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your events
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.upcomingEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Past Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.pastEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Upcoming Bookings
              </h2>
              <Link to="/student/bookings">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} hover className="p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={booking.event.imageUrl}
                        alt={booking.event.title}
                        className="w-full md:w-48 h-48 md:h-auto object-cover"
                      />
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {booking.event.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Booking ID: {booking.id}
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-success bg-opacity-10 text-success text-xs font-semibold rounded-full">
                              {booking.status}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDate(booking.event.date, "long")} at{" "}
                              {formatDate(booking.event.date, "time")}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                              </svg>
                              {booking.event.venue}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                />
                              </svg>
                              {booking.ticketType} × {booking.quantity}
                            </div>
                          </div>

                          <p className="text-sm font-medium text-primary-600 mb-3">
                            {getTimeRemaining(booking.event.date)}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Link
                            to={`/student/bookings/${booking.id}`}
                            className="flex-1"
                          >
                            <Button variant="outline" size="sm" fullWidth>
                              View Ticket
                            </Button>
                          </Link>
                          <Link
                            to={`/events/${booking.event.id}`}
                            className="flex-1"
                          >
                            <Button size="sm" fullWidth>
                              Event Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No upcoming bookings
                </h3>
                <p className="text-gray-600 mb-4">
                  Start exploring events and book your tickets!
                </p>
                <Link to="/events">
                  <Button>Browse Events</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/events">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Browse Events
                  </Button>
                </Link>
                <Link to="/student/bookings">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    My Tickets
                  </Button>
                </Link>
                <Link to="/student/profile">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    My Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recommended Events */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended for You
              </h3>
              <div className="space-y-4">
                {recommendedEvents.map((event) => (
                  <Card key={event.id} hover className="p-0 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatDate(event.date, "short")}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-bold">
                          {event.minPrice === 0
                            ? "Free"
                            : formatCurrency(event.minPrice)}
                        </span>
                        <Link to={`/events/${event.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
