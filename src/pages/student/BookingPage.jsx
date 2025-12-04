import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { bookingService, paymentService } from "../../services/apiService";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, ticketType, quantity } = location.state || {};

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    specialRequests: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  if (!event || !ticketType) {
    navigate("/events");
    return null;
  }

  const total = ticketType.price * quantity;
  const serviceFee = total * 0.05; // 5% service fee
  const grandTotal = total + serviceFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create booking
      const bookingData = {
        eventId: event.id,
        ticketTypeId: ticketType.id,
        quantity,
        ...formData,
      };

      // Simulate booking creation
      setTimeout(() => {
        const mockBookingId = "BK" + Date.now();
        setBookingId(mockBookingId);
        setStep(3);
        setLoading(false);
      }, 2000);

      // In real app:
      // const booking = await bookingService.createBooking(bookingData);
      // if (total > 0) {
      //   const payment = await paymentService.createPaymentIntent(booking.id);
      //   // Process payment with Stripe
      // }
      // setBookingId(booking.id);
      // setStep(3);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to process booking. Please try again.");
      setLoading(false);
    }
  };

  const handleViewTicket = () => {
    navigate("/student/bookings");
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-2xl">
          <Card className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
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

            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your booking has been successfully confirmed. A confirmation email
              has been sent to {formData.email}.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">
                Booking Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-semibold">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-semibold">{ticketType.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-gray-900 font-semibold">
                    Total Paid:
                  </span>
                  <span className="text-primary-600 font-bold text-lg">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate("/events")}
              >
                Browse More Events
              </Button>
              <Button variant="primary" fullWidth onClick={handleViewTicket}>
                View My Tickets
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-20 h-1 ${
                  step >= 2 ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div
                className={`w-20 h-1 ${
                  step >= 3 ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-16 text-sm">
              <span
                className={
                  step >= 1 ? "text-primary-600 font-semibold" : "text-gray-500"
                }
              >
                Details
              </span>
              <span
                className={
                  step >= 2 ? "text-primary-600 font-semibold" : "text-gray-500"
                }
              >
                Payment
              </span>
              <span
                className={
                  step >= 3 ? "text-primary-600 font-semibold" : "text-gray-500"
                }
              >
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Your Details
                </h2>
                <form onSubmit={handleDetailsSubmit}>
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@university.lk"
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+94 77 123 4567"
                  />

                  <Input
                    label="Student ID"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 20XX/CS/XXX"
                  />

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="3"
                      className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Any special requirements or dietary restrictions..."
                    />
                  </div>

                  <Button type="submit" fullWidth>
                    Continue to Payment
                  </Button>
                </form>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Payment Method
                </h2>
                <form onSubmit={handlePayment}>
                  {total > 0 ? (
                    <>
                      <div className="space-y-3 mb-6">
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <span className="ml-3 font-medium">
                            Credit/Debit Card
                          </span>
                        </label>

                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === "bank"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <span className="ml-3 font-medium">
                            Bank Transfer
                          </span>
                        </label>
                      </div>

                      {paymentMethod === "card" && (
                        <div>
                          <Input
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Expiry Date"
                              placeholder="MM/YY"
                              required
                            />
                            <Input label="CVV" placeholder="123" required />
                          </div>
                          <Input
                            label="Cardholder Name"
                            placeholder="Name on card"
                            required
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-success bg-opacity-10 border border-success rounded-lg p-4 mb-6">
                      <p className="text-success font-semibold">
                        This is a free event. No payment required.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      loading={loading}
                      disabled={loading}
                    >
                      {total > 0 ? "Complete Payment" : "Confirm Booking"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

              <div className="mb-4">
                <img
                  src={event.imageUrl || "https://via.placeholder.com/300x150"}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  {formatDate(event.date, "long")}
                </p>
                <p className="text-sm text-gray-600">{event.venue}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Ticket Type</span>
                  <span className="font-semibold">{ticketType.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per ticket</span>
                  <span className="font-semibold">
                    {formatCurrency(ticketType.price)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
                {total > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">
                      {formatCurrency(serviceFee)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
