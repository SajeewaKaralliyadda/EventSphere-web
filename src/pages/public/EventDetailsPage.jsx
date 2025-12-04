import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { eventService, reviewService } from "../../services/apiService";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import {
  formatDate,
  formatCurrency,
  getTimeRemaining,
} from "../../utils/helpers";
import { EVENT_CATEGORIES, USER_ROLES } from "../../utils/constants";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchEventDetails();
    fetchReviews();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const data = await eventService.getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      // Mock data for demo
      setEvent(getMockEvent(id));
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getEventReviews(id);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews(getMockReviews());
    }
  };

  const getMockEvent = (eventId) => {
    const mockEvents = {
      1: {
        id: 1,
        title: "Tech Innovation Summit 2025",
        description:
          "Join us for the biggest tech event of the year featuring industry leaders, innovative startups, and cutting-edge technology demonstrations. This summit brings together students, professionals, and technology enthusiasts for a day of learning, networking, and inspiration.\n\nHighlights include:\n• Keynote speeches from industry leaders\n• Panel discussions on emerging technologies\n• Startup pitch competition\n• Networking sessions\n• Technology exhibitions\n• Workshops and hands-on demos",
        date: "2025-12-15T09:00:00",
        endDate: "2025-12-15T18:00:00",
        venue: "Main Auditorium, Computing Faculty",
        address: "University of Technology, Colombo",
        category: "conference",
        faculty: "computing",
        organizer: {
          name: "IEEE Student Branch",
          email: "ieee@university.lk",
          phone: "+94 77 123 4567",
        },
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        ticketTypes: [
          {
            id: 1,
            name: "Free Entry",
            price: 0,
            description: "General admission with access to all sessions",
            available: 250,
            total: 300,
          },
        ],
        totalSeats: 300,
        availableSeats: 250,
        status: "APPROVED",
        tags: ["Technology", "Innovation", "Networking"],
        rating: 4.5,
        reviewCount: 12,
      },
      2: {
        id: 2,
        title: "Annual Cultural Festival",
        description:
          "Experience the vibrant culture of Sri Lanka through an evening of music, dance, and art performances. Our annual cultural festival showcases the diverse talents of our university community.\n\nEvent Schedule:\n• 6:00 PM - Opening Ceremony\n• 6:30 PM - Traditional Dance Performances\n• 7:30 PM - Musical Performances\n• 8:30 PM - Fashion Show\n• 9:30 PM - Cultural Exhibition\n• 10:30 PM - Closing Ceremony",
        date: "2025-12-20T18:00:00",
        endDate: "2025-12-20T23:00:00",
        venue: "University Grounds",
        address: "Main Campus, University Road",
        category: "cultural",
        faculty: "all",
        organizer: {
          name: "Arts Society",
          email: "arts@university.lk",
          phone: "+94 77 234 5678",
        },
        imageUrl:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        ticketTypes: [
          {
            id: 1,
            name: "General",
            price: 500,
            description: "Standing area with full event access",
            available: 300,
            total: 300,
          },
          {
            id: 2,
            name: "VIP",
            price: 1500,
            description: "Reserved seating with complimentary refreshments",
            available: 150,
            total: 200,
          },
        ],
        totalSeats: 500,
        availableSeats: 450,
        status: "APPROVED",
        tags: ["Culture", "Entertainment", "Dance", "Music"],
        rating: 4.8,
        reviewCount: 25,
      },
    };
    return mockEvents[eventId] || mockEvents["1"];
  };

  const getMockReviews = () => {
    return [
      {
        id: 1,
        user: { name: "Kasun Perera", avatar: null },
        rating: 5,
        comment:
          "Amazing event! The speakers were excellent and I learned a lot.",
        date: "2025-11-20T10:30:00",
      },
      {
        id: 2,
        user: { name: "Nimal Silva", avatar: null },
        rating: 4,
        comment:
          "Well organized event. Would love to see more workshops next time.",
        date: "2025-11-19T15:45:00",
      },
    ];
  };

  const handleBookNow = (ticketType) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/events/${id}` } });
      return;
    }

    if (user?.role !== USER_ROLES.STUDENT) {
      alert("Only students can book tickets");
      return;
    }

    setSelectedTicket(ticketType);
    setQuantity(1);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = () => {
    // Navigate to booking page with selected ticket info
    navigate("/student/booking", {
      state: {
        event,
        ticketType: selectedTicket,
        quantity,
      },
    });
  };

  const calculateTotal = () => {
    return selectedTicket ? selectedTicket.price * quantity : 0;
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The event you're looking for doesn't exist.
          </p>
          <Link to="/events">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = event.rating || 0;
  const timeRemaining = getTimeRemaining(event.date);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                to="/events"
                className="text-primary-600 hover:text-primary-700"
              >
                Events
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">{event.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="mb-6">
              <img
                src={event.imageUrl || "https://via.placeholder.com/800x400"}
                alt={event.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Event Info */}
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
                    {
                      EVENT_CATEGORIES.find((c) => c.value === event.category)
                        ?.label
                    }
                  </span>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-semibold">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="ml-1">
                        ({event.reviewCount} reviews)
                      </span>
                    </div>
                    <span>•</span>
                    <span className="text-success font-medium">
                      {timeRemaining}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-gray-200 my-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
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
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold">
                      {formatDate(event.date, "long")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(event.date, "time")} -{" "}
                      {formatDate(event.endDate, "time")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
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
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-semibold">{event.venue}</p>
                    <p className="text-sm text-gray-600">{event.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
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
                  <div>
                    <p className="text-sm text-gray-500">Organized by</p>
                    <p className="font-semibold">{event.organizer.name}</p>
                    <p className="text-sm text-gray-600">
                      {event.organizer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Available Seats</p>
                    <p className="font-semibold">
                      {event.availableSeats} / {event.totalSeats}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {event.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Reviews Section */}
            <Card>
              <h3 className="text-2xl font-semibold mb-6">Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {review.user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(review.date, "short")}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h3 className="text-xl font-semibold mb-4">Select Tickets</h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {ticket.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {ticket.description}
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-primary-600">
                          {ticket.price === 0
                            ? "Free"
                            : formatCurrency(ticket.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500">
                          {ticket.available} / {ticket.total} available
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleBookNow(ticket)}
                          disabled={ticket.available === 0}
                        >
                          {ticket.available === 0 ? "Sold Out" : "Book Now"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Share Event
                  </h4>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Facebook
                    </button>
                    <button className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                      Twitter
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Confirm Booking"
        size="md"
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {event.title}
              </h4>
              <p className="text-sm text-gray-600">{selectedTicket.name}</p>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-2xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(selectedTicket.available, quantity + 1)
                    )
                  }
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity >= selectedTicket.available}
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per ticket</span>
                <span className="font-semibold">
                  {formatCurrency(selectedTicket.price)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={handleBookingConfirm}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventDetailsPage;
