// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import LoadingSpinner from "../Shared/LoadingSpinner";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import TicketCard from "../TicketCard/TicketCard";

// const LatestTickets = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: tickets = [], isLoading } = useQuery({
//     queryKey: ["latest-tickets"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/tickets/latest");
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;

//   return (
//     <section className="py-6 my-10">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-4">
//             Latest Tickets
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Recently added tickets for your next adventure
//           </p>
//         </div>
//       </div>

//       {tickets.length === 0 ? (
//         <p className="text-center text-gray-500">No tickets available yet</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {tickets.slice(0, 8).map((ticket) => (
//             <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default LatestTickets;


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
    <section className="py-16 my-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-0">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            New Arrivals
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
              Latest Tickets
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Discover the newest tickets and embark on your next unforgettable adventure
          </p>
        </div>

        {/* Tickets Grid */}
        {tickets.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Available</h3>
            <p className="text-gray-500">Check back soon for new tickets!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {tickets.slice(0, 8).map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        )}

        {/* View All Button */}
        {tickets.length > 0 && (
          <div className="text-center mt-12">
            <button className="group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Tickets
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;