import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatDate, formatCurrency } from "../../utils/helpers";

const EventAnalyticsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState("7days"); // 7days, 30days, all
  const [activeTab, setActiveTab] = useState("overview"); // overview, sales, attendees

  // Mock event data
  const getMockEvent = () => ({
    id: eventId,
    title: "Tech Innovation Summit 2024",
    date: "2024-02-15",
    time: "09:00",
    venue: "University Auditorium",
    category: "Technology",
    capacity: 500,
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  });

  // Mock analytics data
  const getMockAnalytics = () => ({
    overview: {
      totalBookings: 345,
      totalRevenue: 517500,
      averageTicketPrice: 1500,
      capacityFilled: 69,
      canceledBookings: 12,
      refundedAmount: 18000,
    },
    salesByTicketType: [
      { type: "VIP", sold: 45, revenue: 135000, price: 3000 },
      { type: "Regular", sold: 250, revenue: 375000, price: 1500 },
      { type: "Student", sold: 50, revenue: 25000, price: 500 },
    ],
    salesTrend: [
      { date: "2024-01-15", bookings: 15, revenue: 22500 },
      { date: "2024-01-16", bookings: 28, revenue: 42000 },
      { date: "2024-01-17", bookings: 42, revenue: 63000 },
      { date: "2024-01-18", bookings: 35, revenue: 52500 },
      { date: "2024-01-19", bookings: 38, revenue: 57000 },
      { date: "2024-01-20", bookings: 52, revenue: 78000 },
      { date: "2024-01-21", bookings: 45, revenue: 67500 },
      { date: "2024-01-22", bookings: 40, revenue: 60000 },
      { date: "2024-01-23", bookings: 30, revenue: 45000 },
      { date: "2024-01-24", bookings: 20, revenue: 30000 },
    ],
    attendeesByFaculty: [
      { faculty: "Engineering", count: 145, percentage: 42 },
      { faculty: "Science", count: 89, percentage: 26 },
      { faculty: "Arts", count: 56, percentage: 16 },
      { faculty: "Business", count: 35, percentage: 10 },
      { faculty: "Medicine", count: 20, percentage: 6 },
    ],
    attendeesByYear: [
      { year: "1st Year", count: 52, percentage: 15 },
      { year: "2nd Year", count: 87, percentage: 25 },
      { year: "3rd Year", count: 120, percentage: 35 },
      { year: "4th Year", count: 86, percentage: 25 },
    ],
    peakBookingHours: [
      { hour: "08:00-10:00", count: 45 },
      { hour: "10:00-12:00", count: 78 },
      { hour: "12:00-14:00", count: 62 },
      { hour: "14:00-16:00", count: 89 },
      { hour: "16:00-18:00", count: 71 },
    ],
    topReferrers: [
      { source: "Direct", count: 156, percentage: 45 },
      { source: "Facebook", count: 89, percentage: 26 },
      { source: "Email", count: 67, percentage: 19 },
      { source: "WhatsApp", count: 33, percentage: 10 },
    ],
  });

  useEffect(() => {
    fetchEventAnalytics();
  }, [eventId, timeRange]);

  const fetchEventAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEvent(getMockEvent());
      setAnalytics(getMockAnalytics());
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = (format) => {
    // Simulate export functionality
    alert(`Exporting analytics data as ${format.toUpperCase()}...`);
  };

  if (loading && !analytics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!event || !analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-4">Event not found</p>
            <Button onClick={() => navigate("/organizer/events")}>
              Back to Events
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate("/organizer/events")}
          className="mb-4"
        >
          ← Back to Events
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {event.title}
            </h1>
            <p className="text-gray-600">
              {formatDate(event.date)} • {event.venue}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => handleExportData("csv")}>
              Export CSV
            </Button>
            <Button variant="secondary" onClick={() => handleExportData("pdf")}>
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <Card className="mb-6">
        <div className="p-4 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "7days" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeRange("7days")}
            >
              Last 7 Days
            </Button>
            <Button
              variant={timeRange === "30days" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeRange("30days")}
            >
              Last 30 Days
            </Button>
            <Button
              variant={timeRange === "all" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTimeRange("all")}
            >
              All Time
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["overview", "sales", "attendees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
                <div className="text-3xl font-bold text-gray-900">
                  {analytics.overview.totalBookings}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {analytics.overview.canceledBookings} canceled
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(analytics.overview.totalRevenue)}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {formatCurrency(analytics.overview.refundedAmount)} refunded
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">
                  Average Ticket Price
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(analytics.overview.averageTicketPrice)}
                </div>
                <div className="mt-2 text-sm text-gray-500">Per booking</div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">
                  Capacity Filled
                </div>
                <div className="text-3xl font-bold text-purple-600">
                  {analytics.overview.capacityFilled}%
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {event.capacity - analytics.overview.totalBookings} seats left
                </div>
              </div>
            </Card>
          </div>

          {/* Sales Trend Chart */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Sales Trend
              </h2>
              <div className="h-80">
                {/* Simple bar chart visualization */}
                <div className="flex items-end justify-between h-full gap-2">
                  {analytics.salesTrend.map((item, index) => {
                    const maxBookings = Math.max(
                      ...analytics.salesTrend.map((d) => d.bookings)
                    );
                    const height = (item.bookings / maxBookings) * 100;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div className="w-full relative group">
                          <div
                            className="w-full bg-primary-500 rounded-t hover:bg-primary-600 transition-colors cursor-pointer"
                            style={{ height: `${height * 2.4}px` }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.bookings} bookings
                              <br />
                              {formatCurrency(item.revenue)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                          {formatDate(item.date).split(" ")[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Peak Booking Hours */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Peak Booking Hours
                </h3>
                <div className="space-y-3">
                  {analytics.peakBookingHours.map((item, index) => {
                    const maxCount = Math.max(
                      ...analytics.peakBookingHours.map((h) => h.count)
                    );
                    const percentage = (item.count / maxCount) * 100;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.hour}</span>
                          <span className="font-medium text-gray-900">
                            {item.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Top Referrers */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Traffic Sources
                </h3>
                <div className="space-y-3">
                  {analytics.topReferrers.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.source}</span>
                        <span className="font-medium text-gray-900">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Sales Tab */}
      {activeTab === "sales" && (
        <div className="space-y-6">
          {/* Revenue by Ticket Type */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Revenue by Ticket Type
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sold
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analytics.salesByTicketType.map((ticket, index) => {
                      const percentage =
                        (ticket.revenue / analytics.overview.totalRevenue) *
                        100;
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                ticket.type === "VIP"
                                  ? "bg-purple-100 text-purple-800"
                                  : ticket.type === "Regular"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {ticket.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(ticket.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ticket.sold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {formatCurrency(ticket.revenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-primary-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {analytics.salesByTicketType.reduce(
                          (sum, t) => sum + t.sold,
                          0
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        {formatCurrency(analytics.overview.totalRevenue)}
                      </td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </Card>

          {/* Revenue Breakdown Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Revenue Distribution
                </h3>
                <div className="flex items-center justify-center h-64">
                  {/* Simple pie chart representation */}
                  <div className="relative w-48 h-48">
                    {analytics.salesByTicketType.map((ticket, index) => {
                      const percentage =
                        (ticket.revenue / analytics.overview.totalRevenue) *
                        100;
                      const colors = ["#8B5CF6", "#3B82F6", "#10B981"];
                      return (
                        <div key={index} className="mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: colors[index] }}
                            />
                            <span className="text-sm text-gray-700">
                              {ticket.type}
                            </span>
                            <span className="text-sm font-medium text-gray-900 ml-auto">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sales Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Gross Revenue</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(analytics.overview.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Refunds</span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(analytics.overview.refundedAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Platform Fee (10%)</span>
                    <span className="font-medium text-orange-600">
                      -{formatCurrency(analytics.overview.totalRevenue * 0.1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 bg-green-50 px-4 rounded-lg">
                    <span className="font-bold text-gray-900">Net Revenue</span>
                    <span className="font-bold text-green-600 text-xl">
                      {formatCurrency(
                        analytics.overview.totalRevenue * 0.9 -
                          analytics.overview.refundedAmount
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Attendees Tab */}
      {activeTab === "attendees" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendees by Faculty */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Attendees by Faculty
                </h3>
                <div className="space-y-3">
                  {analytics.attendeesByFaculty.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.faculty}</span>
                        <span className="font-medium text-gray-900">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Attendees by Year */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Attendees by Academic Year
                </h3>
                <div className="space-y-3">
                  {analytics.attendeesByYear.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.year}</span>
                        <span className="font-medium text-gray-900">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Demographics Summary */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Demographics Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Most Popular Faculty
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {analytics.attendeesByFaculty[0].faculty}
                  </div>
                  <div className="text-sm text-gray-500">
                    {analytics.attendeesByFaculty[0].count} attendees
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Most Common Year
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {analytics.attendeesByYear[2].year}
                  </div>
                  <div className="text-sm text-gray-500">
                    {analytics.attendeesByYear[2].count} attendees
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Diversity Index
                  </div>
                  <div className="text-2xl font-bold text-green-600">High</div>
                  <div className="text-sm text-gray-500">
                    {analytics.attendeesByFaculty.length} faculties represented
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EventAnalyticsPage;
