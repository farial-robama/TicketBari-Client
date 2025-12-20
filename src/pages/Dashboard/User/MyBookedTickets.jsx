import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookingCard from "../../../components/Dashboard/BookingCard/BookingCard";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/bookings");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        My Booked Tickets
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No bookings yet</p>
          <p className="text-gray-400 mt-2">
            Book your first ticket to see it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              refetch={refetch}
            ></BookingCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;
