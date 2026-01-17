import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Ticket,
  Calendar,
  MapPin,
  Search,
  Bus,
  Train,
  Plane,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Grid3x3,
  List,
  TrendingUp
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState("grid");

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/bookings");
      return data;
    },
  });

  // Filter and sort bookings
  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.bookingReference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((b) => b.bookingStatus === filterStatus);
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((b) => b.ticketType === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.departureDate) - new Date(a.departureDate);
        case "date-asc":
          return new Date(a.departureDate) - new Date(b.departureDate);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bookings, searchTerm, filterStatus, filterType, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const total = bookings.length;
    const confirmed = bookings.filter((b) => 
      b.bookingStatus === "confirmed" || b.status === "paid"
    ).length;
    const pending = bookings.filter((b) => 
      b.bookingStatus === "pending" && b.status !== "paid"
    ).length;
    const upcoming = bookings.filter((b) => {
      const departureDate = new Date(b.departureDate);
      departureDate.setHours(0, 0, 0, 0);
      return departureDate >= today;
    }).length;
    
    return { total, confirmed, pending, upcoming };
  }, [bookings]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "pending":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "bus":
        return <Bus className="text-blue-500" size={24} />;
      case "train":
        return <Train className="text-purple-500" size={24} />;
      case "flight":
        return <Plane className="text-indigo-500" size={24} />;
      default:
        return <Ticket className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (booking) => {
    if (booking.status === "paid") return "bg-green-100 text-green-800 border-green-200";
    switch (booking.bookingStatus) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 p-4">
        <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "Something went wrong while loading your bookings."}
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Ticket className="text-purple-600" size={36} />
            My Booked Tickets
          </h1>
          <p className="text-gray-600">Manage and track all your travel bookings</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-purple-600">{stats.total}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Ticket className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-blue-600">{stats.upcoming}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Highest Price</option>
              <option value="price-asc">Lowest Price</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg ${
                isRefetching ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw size={18} className={isRefetching ? 'animate-spin' : ''} />
              {isRefetching ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Bookings Display */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <Ticket className="text-purple-600" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" || filterType !== "all"
                ? "Try adjusting your filters"
                : "Book your first ticket to see it here!"}
            </p>
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Ticket size={20} />
              Browse Tickets
            </Link>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r from-purple-500 to-blue-500 p-4 ${viewMode === "list" ? "w-48" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      {getTypeIcon(booking.ticketType)}
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                  {viewMode === "grid" && (
                    <h3 className="text-white font-bold text-lg truncate">
                      {booking.ticketTitle}
                    </h3>
                  )}
                </div>

                {/* Card Body */}
                <div className={`p-4 flex-1 ${viewMode === "list" ? "flex items-center" : ""}`}>
                  {viewMode === "list" && (
                    <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {booking.ticketTitle}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Ref: {booking.bookingReference}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{booking.from}</p>
                          <p className="text-xs text-gray-500">{booking.departureTime}</p>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-gray-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white rounded-full p-1">
                            <MapPin size={12} />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{booking.to}</p>
                          <p className="text-xs text-gray-500">{booking.arrivalTime}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2 justify-end">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-700">
                            {new Date(booking.departureDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-end mb-2">
                          <Ticket className="text-gray-400" size={16} />
                          <span className="text-sm font-semibold text-purple-600">
                            Seat {booking.seatNumber}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          ${booking.price ? booking.price.toFixed(2) : '0.00'}
                        </div>
                      </div>
                    </div>
                  )}

                  {viewMode === "grid" && (
                    <>
                      {/* Route */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-bold text-lg text-gray-900">{booking.from}</p>
                          <p className="text-xs text-gray-500 mt-1">{booking.departureTime}</p>
                        </div>

                        <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white rounded-full p-2">
                            <MapPin size={16} />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-bold text-lg text-gray-900">{booking.to}</p>
                          <p className="text-xs text-gray-500 mt-1">{booking.arrivalTime}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="text-purple-500" size={16} />
                          <span>
                            {new Date(booking.departureDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Ticket className="text-purple-500" size={16} />
                          <span className="font-semibold">Seat {booking.seatNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <AlertCircle className="text-purple-500" size={16} />
                          <span className="text-xs">Ref: {booking.bookingReference}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Total Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${booking.price ? booking.price.toFixed(2) : '0.00'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Summary */}
        {filteredBookings.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookedTickets;