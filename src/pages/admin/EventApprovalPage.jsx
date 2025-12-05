import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { EVENT_STATUS } from "../../utils/constants";

const EventApprovalPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAction, setReviewAction] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Mock events data
  const getMockEvents = () => [
    {
      id: "evt101",
      title: "Tech Innovation Summit 2024",
      description:
        "A comprehensive summit featuring latest technology trends, AI innovations, and networking opportunities for students and professionals.",
      organizer: {
        id: "org1",
        name: "Kasun Perera",
        email: "kasun.p@university.ac.lk",
        faculty: "Engineering",
      },
      category: "Technology",
      faculty: "Engineering",
      date: "2024-02-15",
      time: "09:00",
      venue: "University Auditorium",
      capacity: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      ticketTypes: [
        { type: "VIP", price: 3000, quantity: 50 },
        { type: "Regular", price: 1500, quantity: 450 },
      ],
      status: EVENT_STATUS.PENDING,
      submittedDate: "2024-01-10",
      estimatedRevenue: 712500,
      priority: "high",
    },
    {
      id: "evt102",
      title: "Annual Cultural Night",
      description:
        "Celebrate diversity with performances from various cultural groups, traditional music, dance, and food stalls.",
      organizer: {
        id: "org2",
        name: "Nimali Fernando",
        email: "nimali.f@university.ac.lk",
        faculty: "Arts",
      },
      category: "Cultural",
      faculty: "Arts",
      date: "2024-02-20",
      time: "18:00",
      venue: "Open Air Theatre",
      capacity: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      ticketTypes: [{ type: "General", price: 500, quantity: 500 }],
      status: EVENT_STATUS.PENDING,
      submittedDate: "2024-01-12",
      estimatedRevenue: 250000,
      priority: "medium",
    },
    {
      id: "evt103",
      title: "Career Development Workshop",
      description:
        "Professional development workshop with industry experts covering resume building, interview skills, and career planning.",
      organizer: {
        id: "org3",
        name: "Amal Silva",
        email: "amal.s@university.ac.lk",
        faculty: "Business",
      },
      category: "Workshop",
      faculty: "Business",
      date: "2024-02-18",
      time: "14:00",
      venue: "Business Faculty Seminar Hall",
      capacity: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      ticketTypes: [{ type: "Student", price: 200, quantity: 150 }],
      status: EVENT_STATUS.PENDING,
      submittedDate: "2024-01-14",
      estimatedRevenue: 30000,
      priority: "low",
    },
    {
      id: "evt104",
      title: "Inter-Faculty Sports Meet 2024",
      description:
        "Annual sports championship featuring cricket, volleyball, athletics, and more. Support your faculty!",
      organizer: {
        id: "org4",
        name: "Thilini Jayasinghe",
        email: "thilini.j@university.ac.lk",
        faculty: "Science",
      },
      category: "Sports",
      faculty: "Science",
      date: "2024-03-01",
      time: "08:00",
      venue: "University Sports Complex",
      capacity: 1000,
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      ticketTypes: [{ type: "General", price: 300, quantity: 1000 }],
      status: EVENT_STATUS.APPROVED,
      submittedDate: "2024-01-05",
      approvedDate: "2024-01-08",
      estimatedRevenue: 300000,
      priority: "medium",
    },
    {
      id: "evt105",
      title: "Inappropriate Event",
      description: "This event violates university policies.",
      organizer: {
        id: "org5",
        name: "Test User",
        email: "test@university.ac.lk",
        faculty: "Engineering",
      },
      category: "Other",
      faculty: "Engineering",
      date: "2024-02-25",
      time: "20:00",
      venue: "TBD",
      capacity: 50,
      imageUrl: null,
      ticketTypes: [{ type: "Entry", price: 1000, quantity: 50 }],
      status: EVENT_STATUS.REJECTED,
      submittedDate: "2024-01-16",
      rejectedDate: "2024-01-16",
      rejectionReason:
        "Event does not align with university values and policies.",
      estimatedRevenue: 50000,
      priority: "low",
    },
  ];

  useEffect(() => {
    fetchEvents();

    // Check if there's a review query parameter
    const reviewId = searchParams.get("review");
    if (reviewId) {
      const event = events.find((e) => e.id === reviewId);
      if (event) {
        handleReviewEvent(event);
      }
    }
  }, [searchParams]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setEvents(getMockEvents());
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  };

  const handleReviewEvent = (event) => {
    setSelectedEvent(event);
    setReviewComment("");
    setReviewAction(null);
    setShowReviewModal(true);
  };

  const handleApproveReject = async (action) => {
    if (!reviewComment.trim()) {
      alert("Please provide a comment for your decision");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              status:
                action === "approve"
                  ? EVENT_STATUS.APPROVED
                  : EVENT_STATUS.REJECTED,
              [action === "approve" ? "approvedDate" : "rejectedDate"]:
                new Date().toISOString(),
              [action === "approve" ? "approvalComment" : "rejectionReason"]:
                reviewComment,
            }
          : event
      );

      setEvents(updatedEvents);
      setShowReviewModal(false);
      setSelectedEvent(null);
      setReviewComment("");
    } catch (error) {
      console.error("Error processing review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedEvents.length === 0) {
      alert("Please select events to approve");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to approve ${selectedEvents.length} event(s)?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedEvents = events.map((event) =>
        selectedEvents.includes(event.id)
          ? {
              ...event,
              status: EVENT_STATUS.APPROVED,
              approvedDate: new Date().toISOString(),
            }
          : event
      );

      setEvents(updatedEvents);
      setSelectedEvents([]);
    } catch (error) {
      console.error("Error bulk approving:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEventSelection = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      [EVENT_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
      [EVENT_STATUS.APPROVED]: "bg-green-100 text-green-800",
      [EVENT_STATUS.REJECTED]: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority] || colors.medium;
  };

  const filteredEvents = filterEvents();
  const pendingCount = events.filter(
    (e) => e.status === EVENT_STATUS.PENDING
  ).length;

  if (loading && events.length === 0) {
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Event Approval System
            </h1>
            <p className="text-gray-600">
              Review and manage event submissions
              {pendingCount > 0 && (
                <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                  {pendingCount} pending
                </span>
              )}
            </p>
          </div>
          {selectedEvents.length > 0 && statusFilter === "pending" && (
            <Button onClick={handleBulkApprove}>
              Approve {selectedEvents.length} Selected
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by event name or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value={EVENT_STATUS.PENDING}>Pending</option>
              <option value={EVENT_STATUS.APPROVED}>Approved</option>
              <option value={EVENT_STATUS.REJECTED}>Rejected</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <Card>
          <div className="p-12 text-center text-gray-500">
            <span className="text-6xl mb-4 block">📋</span>
            <p className="text-lg">No events found matching your filters</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Checkbox for bulk selection (only for pending) */}
                  {event.status === EVENT_STATUS.PENDING && (
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => toggleEventSelection(event.id)}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  )}

                  {/* Event Image */}
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(
                              event.priority
                            )}`}
                          >
                            {event.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Organizer:</span>
                        <div className="font-medium text-gray-900">
                          {event.organizer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.organizer.faculty}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Event Date:</span>
                        <div className="font-medium text-gray-900">
                          {formatDate(event.date)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.time} • {event.venue}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Capacity:</span>
                        <div className="font-medium text-gray-900">
                          {event.capacity} seats
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.ticketTypes.length} ticket type(s)
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Est. Revenue:</span>
                        <div className="font-medium text-green-600">
                          {formatCurrency(event.estimatedRevenue)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Submitted: {formatDate(event.submittedDate)}
                        </div>
                      </div>
                    </div>

                    {/* Rejection Reason */}
                    {event.status === EVENT_STATUS.REJECTED &&
                      event.rejectionReason && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-sm font-medium text-red-800 mb-1">
                            Rejection Reason:
                          </div>
                          <div className="text-sm text-red-700">
                            {event.rejectionReason}
                          </div>
                        </div>
                      )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleReviewEvent(event)}
                      >
                        {event.status === EVENT_STATUS.PENDING
                          ? "Review"
                          : "View Details"}
                      </Button>

                      {event.status === EVENT_STATUS.PENDING && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event);
                              setReviewAction("approve");
                              setShowReviewModal(true);
                            }}
                          >
                            ✓ Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setSelectedEvent(event);
                              setReviewAction("reject");
                              setShowReviewModal(true);
                            }}
                          >
                            ✗ Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title={`Review Event: ${selectedEvent?.title}`}
      >
        {selectedEvent && (
          <div className="space-y-4">
            {/* Event Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm text-gray-600">Event Title</div>
                <div className="font-medium text-gray-900">
                  {selectedEvent.title}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Description</div>
                <div className="text-gray-900">{selectedEvent.description}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Organizer</div>
                  <div className="font-medium text-gray-900">
                    {selectedEvent.organizer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedEvent.organizer.email}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Faculty</div>
                  <div className="font-medium text-gray-900">
                    {selectedEvent.organizer.faculty}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date & Time</div>
                  <div className="font-medium text-gray-900">
                    {formatDate(selectedEvent.date)} at {selectedEvent.time}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Venue</div>
                  <div className="font-medium text-gray-900">
                    {selectedEvent.venue}
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div>
                <div className="text-sm text-gray-600 mb-2">Ticket Types</div>
                <div className="space-y-1">
                  {selectedEvent.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium">{ticket.type}</span>
                      <span>
                        {formatCurrency(ticket.price)} × {ticket.quantity} ={" "}
                        {formatCurrency(ticket.price * ticket.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Comment */}
            {selectedEvent.status === EVENT_STATUS.PENDING && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {reviewAction === "approve"
                      ? "Approval Comment"
                      : "Review Comment"}{" "}
                    *
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={
                      reviewAction === "approve"
                        ? "Add any notes or suggestions for the organizer..."
                        : "Provide detailed feedback..."
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApproveReject("approve")}
                    disabled={loading || !reviewComment.trim()}
                    className="flex-1"
                  >
                    {loading ? "Processing..." : "✓ Approve Event"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleApproveReject("reject")}
                    disabled={loading || !reviewComment.trim()}
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    {loading ? "Processing..." : "✗ Reject Event"}
                  </Button>
                </div>
              </>
            )}

            {/* Already reviewed info */}
            {selectedEvent.status !== EVENT_STATUS.PENDING && (
              <div
                className={`p-4 rounded-lg ${
                  selectedEvent.status === EVENT_STATUS.APPROVED
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {selectedEvent.status === EVENT_STATUS.APPROVED
                    ? "Approved"
                    : "Rejected"}{" "}
                  on{" "}
                  {formatDate(
                    selectedEvent.approvedDate || selectedEvent.rejectedDate
                  )}
                </div>
                {(selectedEvent.approvalComment ||
                  selectedEvent.rejectionReason) && (
                  <div className="text-sm">
                    {selectedEvent.approvalComment ||
                      selectedEvent.rejectionReason}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventApprovalPage;
