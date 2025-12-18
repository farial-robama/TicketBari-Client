import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import TicketCard from "../../components/TicketCard/TicketCard";
import { useEffect } from "react";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tickets/all");
      return data;
    },
  });

  let filteredTickets = tickets;

  if (searchFrom !== "") {
    filteredTickets = filteredTickets.filter((ticket) => {
      const from = ticket.from || "";
      return from.toLowerCase().includes(searchFrom.toLowerCase());
    });
  }

  if (searchTo !== "") {
    filteredTickets = filteredTickets.filter((ticket) => {
      const to = ticket.to || "";
      return to.toLowerCase().includes(searchTo.toLowerCase());
    });
  }

  if (transportFilter !== "all") {
    filteredTickets = filteredTickets.filter((ticket) => {
      return ticket.transportType === transportFilter;
    });
  }

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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center my-15">
          <h1 className="text-4xl font-bold text-gray-800 my-6">
            All Available Tickets
          </h1>
          <p className="text-gray-600 text-lg">
            Browse through {tickets.length} available tickets
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col gap-7">
            <div className="flex justify-around gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Location
                </label>
                <input
                  type="text"
                  placeholder="Search origin..."
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Location
                </label>
                <input
                  type="text"
                  placeholder="Search destination..."
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex  justify-around gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type
                </label>
                <select
                  value={transportFilter}
                  onChange={(e) => setTransportFilter(e.target.value)}
                  className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Ferry">Ferry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by Price
                </label>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 text-sm"
                >
                  <option value="none">Default</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {(searchFrom ||
            searchTo ||
            transportFilter !== "all" ||
            priceSort !== "none") && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-sm mt-5"
              >
                Clear All Filters
              </button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-center text-gray-500">
              {tickets.length === 0
                ? "No tickets available at the moment"
                : "No tickets match your filters"}
            </p>

            {tickets.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-white  rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        )}
      </div>

      {totalPage > 1 && (
        <div className="flex justify-around flex-wrap gap-3 py-10">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn"
            >
              Prev
            </button>
          )}

          {[...Array(totalPage).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`btn ${i === currentPage && "btn-primary"}`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
