import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { bookingService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import {
  formatDate,
  formatCurrency,
  getTimeRemaining,
} from "../../utils/helpers";

const MyBookingsPage = () => {
  const { bookingId } = useParams();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookingId) {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        setSelectedBooking(booking);
        setShowTicket(true);
      }
    }
  }, [bookingId, bookings]);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // Use mock data
      setBookings(getMockBookings());
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
          venue: "Main Auditorium, University of Colombo",
          imageUrl:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
          organizer: "Computer Science Society",
        },
        ticketType: "General Admission",
        quantity: 1,
        totalPrice: 1500,
        status: "CONFIRMED",
        bookedAt: "2025-12-01T10:30:00",
        userDetails: {
          name: "Sajeewa Perera",
          email: "sajeewa@university.lk",
          studentId: "CS/2022/001",
        },
      },
      {
        id: "BK002",
        event: {
          id: 2,
          title: "Annual Cultural Festival",
          date: "2025-12-20T18:00:00",
          venue: "University Grounds",
          imageUrl:
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
          organizer: "Cultural Club",
        },
        ticketType: "VIP",
        quantity: 2,
        totalPrice: 3000,
        status: "CONFIRMED",
        bookedAt: "2025-12-02T15:45:00",
        userDetails: {
          name: "Sajeewa Perera",
          email: "sajeewa@university.lk",
          studentId: "CS/2022/001",
        },
      },
      {
        id: "BK003",
        event: {
          id: 3,
          title: "Web Development Workshop",
          date: "2025-11-01T14:00:00",
          venue: "Lab 204",
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
          organizer: "IT Club",
        },
        ticketType: "General",
        quantity: 1,
        totalPrice: 0,
        status: "ATTENDED",
        bookedAt: "2025-10-28T09:20:00",
        userDetails: {
          name: "Sajeewa Perera",
          email: "sajeewa@university.lk",
          studentId: "CS/2022/001",
        },
      },
    ];
  };

  const filteredBookings = bookings.filter((booking) => {
    const eventDate = new Date(booking.event.date);
    const now = new Date();

    if (activeTab === "upcoming") {
      return eventDate > now && booking.status !== "CANCELLED";
    } else {
      return (
        eventDate <= now ||
        booking.status === "CANCELLED" ||
        booking.status === "ATTENDED"
      );
    }
  });

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancellingId(bookingId);
    try {
      await bookingService.cancelBooking(bookingId);
      setBookings(
        bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`ticket-${selectedBooking.id}.pdf`);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-success bg-opacity-10 text-success";
      case "CANCELLED":
        return "bg-danger bg-opacity-10 text-danger";
      case "ATTENDED":
        return "bg-primary bg-opacity-10 text-primary";
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage your event tickets and bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === "upcoming"
                ? "text-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming
            {activeTab === "upcoming" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === "past"
                ? "text-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Past
            {activeTab === "past" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} hover className="p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-64 h-48 md:h-auto relative">
                    <img
                      src={booking.event.imageUrl}
                      alt={booking.event.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.event.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                      {activeTab === "upcoming" &&
                        booking.status === "CONFIRMED" && (
                          <p className="text-sm font-medium text-primary-600 mt-2 md:mt-0">
                            {getTimeRemaining(booking.event.date)}
                          </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
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
                            className="w-4 h-4 mr-2 flex-shrink-0"
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
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
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
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
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
                          {booking.totalPrice === 0
                            ? "Free"
                            : formatCurrency(booking.totalPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {booking.status === "CONFIRMED" && (
                        <>
                          <Button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowTicket(true);
                            }}
                          >
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
                            View Ticket
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancellingId === booking.id}
                          >
                            {cancellingId === booking.id
                              ? "Cancelling..."
                              : "Cancel Booking"}
                          </Button>
                        </>
                      )}
                      <Link to={`/events/${booking.event.id}`}>
                        <Button variant="ghost">Event Details</Button>
                      </Link>
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
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === "upcoming"
                ? "No upcoming bookings"
                : "No past bookings"}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === "upcoming"
                ? "Start exploring events and book your tickets!"
                : "You haven't attended any events yet."}
            </p>
            <Link to="/events">
              <Button>Browse Events</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Ticket Modal */}
      <Modal
        isOpen={showTicket}
        onClose={() => {
          setShowTicket(false);
          setSelectedBooking(null);
        }}
        title="Event Ticket"
        size="lg"
      >
        {selectedBooking && (
          <div>
            {/* Ticket */}
            <div
              ref={ticketRef}
              className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  EventSphere
                </h2>
                <p className="text-sm text-gray-600">University Event Ticket</p>
              </div>

              {/* Event Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {selectedBooking.event.title}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(selectedBooking.event.date, "long")}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(selectedBooking.event.date, "time")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Venue</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.event.venue}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Ticket Type</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.ticketType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Quantity</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                  <QRCode
                    value={JSON.stringify({
                      bookingId: selectedBooking.id,
                      eventId: selectedBooking.event.id,
                      userId: selectedBooking.userDetails.studentId,
                    })}
                    size={200}
                    level="H"
                  />
                </div>
              </div>

              {/* Attendee Details */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Attendee Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.userDetails.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Booking ID</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Student ID</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.userDetails.studentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    <p className="font-semibold text-success">
                      {selectedBooking.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>Please present this QR code at the event entrance</p>
                <p className="mt-1">
                  Booking Date: {formatDate(selectedBooking.bookedAt, "long")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button onClick={downloadTicket} fullWidth>
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowTicket(false);
                  setSelectedBooking(null);
                }}
                fullWidth
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyBookingsPage;
