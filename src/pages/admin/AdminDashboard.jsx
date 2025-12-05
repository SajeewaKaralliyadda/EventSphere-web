import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatCurrency, formatDate } from "../../utils/helpers";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);

  // Mock data for platform statistics
  const getMockStats = () => ({
    totalUsers: 1248,
    newUsersThisMonth: 156,
    userGrowthPercentage: 14.2,
    totalStudents: 956,
    totalOrganizers: 284,
    totalAdmins: 8,

    totalEvents: 342,
    pendingEvents: 12,
    approvedEvents: 298,
    rejectedEvents: 32,
    activeEvents: 45,

    totalRevenue: 12458900,
    revenueThisMonth: 2156780,
    revenueGrowthPercentage: 18.5,
    platformFees: 1245890,

    totalBookings: 8956,
    bookingsThisMonth: 1423,
    averageTicketPrice: 1391,
    canceledBookings: 234,

    popularCategories: [
      { name: "Technology", count: 89, percentage: 26 },
      { name: "Cultural", count: 76, percentage: 22 },
      { name: "Sports", count: 58, percentage: 17 },
      { name: "Academic", count: 52, percentage: 15 },
      { name: "Workshop", count: 45, percentage: 13 },
      { name: "Other", count: 22, percentage: 7 },
    ],
  });

  // Mock pending events
  const getMockPendingEvents = () => [
    {
      id: "evt101",
      title: "Tech Innovation Summit 2024",
      organizer: "Kasun Perera",
      faculty: "Engineering",
      category: "Technology",
      date: "2024-02-15",
      capacity: 500,
      submittedDate: "2024-01-10",
      priority: "high",
    },
    {
      id: "evt102",
      title: "Annual Cultural Night",
      organizer: "Nimali Fernando",
      faculty: "Arts",
      category: "Cultural",
      date: "2024-02-20",
      capacity: 500,
      submittedDate: "2024-01-12",
      priority: "medium",
    },
    {
      id: "evt103",
      title: "Career Development Workshop",
      organizer: "Amal Silva",
      faculty: "Business",
      category: "Workshop",
      date: "2024-02-18",
      capacity: 150,
      submittedDate: "2024-01-14",
      priority: "medium",
    },
  ];

  // Mock recent activity
  const getMockActivity = () => [
    {
      id: 1,
      type: "event_approved",
      message: 'Approved "Hackathon 2024" by John Doe',
      timestamp: "2024-01-15 10:30:00",
      icon: "✅",
    },
    {
      id: 2,
      type: "user_registered",
      message: "New organizer registered: Sarah Wilson",
      timestamp: "2024-01-15 10:15:00",
      icon: "👤",
    },
    {
      id: 3,
      type: "event_rejected",
      message: 'Rejected "Random Event" due to policy violation',
      timestamp: "2024-01-15 09:45:00",
      icon: "❌",
    },
    {
      id: 4,
      type: "booking_surge",
      message: 'High booking activity detected for "Music Festival"',
      timestamp: "2024-01-15 09:30:00",
      icon: "📈",
    },
    {
      id: 5,
      type: "event_submitted",
      message: 'New event submitted: "Science Fair 2024"',
      timestamp: "2024-01-15 09:00:00",
      icon: "📝",
    },
  ];

  // Mock system health
  const getMockSystemHealth = () => ({
    apiStatus: "healthy",
    databaseStatus: "healthy",
    paymentGateway: "healthy",
    emailService: "healthy",
    uptime: "99.9%",
    lastIncident: "15 days ago",
    activeUsers: 234,
    serverLoad: 45,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats(getMockStats());
      setPendingEvents(getMockPendingEvents());
      setRecentActivity(getMockActivity());
      setSystemHealth(getMockSystemHealth());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority] || colors.medium;
  };

  const getHealthStatus = (status) => {
    if (status === "healthy")
      return { color: "text-green-600", icon: "✓", text: "Healthy" };
    if (status === "warning")
      return { color: "text-yellow-600", icon: "⚠", text: "Warning" };
    return { color: "text-red-600", icon: "✗", text: "Down" };
  };

  if (loading && !stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Pending Approvals Alert */}
      {stats && stats.pendingEvents > 0 && (
        <Card className="mb-6 border-l-4 border-yellow-500 bg-yellow-50">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {stats.pendingEvents} Events Awaiting Approval
                </h3>
                <p className="text-sm text-gray-600">
                  Review and approve pending events to keep the platform active
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/admin/events")}>
              Review Events
            </Button>
          </div>
        </Card>
      )}

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Stats */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Users</div>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.totalUsers.toLocaleString()}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">
                +{stats?.newUsersThisMonth} this month
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div>Students: {stats?.totalStudents}</div>
              <div>Organizers: {stats?.totalOrganizers}</div>
            </div>
          </div>
        </Card>

        {/* Events Stats */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Events</div>
              <span className="text-2xl">🎫</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.totalEvents}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-blue-600 font-medium">
                {stats?.activeEvents} active now
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div>Approved: {stats?.approvedEvents}</div>
              <div>Pending: {stats?.pendingEvents}</div>
            </div>
          </div>
        </Card>

        {/* Revenue Stats */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Revenue</div>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {formatCurrency(stats?.totalRevenue)}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">
                +{stats?.revenueGrowthPercentage}% growth
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div>This Month: {formatCurrency(stats?.revenueThisMonth)}</div>
              <div>Platform Fees: {formatCurrency(stats?.platformFees)}</div>
            </div>
          </div>
        </Card>

        {/* Bookings Stats */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Bookings</div>
              <span className="text-2xl">🎟️</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {stats?.totalBookings.toLocaleString()}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-purple-600 font-medium">
                +{stats?.bookingsThisMonth} this month
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div>Avg Price: {formatCurrency(stats?.averageTicketPrice)}</div>
              <div>Canceled: {stats?.canceledBookings}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Events - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Pending Event Approvals
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/admin/events")}
                >
                  View All
                </Button>
              </div>

              {pendingEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">✅</span>
                  <p>All events have been reviewed!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {event.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(
                                event.priority
                              )}`}
                            >
                              {event.priority}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>👤 Organizer: {event.organizer}</div>
                            <div>
                              🏛️ Faculty: {event.faculty} • {event.category}
                            </div>
                            <div>📅 Event Date: {formatDate(event.date)}</div>
                            <div>
                              📝 Submitted: {formatDate(event.submittedDate)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/events?review=${event.id}`)
                            }
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* System Health */}
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                System Health
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Server</span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      getHealthStatus(systemHealth?.apiStatus).color
                    }`}
                  >
                    {getHealthStatus(systemHealth?.apiStatus).icon}{" "}
                    {getHealthStatus(systemHealth?.apiStatus).text}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      getHealthStatus(systemHealth?.databaseStatus).color
                    }`}
                  >
                    {getHealthStatus(systemHealth?.databaseStatus).icon}{" "}
                    {getHealthStatus(systemHealth?.databaseStatus).text}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      getHealthStatus(systemHealth?.paymentGateway).color
                    }`}
                  >
                    {getHealthStatus(systemHealth?.paymentGateway).icon}{" "}
                    {getHealthStatus(systemHealth?.paymentGateway).text}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      getHealthStatus(systemHealth?.emailService).color
                    }`}
                  >
                    {getHealthStatus(systemHealth?.emailService).icon}{" "}
                    {getHealthStatus(systemHealth?.emailService).text}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-semibold text-green-600">
                      {systemHealth?.uptime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold text-gray-900">
                      {systemHealth?.activeUsers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Server Load</span>
                    <span className="font-semibold text-gray-900">
                      {systemHealth?.serverLoad}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Incident</span>
                    <span className="font-semibold text-gray-900">
                      {systemHealth?.lastIncident}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Popular Categories */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Popular Event Categories
            </h2>
            <div className="space-y-3">
              {stats?.popularCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="font-medium text-gray-900">
                      {category.count} events ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${category.percentage * 3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/events")}
              className="w-full"
            >
              📋 Manage Events
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/users")}
              className="w-full"
            >
              👥 Manage Users
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/analytics")}
              className="w-full"
            >
              📊 View Analytics
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/settings")}
              className="w-full"
            >
              ⚙️ Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
