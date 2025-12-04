import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  validateEmail,
  validateRequired,
  validateNumber,
} from "../../utils/helpers";
import { EVENT_CATEGORIES, FACULTIES } from "../../utils/constants";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: "",
    description: "",
    category: "",
    faculty: "",
    imageUrl: "",

    // Step 2: Event Details
    date: "",
    time: "",
    venue: "",
    capacity: "",

    // Step 3: Ticket Configuration
    ticketTypes: [
      { name: "General", price: "", capacity: "", description: "" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[index][field] = value;
    setFormData((prev) => ({ ...prev, ticketTypes: updatedTickets }));
  };

  const addTicketType = () => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        { name: "", price: "", capacity: "", description: "" },
      ],
    }));
  };

  const removeTicketType = (index) => {
    if (formData.ticketTypes.length > 1) {
      const updatedTickets = formData.ticketTypes.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, ticketTypes: updatedTickets }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!validateRequired(formData.title)) {
      newErrors.title = "Event title is required";
    }
    if (!validateRequired(formData.description)) {
      newErrors.description = "Description is required";
    }
    if (!validateRequired(formData.category)) {
      newErrors.category = "Category is required";
    }
    if (!validateRequired(formData.faculty)) {
      newErrors.faculty = "Faculty is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!validateRequired(formData.date)) {
      newErrors.date = "Date is required";
    }
    if (!validateRequired(formData.time)) {
      newErrors.time = "Time is required";
    }
    if (!validateRequired(formData.venue)) {
      newErrors.venue = "Venue is required";
    }
    if (!validateNumber(formData.capacity) || formData.capacity <= 0) {
      newErrors.capacity = "Valid capacity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    formData.ticketTypes.forEach((ticket, index) => {
      if (!validateRequired(ticket.name)) {
        newErrors[`ticket_${index}_name`] = "Ticket name is required";
      }
      if (!validateNumber(ticket.price) || ticket.price < 0) {
        newErrors[`ticket_${index}_price`] = "Valid price is required";
      }
      if (!validateNumber(ticket.capacity) || ticket.capacity <= 0) {
        newErrors[`ticket_${index}_capacity`] = "Valid capacity is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) {
      return;
    }

    setLoading(true);
    try {
      // Combine date and time
      const eventDateTime = `${formData.date}T${formData.time}:00`;

      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        faculty: formData.faculty,
        imageUrl:
          formData.imageUrl ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        date: eventDateTime,
        venue: formData.venue,
        capacity: parseInt(formData.capacity),
        ticketTypes: formData.ticketTypes.map((t) => ({
          name: t.name,
          price: parseFloat(t.price),
          availableSeats: parseInt(t.capacity),
          description: t.description,
        })),
        status: "PENDING",
      };

      await eventService.createEvent(eventData);

      // Simulate success
      setTimeout(() => {
        alert("Event created successfully! It is now pending admin approval.");
        navigate("/organizer/events");
      }, 1000);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", description: "Event details" },
    { number: 2, title: "Details", description: "Date & venue" },
    { number: 3, title: "Tickets", description: "Configure tickets" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600">
            Fill in the details to create your event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.number
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <svg
                        className="w-6 h-6"
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
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.number
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6 md:p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Basic Information
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Provide the basic details about your event
                  </p>
                </div>

                <Input
                  label="Event Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={errors.title}
                  placeholder="e.g., Tech Innovation Summit 2025"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your event in detail..."
                  />
                  {errors.description && (
                    <p className="text-danger text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {EVENT_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-danger text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty *
                    </label>
                    <select
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select faculty</option>
                      {FACULTIES.map((fac) => (
                        <option key={fac.value} value={fac.value}>
                          {fac.label}
                        </option>
                      ))}
                    </select>
                    {errors.faculty && (
                      <p className="text-danger text-sm mt-1">
                        {errors.faculty}
                      </p>
                    )}
                  </div>
                </div>

                <Input
                  label="Event Image URL (optional)"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  helpText="Leave empty for default image"
                />
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Event Details
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Specify when and where your event will take place
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="date"
                    label="Event Date *"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    error={errors.date}
                  />

                  <Input
                    type="time"
                    label="Event Time *"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    error={errors.time}
                  />
                </div>

                <Input
                  label="Venue *"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  error={errors.venue}
                  placeholder="e.g., Main Auditorium, University of Colombo"
                />

                <Input
                  type="number"
                  label="Total Capacity *"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  error={errors.capacity}
                  placeholder="e.g., 100"
                  helpText="Maximum number of attendees"
                />
              </div>
            )}

            {/* Step 3: Ticket Configuration */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Ticket Configuration
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Set up different ticket types and pricing
                  </p>
                </div>

                {formData.ticketTypes.map((ticket, index) => (
                  <Card key={index} className="p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Ticket Type {index + 1}
                      </h3>
                      {formData.ticketTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicketType(index)}
                          className="text-danger hover:text-danger-dark"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Ticket Name *"
                        value={ticket.name}
                        onChange={(e) =>
                          handleTicketChange(index, "name", e.target.value)
                        }
                        error={errors[`ticket_${index}_name`]}
                        placeholder="e.g., General Admission, VIP"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="number"
                          label="Price (Rs.) *"
                          value={ticket.price}
                          onChange={(e) =>
                            handleTicketChange(index, "price", e.target.value)
                          }
                          error={errors[`ticket_${index}_price`]}
                          placeholder="e.g., 1500"
                          helpText="Enter 0 for free tickets"
                        />

                        <Input
                          type="number"
                          label="Available Seats *"
                          value={ticket.capacity}
                          onChange={(e) =>
                            handleTicketChange(
                              index,
                              "capacity",
                              e.target.value
                            )
                          }
                          error={errors[`ticket_${index}_capacity`]}
                          placeholder="e.g., 50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={ticket.description}
                          onChange={(e) =>
                            handleTicketChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Describe what's included with this ticket..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addTicketType}
                  fullWidth
                >
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
                  Add Another Ticket Type
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext} className="flex-1">
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
