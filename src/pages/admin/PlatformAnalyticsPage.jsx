import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatCurrency } from "../../utils/helpers";

const PlatformAnalyticsPage = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock analytics data
  const getMockAnalytics = () => {
    return {
      overview: {
        totalRevenue: 12458900,
        totalUsers: 1248,
        totalEvents: 342,
        totalBookings: 8956,
        platformFees: 1245890,
        revenueGrowth: 18.5,
        userGrowth: 14.2,
        eventGrowth: 22.3,
        bookingGrowth: 16.8,
      },
      revenueTrend: [
        { month: "Jul 2023", revenue: 856000, platformFees: 85600 },
        { month: "Aug 2023", revenue: 942000, platformFees: 94200 },
        { month: "Sep 2023", revenue: 1125000, platformFees: 112500 },
        { month: "Oct 2023", revenue: 1340000, platformFees: 134000 },
        { month: "Nov 2023", revenue: 1580000, platformFees: 158000 },
        { month: "Dec 2023", revenue: 1820000, platformFees: 182000 },
        { month: "Jan 2024", revenue: 2156780, platformFees: 215678 },
      ],
      categoryDistribution: [
        {
          category: "Technology",
          events: 89,
          bookings: 2456,
          revenue: 3245000,
          percentage: 26,
        },
        {
          category: "Cultural",
          events: 76,
          bookings: 2134,
          revenue: 2678000,
          percentage: 22,
        },
        {
          category: "Sports",
          events: 58,
          bookings: 1789,
          revenue: 1890000,
          percentage: 17,
        },
        {
          category: "Academic",
          events: 52,
          bookings: 1456,
          revenue: 1567000,
          percentage: 15,
        },
        {
          category: "Workshop",
          events: 45,
          bookings: 1234,
          revenue: 1423000,
          percentage: 13,
        },
        {
          category: "Other",
          events: 22,
          bookings: 887,
          revenue: 1655900,
          percentage: 7,
        },
      ],
      facultyParticipation: [
        {
          faculty: "Engineering",
          students: 345,
          organizers: 89,
          events: 112,
          bookings: 2678,
        },
        {
          faculty: "Science",
          students: 234,
          organizers: 56,
          events: 78,
          bookings: 1890,
        },
        {
          faculty: "Arts",
          students: 189,
          organizers: 67,
          events: 89,
          bookings: 2134,
        },
        {
          faculty: "Business",
          students: 156,
          organizers: 45,
          events: 45,
          bookings: 1456,
        },
        {
          faculty: "Medicine",
          students: 32,
          organizers: 27,
          events: 18,
          bookings: 798,
        },
      ],
    };
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAnalytics(getMockAnalytics());
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = (format) => {
    alert(`Exporting analytics data as ${format.toUpperCase()}...`);
  };

  if (loading && !analytics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Platform Analytics
            </h1>
            <p className="text-gray-600">
              Comprehensive insights and performance metrics
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
            {["7days", "30days", "90days", "year", "all"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "primary" : "secondary"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range === "7days"
                  ? "Last 7 Days"
                  : range === "30days"
                  ? "Last 30 Days"
                  : range === "90days"
                  ? "Last 90 Days"
                  : range === "year"
                  ? "This Year"
                  : "All Time"}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["overview", "revenue", "users", "events"].map((tab) => (
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
      {activeTab === "overview" && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(analytics.overview.totalRevenue)}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  ↑ {analytics.overview.revenueGrowth}% growth
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Users</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analytics.overview.totalUsers.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  ↑ {analytics.overview.userGrowth}% growth
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Events</div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {analytics.overview.totalEvents}
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  ↑ {analytics.overview.eventGrowth}% growth
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {analytics.overview.totalBookings.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-orange-600">
                  ↑ {analytics.overview.bookingGrowth}% growth
                </div>
              </div>
            </Card>
          </div>

          {/* Category Distribution */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Events by Category
              </h2>
              <div className="space-y-3">
                {analytics.categoryDistribution.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{category.category}</span>
                      <span className="font-medium text-gray-900">
                        {category.events} events • {category.bookings} bookings
                        • {formatCurrency(category.revenue)}
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
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && analytics && (
        <div className="space-y-6">
          {/* Revenue Trend Chart */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Revenue Trend
              </h2>
              <div className="h-80">
                <div className="flex items-end justify-between h-full gap-2">
                  {analytics.revenueTrend.map((item, index) => {
                    const maxRevenue = Math.max(
                      ...analytics.revenueTrend.map((d) => d.revenue)
                    );
                    const height = (item.revenue / maxRevenue) * 100;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div className="w-full relative group">
                          <div
                            className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer"
                            style={{ height: `${height * 2.4}px` }}
                          >
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Revenue: {formatCurrency(item.revenue)}
                              <br />
                              Fees: {formatCurrency(item.platformFees)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                          {item.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Revenue by Category */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Revenue by Category
              </h3>
              <div className="space-y-3">
                {analytics.categoryDistribution.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{category.category}</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(category.revenue)} (
                        {category.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${category.percentage * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && analytics && (
        <div className="space-y-6">
          {/* Faculty Participation */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Faculty Participation
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Faculty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Students
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Organizers
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Events
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Bookings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analytics.facultyParticipation.map((faculty, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {faculty.faculty}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {faculty.students}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {faculty.organizers}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {faculty.events}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {faculty.bookings}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && analytics && (
        <div className="space-y-6">
          {/* Event Category Performance */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Category Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Events
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Bookings
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Revenue
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Avg/Event
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analytics.categoryDistribution.map((category, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {category.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {category.events}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {category.bookings}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                          {formatCurrency(category.revenue)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatCurrency(category.revenue / category.events)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PlatformAnalyticsPage;
