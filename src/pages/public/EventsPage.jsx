import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { eventService } from "../../services/apiService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatDate, formatCurrency, truncateText } from "../../utils/helpers";
import {
  EVENT_CATEGORIES,
  FACULTIES,
  PRICE_RANGES,
  SORT_OPTIONS,
} from "../../utils/constants";

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    faculty: searchParams.get("faculty") || "",
    priceRange: searchParams.get("price") || "",
    sort: searchParams.get("sort") || "date_asc",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // In a real app, this would filter on the backend
      const data = await eventService.getAllEvents({ status: "APPROVED" });
      let filteredEvents = data;

      // Apply search filter
      if (filters.search) {
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            event.description
              ?.toLowerCase()
              .includes(filters.search.toLowerCase())
        );
      }

      // Apply category filter
      if (filters.category) {
        filteredEvents = filteredEvents.filter(
          (event) => event.category === filters.category
        );
      }

      // Apply faculty filter
      if (filters.faculty) {
        filteredEvents = filteredEvents.filter(
          (event) => event.faculty === filters.faculty
        );
      }

      // Apply price filter
      if (filters.priceRange) {
        if (filters.priceRange === "free") {
          filteredEvents = filteredEvents.filter(
            (event) => event.minPrice === 0
          );
        } else {
          const [min, max] = filters.priceRange
            .split("-")
            .map((v) => v.replace("+", ""));
          filteredEvents = filteredEvents.filter((event) => {
            if (max) {
              return (
                event.minPrice >= parseInt(min) &&
                event.minPrice <= parseInt(max)
              );
            } else {
              return event.minPrice >= parseInt(min);
            }
          });
        }
      }

      // Apply sorting
      switch (filters.sort) {
        case "date_asc":
          filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "date_desc":
          filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "price_asc":
          filteredEvents.sort((a, b) => a.minPrice - b.minPrice);
          break;
        case "price_desc":
          filteredEvents.sort((a, b) => b.minPrice - a.minPrice);
          break;
        case "name":
          filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      // For demo purposes, use mock data
      setEvents(generateMockEvents());
    } finally {
      setLoading(false);
    }
  };

  const generateMockEvents = () => {
    return [
      {
        id: 1,
        title: "Tech Innovation Summit 2025",
        description:
          "Join us for the biggest tech event of the year featuring industry leaders and innovative startups.",
        date: "2025-12-15T09:00:00",
        venue: "Main Auditorium, Computing Faculty",
        category: "conference",
        faculty: "computing",
        minPrice: 0,
        maxPrice: 0,
        availableSeats: 250,
        totalSeats: 300,
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
        organizer: "IEEE Student Branch",
      },
      {
        id: 2,
        title: "Annual Cultural Festival",
        description:
          "Experience the vibrant culture of Sri Lanka through music, dance, and art performances.",
        date: "2025-12-20T18:00:00",
        venue: "University Grounds",
        category: "cultural",
        faculty: "all",
        minPrice: 500,
        maxPrice: 1500,
        availableSeats: 450,
        totalSeats: 500,
        imageUrl:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
        organizer: "Arts Society",
      },
      {
        id: 3,
        title: "Hackathon 2025: Build the Future",
        description:
          "24-hour coding marathon with exciting prizes and mentorship from industry experts.",
        date: "2025-12-10T08:00:00",
        venue: "Computer Lab Complex",
        category: "hackathon",
        faculty: "computing",
        minPrice: 1000,
        maxPrice: 1000,
        availableSeats: 80,
        totalSeats: 100,
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
        organizer: "Computing Society",
      },
      {
        id: 4,
        title: "Business Leadership Workshop",
        description:
          "Learn essential leadership skills from successful entrepreneurs and business leaders.",
        date: "2025-12-18T14:00:00",
        venue: "Business Faculty Seminar Hall",
        category: "workshop",
        faculty: "business",
        minPrice: 500,
        maxPrice: 1000,
        availableSeats: 120,
        totalSeats: 150,
        imageUrl:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
        organizer: "Business Club",
      },
      {
        id: 5,
        title: "Inter-University Sports Meet",
        description:
          "Compete in various sports events including cricket, football, and athletics.",
        date: "2025-12-22T07:00:00",
        venue: "University Sports Complex",
        category: "sports",
        faculty: "all",
        minPrice: 0,
        maxPrice: 0,
        availableSeats: 1000,
        totalSeats: 1000,
        imageUrl:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
        organizer: "Sports Council",
      },
      {
        id: 6,
        title: "Charity Fundraiser Concert",
        description:
          "Support local communities through this amazing concert featuring popular local artists.",
        date: "2025-12-25T19:00:00",
        venue: "Main Hall",
        category: "charity",
        faculty: "all",
        minPrice: 1500,
        maxPrice: 3000,
        availableSeats: 200,
        totalSeats: 300,
        imageUrl:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
        organizer: "Rotaract Club",
      },
    ];
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      faculty: "",
      priceRange: "",
      sort: "date_asc",
    });
    setSearchParams({});
  };

  const activeFiltersCount = [
    filters.category,
    filters.faculty,
    filters.priceRange,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
            Discover Events
          </h1>
          <p className="text-gray-600">
            Find and book tickets for exciting university events
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for events..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              }
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Faculty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faculty
                </label>
                <select
                  value={filters.faculty}
                  onChange={(e) =>
                    handleFilterChange("faculty", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Faculties</option>
                  {FACULTIES.map((fac) => (
                    <option key={fac.value} value={fac.value}>
                      {fac.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Prices</option>
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {loading
            ? "Loading..."
            : `${events.length} event${events.length !== 1 ? "s" : ""} found`}
        </div>

        {/* Events Grid */}
        {loading ? (
          <Loader />
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                hover
                className="overflow-hidden p-0 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={
                      event.imageUrl || "https://via.placeholder.com/400x200"
                    }
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  {event.availableSeats < 50 && event.availableSeats > 0 && (
                    <div className="absolute top-3 right-3 bg-warning text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Only {event.availableSeats} seats left!
                    </div>
                  )}
                  {event.availableSeats === 0 && (
                    <div className="absolute top-3 right-3 bg-error text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Sold Out
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {EVENT_CATEGORIES.find((c) => c.value === event.category)
                        ?.label || event.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(event.date, "short")}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {truncateText(event.description, 100)}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {event.organizer}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        {event.minPrice === 0
                          ? "Free"
                          : formatCurrency(event.minPrice)}
                      </span>
                      {event.minPrice !== event.maxPrice &&
                        event.maxPrice > 0 && (
                          <span className="text-sm text-gray-500 ml-1">
                            - {formatCurrency(event.maxPrice)}
                          </span>
                        )}
                    </div>
                    <Link to={`/events/${event.id}`}>
                      <Button size="sm" disabled={event.availableSeats === 0}>
                        {event.availableSeats === 0
                          ? "Sold Out"
                          : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
