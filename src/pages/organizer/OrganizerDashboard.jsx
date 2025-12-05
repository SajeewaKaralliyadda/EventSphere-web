import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { eventService, bookingService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { EVENT_STATUS } from "../../utils/constants";

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalRevenue: 0,
    totalBookings: 0,
    pendingApproval: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch organizer's events
      const events = await eventService.getEventsByOrganizer();

      // Calculate stats
      const activeEvents = events.filter(
        (e) =>
          e.status === EVENT_STATUS.APPROVED && new Date(e.date) > new Date()
      );
      const pendingEvents = events.filter(
        (e) => e.status === EVENT_STATUS.PENDING
      );

      // Fetch bookings for organizer's events
      const bookings = await bookingService.getOrganizerBookings();
      const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

      setStats({
        totalEvents: events.length,
        activeEvents: activeEvents.length,
        totalRevenue: totalRevenue,
        totalBookings: bookings.length,
        pendingApproval: pendingEvents.length,
      });

      setRecentEvents(events.slice(0, 5));
      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data
      setStats(getMockStats());
      setRecentEvents(getMockEvents());
      setRecentBookings(getMockBookings());
    } finally {
      setLoading(false);
    }
  };

  const getMockStats = () => ({
    totalEvents: 8,
    activeEvents: 5,
    totalRevenue: 125000,
    totalBookings: 156,
    pendingApproval: 2,
  });

  const getMockEvents = () => [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      date: "2025-12-15T09:00:00",
      venue: "Main Auditorium",
      status: EVENT_STATUS.APPROVED,
      totalBookings: 45,
      capacity: 100,
      revenue: 67500,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    },
    {
      id: 2,
      title: "Annual Cultural Festival",
      date: "2025-12-20T18:00:00",
      venue: "University Grounds",
      status: EVENT_STATUS.APPROVED,
      totalBookings: 78,
      capacity: 200,
      revenue: 39000,
      imageUrl:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
    },
    {
      id: 3,
      title: "Hackathon 2025",
      date: "2025-12-10T08:00:00",
      venue: "Computer Lab",
      status: EVENT_STATUS.PENDING,
      totalBookings: 0,
      capacity: 50,
      revenue: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    },
  ];

  const getMockBookings = () => [
    {
      id: "BK101",
      eventTitle: "Tech Innovation Summit 2025",
      userName: "Kamal Perera",
      userEmail: "kamal@university.lk",
      ticketType: "General",
      quantity: 2,
      totalPrice: 3000,
      bookedAt: "2025-11-28T10:30:00",
      status: "CONFIRMED",
    },
    {
      id: "BK102",
      eventTitle: "Cultural Festival",
      userName: "Nimal Silva",
      userEmail: "nimal@university.lk",
      ticketType: "VIP",
      quantity: 1,
      totalPrice: 2000,
      bookedAt: "2025-11-28T14:20:00",
      status: "CONFIRMED",
    },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case EVENT_STATUS.APPROVED:
        return "bg-success bg-opacity-10 text-success";
      case EVENT_STATUS.PENDING:
        return "bg-warning bg-opacity-10 text-warning";
      case EVENT_STATUS.REJECTED:
        return "bg-danger bg-opacity-10 text-danger";
      case EVENT_STATUS.DRAFT:
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
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
            Here's an overview of your events and bookings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Events */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalEvents}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* Active Events */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.activeEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-success"
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

          {/* Total Revenue */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* Total Bookings */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalBookings}
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
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Approval Alert */}
        {stats.pendingApproval > 0 && (
          <Card className="mb-8 bg-warning bg-opacity-10 border-l-4 border-warning">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-warning mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {stats.pendingApproval} event
                  {stats.pendingApproval > 1 ? "s" : ""} pending approval
                </p>
                <p className="text-sm text-gray-600">
                  Your event{stats.pendingApproval > 1 ? "s are" : " is"} being
                  reviewed by the admin team
                </p>
              </div>
              <Link to="/organizer/events">
                <Button variant="outline" size="sm">
                  View Events
                </Button>
              </Link>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Your Events
              </h2>
              <div className="flex gap-3">
                <Link to="/organizer/events">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
                <Link to="/organizer/events/create">
                  <Button size="sm">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Event
                  </Button>
                </Link>
              </div>
            </div>

            {recentEvents.length > 0 ? (
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <Card key={event.id} hover className="p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full md:w-48 h-48 md:h-auto object-cover"
                      />
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(event.date, "long")} at{" "}
                              {formatDate(event.date, "time")}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              Bookings
                            </p>
                            <p className="font-semibold text-gray-900">
                              {event.totalBookings}/{event.capacity}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              Revenue
                            </p>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(event.revenue)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Venue</p>
                            <p className="font-semibold text-gray-900 text-sm truncate">
                              {event.venue}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              Capacity
                            </p>
                            <p className="font-semibold text-gray-900">
                              {Math.round(
                                (event.totalBookings / event.capacity) * 100
                              )}
                              %
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/organizer/events/${event.id}/analytics`}>
                            <Button variant="outline" size="sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                              Analytics
                            </Button>
                          </Link>
                          <Link to={`/organizer/validate?eventId=${event.id}`}>
                            <Button variant="outline" size="sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                />
                              </svg>
                              Validate
                            </Button>
                          </Link>
                          <Link to={`/events/${event.id}`}>
                            <Button variant="ghost" size="sm">
                              View
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No events yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first event to get started
                </p>
                <Link to="/organizer/events/create">
                  <Button>Create Event</Button>
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
                <Link to="/organizer/events/create">
                  <Button fullWidth className="justify-start">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create New Event
                  </Button>
                </Link>
                <Link to="/organizer/events">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Manage Events
                  </Button>
                </Link>
                <Link to="/organizer/validate">
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
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    Validate Tickets
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recent Bookings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Bookings
              </h3>
              {recentBookings.length > 0 ? (
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <Card key={booking.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 text-sm">
                          {booking.userName}
                        </p>
                        <span className="text-xs font-semibold text-success">
                          {formatCurrency(booking.totalPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {booking.eventTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.ticketType} × {booking.quantity}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(booking.bookedAt, "short")}
                      </p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <p className="text-sm text-gray-600">No bookings yet</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
