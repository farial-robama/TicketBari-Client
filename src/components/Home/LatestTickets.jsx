import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TicketCard from "../TicketCard/TicketCard";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tickets/latest");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="py-6 my-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Tickets
          </h2>
          <p className="text-gray-600 text-lg">
            Recently added tickets for your next adventure
          </p>
        </div>
      </div>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets available yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tickets.slice(0, 8).map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestTickets;
