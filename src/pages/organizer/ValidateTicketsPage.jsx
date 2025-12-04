import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import { formatDate, formatTime } from "../../utils/helpers";

const ValidateTicketsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [searchAttendee, setSearchAttendee] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [validationHistory, setValidationHistory] = useState([]);

  // Mock data for organizer's events
  const getMockEvents = () => [
    {
      id: "evt001",
      title: "Tech Innovation Summit 2024",
      date: "2024-02-15",
      time: "09:00",
      venue: "University Auditorium",
      totalBookings: 245,
      capacity: 500,
      checkedIn: 180,
    },
    {
      id: "evt002",
      title: "Annual Cultural Night",
      date: "2024-02-20",
      time: "18:00",
      venue: "Open Air Theatre",
      totalBookings: 380,
      capacity: 500,
      checkedIn: 320,
    },
    {
      id: "evt003",
      title: "Career Fair 2024",
      date: "2024-02-25",
      time: "10:00",
      venue: "Engineering Faculty Hall",
      totalBookings: 156,
      capacity: 200,
      checkedIn: 89,
    },
  ];

  // Mock attendees for selected event
  const getMockAttendees = (eventId) => [
    {
      id: "bk001",
      ticketId: "TKT-2024-001",
      studentName: "Kasun Perera",
      studentId: "ENG/2021/001",
      email: "kasun.perera@university.ac.lk",
      ticketType: "VIP",
      bookingDate: "2024-01-15",
      checkedIn: true,
      checkInTime: "2024-02-15 09:15:00",
    },
    {
      id: "bk002",
      ticketId: "TKT-2024-002",
      studentName: "Nimali Fernando",
      studentId: "ENG/2021/045",
      email: "nimali.fernando@university.ac.lk",
      ticketType: "Regular",
      bookingDate: "2024-01-18",
      checkedIn: true,
      checkInTime: "2024-02-15 09:30:00",
    },
    {
      id: "bk003",
      ticketId: "TKT-2024-003",
      studentName: "Amal Silva",
      studentId: "ENG/2021/089",
      email: "amal.silva@university.ac.lk",
      ticketType: "Regular",
      bookingDate: "2024-01-20",
      checkedIn: false,
      checkInTime: null,
    },
    {
      id: "bk004",
      ticketId: "TKT-2024-004",
      studentName: "Thilini Jayasinghe",
      studentId: "ENG/2021/112",
      email: "thilini.j@university.ac.lk",
      ticketType: "VIP",
      bookingDate: "2024-01-22",
      checkedIn: false,
      checkInTime: null,
    },
    {
      id: "bk005",
      ticketId: "TKT-2024-005",
      studentName: "Dhanushka Wickramasinghe",
      studentId: "ENG/2021/156",
      email: "dhanushka.w@university.ac.lk",
      ticketType: "Regular",
      bookingDate: "2024-01-25",
      checkedIn: true,
      checkInTime: "2024-02-15 10:00:00",
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchAttendees(selectedEvent.id);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockEvents = getMockEvents();
      setEvents(mockEvents);
      if (mockEvents.length > 0) {
        setSelectedEvent(mockEvents[0]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendees = async (eventId) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      const mockAttendees = getMockAttendees(eventId);
      setAttendees(mockAttendees);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateTicket = async () => {
    if (!ticketId.trim()) return;

    setLoading(true);
    try {
      // Simulate API call to validate ticket
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find ticket in attendees list
      const ticket = attendees.find(
        (att) => att.ticketId.toLowerCase() === ticketId.toLowerCase()
      );

      if (ticket) {
        if (ticket.checkedIn) {
          setValidationResult({
            success: false,
            message: "Ticket Already Used",
            details: `This ticket was already checked in at ${formatTime(
              ticket.checkInTime
            )}`,
            ticket: ticket,
            type: "already_used",
          });
        } else {
          // Mark as checked in
          const updatedAttendees = attendees.map((att) =>
            att.ticketId === ticket.ticketId
              ? {
                  ...att,
                  checkedIn: true,
                  checkInTime: new Date().toISOString(),
                }
              : att
          );
          setAttendees(updatedAttendees);

          // Add to validation history
          setValidationHistory([
            {
              ticketId: ticket.ticketId,
              studentName: ticket.studentName,
              time: new Date().toISOString(),
              success: true,
            },
            ...validationHistory,
          ]);

          setValidationResult({
            success: true,
            message: "Valid Ticket",
            details: "Ticket successfully validated and checked in",
            ticket: ticket,
            type: "valid",
          });
        }
      } else {
        setValidationResult({
          success: false,
          message: "Invalid Ticket",
          details: "This ticket is not valid for this event or does not exist",
          type: "invalid",
        });
      }

      setShowResultModal(true);
      setTicketId("");
    } catch (error) {
      console.error("Error validating ticket:", error);
      setValidationResult({
        success: false,
        message: "Validation Error",
        details:
          "An error occurred while validating the ticket. Please try again.",
        type: "error",
      });
      setShowResultModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCheckIn = async (attendee) => {
    if (attendee.checkedIn) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedAttendees = attendees.map((att) =>
        att.id === attendee.id
          ? { ...att, checkedIn: true, checkInTime: new Date().toISOString() }
          : att
      );
      setAttendees(updatedAttendees);

      // Add to validation history
      setValidationHistory([
        {
          ticketId: attendee.ticketId,
          studentName: attendee.studentName,
          time: new Date().toISOString(),
          success: true,
        },
        ...validationHistory,
      ]);

      setValidationResult({
        success: true,
        message: "Check-in Successful",
        details: `${attendee.studentName} has been checked in successfully`,
        ticket: attendee,
        type: "valid",
      });
      setShowResultModal(true);
    } catch (error) {
      console.error("Error checking in:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendees = attendees.filter((att) => {
    const searchLower = searchAttendee.toLowerCase();
    return (
      att.studentName.toLowerCase().includes(searchLower) ||
      att.studentId.toLowerCase().includes(searchLower) ||
      att.ticketId.toLowerCase().includes(searchLower) ||
      att.email.toLowerCase().includes(searchLower)
    );
  });

  const checkedInCount = attendees.filter((att) => att.checkedIn).length;
  const checkedInPercentage =
    attendees.length > 0
      ? Math.round((checkedInCount / attendees.length) * 100)
      : 0;

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ticket Validation
        </h1>
        <p className="text-gray-600">
          Validate and check-in attendees for your events
        </p>
      </div>

      {/* Event Selector */}
      <Card className="mb-6">
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Event
          </label>
          <select
            value={selectedEvent?.id || ""}
            onChange={(e) => {
              const event = events.find((evt) => evt.id === e.target.value);
              setSelectedEvent(event);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title} - {formatDate(event.date)} at {event.time}
              </option>
            ))}
          </select>

          {selectedEvent && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedEvent.totalBookings}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Checked In</div>
                <div className="text-2xl font-bold text-green-600">
                  {checkedInCount}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Remaining</div>
                <div className="text-2xl font-bold text-purple-600">
                  {attendees.length - checkedInCount}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Check-in Rate</div>
                <div className="text-2xl font-bold text-orange-600">
                  {checkedInPercentage}%
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validation Panel */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Validate Ticket
              </h2>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={!scanMode ? "primary" : "secondary"}
                  onClick={() => setScanMode(false)}
                  className="flex-1"
                >
                  Manual Entry
                </Button>
                <Button
                  variant={scanMode ? "primary" : "secondary"}
                  onClick={() => setScanMode(true)}
                  className="flex-1"
                >
                  QR Scan
                </Button>
              </div>

              {!scanMode ? (
                <div>
                  <Input
                    label="Enter Ticket ID"
                    placeholder="e.g., TKT-2024-001"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleValidateTicket();
                      }
                    }}
                  />
                  <Button
                    onClick={handleValidateTicket}
                    disabled={!ticketId.trim() || loading}
                    className="w-full mt-4"
                  >
                    {loading ? "Validating..." : "Validate Ticket"}
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
                  <p className="text-gray-600 mb-2">QR Scanner</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Position QR code within the frame
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="text-sm text-gray-600">
                      Camera access required
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Please allow camera permissions in your browser
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setScanMode(false)}
                  >
                    Switch to Manual Entry
                  </Button>
                </div>
              )}

              {/* Recent Validations */}
              {validationHistory.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Recent Check-ins
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {validationHistory.slice(0, 5).map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.studentName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {entry.ticketId}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(entry.time)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Attendees List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Attendee List
                </h2>
                <div className="text-sm text-gray-600">
                  {checkedInCount} / {attendees.length} checked in
                </div>
              </div>

              {/* Search */}
              <Input
                placeholder="Search by name, student ID, ticket ID, or email..."
                value={searchAttendee}
                onChange={(e) => setSearchAttendee(e.target.value)}
                className="mb-4"
              />

              {/* Attendees Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAttendees.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          No attendees found
                        </td>
                      </tr>
                    ) : (
                      filteredAttendees.map((attendee) => (
                        <tr key={attendee.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {attendee.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {attendee.studentId}
                            </div>
                            <div className="text-xs text-gray-400">
                              {attendee.email}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 font-mono">
                              {attendee.ticketId}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                attendee.ticketType === "VIP"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {attendee.ticketType}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {attendee.checkedIn ? (
                              <div>
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  Checked In
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatTime(attendee.checkInTime)}
                                </div>
                              </div>
                            ) : (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                Not Checked In
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {!attendee.checkedIn && (
                              <Button
                                size="sm"
                                onClick={() => handleQuickCheckIn(attendee)}
                                disabled={loading}
                              >
                                Check In
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Validation Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Validation Result"
      >
        <div className="text-center py-4">
          {validationResult?.success ? (
            <div>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-600 mb-2">
                {validationResult.message}
              </h3>
              <p className="text-gray-600 mb-4">{validationResult.details}</p>
              {validationResult.ticket && (
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-medium">Student:</span>{" "}
                      {validationResult.ticket.studentName}
                    </div>
                    <div>
                      <span className="font-medium">Student ID:</span>{" "}
                      {validationResult.ticket.studentId}
                    </div>
                    <div>
                      <span className="font-medium">Ticket Type:</span>{" "}
                      {validationResult.ticket.ticketType}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-600 mb-2">
                {validationResult?.message}
              </h3>
              <p className="text-gray-600">{validationResult?.details}</p>
            </div>
          )}
          <Button onClick={() => setShowResultModal(false)} className="mt-6">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ValidateTicketsPage;
