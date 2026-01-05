
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import TicketCard from "../../components/TicketCard/TicketCard";
import { 
  Search, 
  MapPin, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Grid3x3,
  List,
  Calendar,
  DollarSign,
  Bus,
  Train,
  Plane,
  Ship
} from "lucide-react";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const itemsPerPage = 9;

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tickets/all");
      return data;
    },
  });

  // Calculate price range from tickets
  useEffect(() => {
    if (tickets.length > 0) {
      const prices = tickets.map(t => t.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange({ min, max });
    }
  }, [tickets]);

  let filteredTickets = tickets;

  // Apply filters
  if (searchFrom) {
    filteredTickets = filteredTickets.filter((ticket) =>
      (ticket.from || "").toLowerCase().includes(searchFrom.toLowerCase())
    );
  }

  if (searchTo) {
    filteredTickets = filteredTickets.filter((ticket) =>
      (ticket.to || "").toLowerCase().includes(searchTo.toLowerCase())
    );
  }

  if (transportFilter !== "all") {
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.transportType === transportFilter
    );
  }

  // Apply sorting
  if (priceSort === "low-to-high") {
    filteredTickets = [...filteredTickets].sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-to-low") {
    filteredTickets = [...filteredTickets].sort((a, b) => b.price - a.price);
  }

  const totalPage = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchFrom, searchTo, transportFilter, priceSort]);

  const clearFilters = () => {
    setSearchFrom("");
    setSearchTo("");
    setTransportFilter("all");
    setPriceSort("none");
    setCurrentPage(0);
  };

  const activeFiltersCount = [
    searchFrom,
    searchTo,
    transportFilter !== "all",
    priceSort !== "none"
  ].filter(Boolean).length;

  const transportTypes = [
    { value: "all", label: "All", icon: Filter },
    { value: "Bus", label: "Bus", icon: Bus },
    { value: "Train", label: "Train", icon: Train },
    { value: "Flight", label: "Flight", icon: Plane },
    { value: "Ferry", label: "Ferry", icon: Ship },
  ];

  // Pagination helper
  const getPaginationRange = () => {
    const range = [];
    const delta = 2;
    
    for (let i = 0; i < totalPage; i++) {
      if (
        i === 0 ||
        i === totalPage - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    
    return range;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Explore Available Tickets
          </h1>
          <p className="text-gray-600 text-lg">
            Browse through {tickets.length} destinations
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Search & Filter
              </h2>
              {activeFiltersCount > 0 && (
                <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              {showFilters ? <X size={24} /> : <Filter size={24} />}
            </button>
          </div>

          {(showFilters || window.innerWidth >= 768) && (
            <div className="space-y-6">
              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Origin city..."
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                    {searchFrom && (
                      <button
                        onClick={() => setSearchFrom("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Destination city..."
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                    {searchTo && (
                      <button
                        onClick={() => setSearchTo("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Transport Type Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Transport Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {transportTypes.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTransportFilter(value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                        transportFilter === value
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by Price
                  </label>
                  <select
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-gray-900 cursor-pointer transition-all"
                  >
                    <option value="none">Default Order</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-end">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <X size={18} />
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredTickets.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{tickets.length}</span> tickets
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Grid/List */}
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {tickets.length === 0 ? "No Tickets Available" : "No Matches Found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {tickets.length === 0
                  ? "There are no tickets available at the moment. Please check back later."
                  : "We couldn't find any tickets matching your search criteria. Try adjusting your filters."}
              </p>
              {tickets.length > 0 && activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {currentTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <TicketCard ticket={ticket} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-medium hover:border-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                {getPaginationRange().map((page, index) => (
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600"
                      }`}
                    >
                      {page + 1}
                    </button>
                  )
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPage - 1}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-medium hover:border-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllTickets;