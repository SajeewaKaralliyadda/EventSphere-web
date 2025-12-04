import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eventService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { EVENT_STATUS, EVENT_CATEGORIES } from "../../utils/constants";

const MyEventsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    eventId: null,
  });
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [activeTab, searchQuery, categoryFilter, events]);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEventsByOrganizer();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Use mock data
      setEvents(getMockEvents());
    } finally {
      setLoading(false);
    }
  };

  const getMockEvents = () => [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      date: "2025-12-15T09:00:00",
      venue: "Main Auditorium",
      category: "conference",
      status: EVENT_STATUS.APPROVED,
      totalBookings: 45,
      capacity: 100,
      revenue: 67500,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      createdAt: "2025-11-01T10:00:00",
    },
    {
      id: 2,
      title: "Annual Cultural Festival",
      date: "2025-12-20T18:00:00",
      venue: "University Grounds",
      category: "cultural",
      status: EVENT_STATUS.APPROVED,
      totalBookings: 78,
      capacity: 200,
      revenue: 39000,
      imageUrl:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      createdAt: "2025-11-05T14:30:00",
    },
    {
      id: 3,
      title: "Hackathon 2025: Build the Future",
      date: "2025-12-10T08:00:00",
      venue: "Computer Lab",
      category: "hackathon",
      status: EVENT_STATUS.PENDING,
      totalBookings: 0,
      capacity: 50,
      revenue: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      createdAt: "2025-11-20T16:00:00",
    },
    {
      id: 4,
      title: "Business Leadership Workshop",
      date: "2025-11-01T14:00:00",
      venue: "Business Faculty",
      category: "workshop",
      status: EVENT_STATUS.APPROVED,
      totalBookings: 30,
      capacity: 30,
      revenue: 15000,
      imageUrl:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      createdAt: "2025-10-15T09:00:00",
    },
    {
      id: 5,
      title: "Sports Tournament 2025",
      date: "2026-01-10T10:00:00",
      venue: "Sports Complex",
      category: "sports",
      status: EVENT_STATUS.REJECTED,
      totalBookings: 0,
      capacity: 150,
      revenue: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      createdAt: "2025-11-25T11:00:00",
    },
    {
      id: 6,
      title: "AI & Machine Learning Seminar",
      date: "2025-12-28T15:00:00",
      venue: "Lecture Hall B",
      category: "conference",
      status: EVENT_STATUS.DRAFT,
      totalBookings: 0,
      capacity: 80,
      revenue: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      createdAt: "2025-11-27T13:00:00",
    },
  ];

  const filterEvents = () => {
    let filtered = [...events];

    // Filter by status tab
    const now = new Date();
    switch (activeTab) {
      case "active":
        filtered = filtered.filter(
          (e) => e.status === EVENT_STATUS.APPROVED && new Date(e.date) > now
        );
        break;
      case "pending":
        filtered = filtered.filter((e) => e.status === EVENT_STATUS.PENDING);
        break;
      case "draft":
        filtered = filtered.filter((e) => e.status === EVENT_STATUS.DRAFT);
        break;
      case "past":
        filtered = filtered.filter((e) => new Date(e.date) <= now);
        break;
      // 'all' - no filter
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  };

  const handleDeleteEvent = async () => {
    if (!deleteModal.eventId) return;

    setDeletingId(deleteModal.eventId);
    try {
      await eventService.deleteEvent(deleteModal.eventId);
      setEvents(events.filter((e) => e.id !== deleteModal.eventId));
      setDeleteModal({ isOpen: false, eventId: null });
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

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

  const tabs = [
    { id: "all", label: "All Events", count: events.length },
    {
      id: "active",
      label: "Active",
      count: events.filter(
        (e) =>
          e.status === EVENT_STATUS.APPROVED && new Date(e.date) > new Date()
      ).length,
    },
    {
      id: "pending",
      label: "Pending",
      count: events.filter((e) => e.status === EVENT_STATUS.PENDING).length,
    },
    {
      id: "draft",
      label: "Drafts",
      count: events.filter((e) => e.status === EVENT_STATUS.DRAFT).length,
    },
    {
      id: "past",
      label: "Past",
      count: events.filter((e) => new Date(e.date) <= new Date()).length,
    },
  ];

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
              My Events
            </h1>
            <p className="text-gray-600">Manage and monitor your events</p>
          </div>
          <Link to="/organizer/events/create">
            <Button>
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
        </div>

        {/* Filters */}
        <Card className="mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchQuery || categoryFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-4 font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-primary-100 text-primary-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
              )}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} hover className="p-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Event Image */}
                  <div className="sm:w-48 h-48 sm:h-auto relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>

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
                          {formatDate(event.date, "long")} at{" "}
                          {formatDate(event.date, "time")}
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
                          {event.venue}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Bookings</p>
                          <p className="font-semibold text-gray-900">
                            {event.totalBookings}/{event.capacity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Revenue</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(event.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Filled</p>
                          <p className="font-semibold text-gray-900">
                            {Math.round(
                              (event.totalBookings / event.capacity) * 100
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.status === EVENT_STATUS.APPROVED && (
                        <>
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
                        </>
                      )}
                      <Link to={`/events/${event.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setDeleteModal({ isOpen: true, eventId: event.id })
                        }
                        className="text-danger hover:text-danger-dark"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || categoryFilter
                ? "Try adjusting your filters"
                : activeTab === "all"
                ? "Create your first event to get started"
                : `You don't have any ${activeTab} events`}
            </p>
            {!searchQuery && !categoryFilter && activeTab === "all" && (
              <Link to="/organizer/events/create">
                <Button>Create New Event</Button>
              </Link>
            )}
          </Card>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, eventId: null })}
        title="Delete Event"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this event? This action cannot be
            undone. All bookings associated with this event will also be
            cancelled.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, eventId: null })}
              disabled={deletingId !== null}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteEvent}
              disabled={deletingId !== null}
            >
              {deletingId ? "Deleting..." : "Delete Event"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEventsPage;
