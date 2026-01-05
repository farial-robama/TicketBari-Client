import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  MapPin,
  Calendar,
  Clock,
  Ticket,
  Users,
  ArrowRight,
  ChevronLeft,
  Star,
  Shield,
  Award,
  AlertCircle,
  Check,
  X,
  Plus,
  Minus,
  Bus,
  Train,
  Plane,
  Ship,
  User,
  Mail,
  Timer,
  Sparkles
} from "lucide-react";

const TicketsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");
  const queryClient = useQueryClient();

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tickets/${id}`);
      return data;
    },
  });

  const { data: role } = useQuery({
    queryKey: ["user-role"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/role");
      return data.role;
    },
  });

  // Countdown timer
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const now = new Date();
      const depart = new Date(ticket.departure);
      const diff = depart - now;

      if (diff <= 0) {
        setCountdown("Departure Passed");
        return clearInterval(interval);
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      } else {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [ticket]);

  const handleBooking = async () => {
    if (quantity > ticket.quantity) {
      toast.error("Quantity exceeds available tickets!");
      return;
    }
    if (quantity < 1) {
      toast.error("Please select at least 1 ticket!");
      return;
    }
    
    try {
      const booking = {
        ticketId: ticket._id,
        quantity,
        totalPrice: ticket.price * quantity,
        status: "Pending",
      };
      
      await axiosSecure.post("/bookings", booking);
      queryClient.invalidateQueries({ queryKey: ["ticket-details", id] });
      toast.success(`Successfully booked ${quantity} ticket(s)! 🎉`);
      setShowModal(false);
      setQuantity(1);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to book ticket. Please try again.");
    }
  };

  // Transport icon mapping
  const getTransportIcon = (type) => {
    const icons = {
      Bus: Bus,
      Train: Train,
      Flight: Plane,
      Ferry: Ship,
    };
    return icons[type] || Bus;
  };

  if (isLoading) return <LoadingSpinner />;

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">The ticket you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/tickets")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            Browse All Tickets
          </button>
        </div>
      </div>
    );
  }

  const isDeparturePassed = new Date(ticket.departure) < new Date();
  const isOutOfStock = ticket.quantity === 0;
  const isUser = role === "customer";
  const isAvailable = !isDeparturePassed && !isOutOfStock && isUser;
  const TransportIcon = getTransportIcon(ticket.transportType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Tickets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-80 md:h-96">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <TransportIcon size={20} className="text-purple-600" />
                    <span className="font-semibold text-gray-800">{ticket.transportType}</span>
                  </div>
                  
                  {ticket.quantity < 10 && ticket.quantity > 0 && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg font-bold animate-pulse">
                      Only {ticket.quantity} left!
                    </div>
                  )}
                </div>

                {/* Countdown Timer */}
                {!isDeparturePassed && (
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Timer size={20} />
                      <div>
                        <p className="text-xs opacity-90">Departs in</p>
                        <p className="text-lg font-bold">{countdown}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title and Route */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{ticket.title}</h1>
                
                {/* Route Display */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin size={20} className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">From</p>
                      <p className="font-semibold text-gray-800">{ticket.from}</p>
                    </div>
                  </div>
                  
                  <ArrowRight size={24} className="text-gray-400" />
                  
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">To</p>
                      <p className="font-semibold text-gray-800">{ticket.to}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award size={24} className="text-purple-600" />
                Trip Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Departure Date */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Departure Date</p>
                    <p className="text-lg font-semibold text-gray-800">{ticket.departureDate}</p>
                  </div>
                </div>

                {/* Departure Time */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Departure Time</p>
                    <p className="text-lg font-semibold text-gray-800">{ticket.departureTime}</p>
                  </div>
                </div>

                {/* Available Tickets */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Ticket size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Available Seats</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {ticket.quantity} {ticket.quantity === 1 ? "seat" : "seats"}
                    </p>
                  </div>
                </div>

                {/* Price Per Ticket */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Sparkles size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Price per Ticket</p>
                    <p className="text-2xl font-bold text-purple-600">৳{ticket.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks Section */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star size={24} className="text-yellow-500 fill-yellow-500" />
                  Included Perks
                </h2>
                <div className="flex flex-wrap gap-3">
                  {ticket.perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                      <Check size={16} />
                      <span className="font-medium">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-4xl font-bold text-gray-800">৳{ticket.price}</p>
                <p className="text-sm text-gray-600 mt-1">per person</p>
              </div>

              {/* Status Messages */}
              {isDeparturePassed && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Departure Passed</p>
                    <p className="text-sm text-red-600">This trip has already departed.</p>
                  </div>
                </div>
              )}

              {isOutOfStock && !isDeparturePassed && (
                <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-800">Sold Out</p>
                    <p className="text-sm text-orange-600">All tickets have been sold.</p>
                  </div>
                </div>
              )}

              {!isUser && !isDeparturePassed && !isOutOfStock && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                  <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-800">Customer Access Only</p>
                    <p className="text-sm text-blue-600">Only customers can book tickets.</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  disabled={!isAvailable}
                  onClick={() => setShowModal(true)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    isAvailable
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:scale-105"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <Ticket size={20} />
                  {isDeparturePassed
                    ? "Departure Passed"
                    : isOutOfStock
                    ? "Sold Out"
                    : !isUser
                    ? "Login as Customer"
                    : "Book Now"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={18} className="text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check size={18} className="text-green-600" />
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Award size={18} className="text-green-600" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>

            {/* Vendor Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-purple-600" />
                Vendor Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <User size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vendor Name</p>
                    <p className="font-semibold text-gray-800">{ticket.vendorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Email</p>
                    <p className="font-semibold text-gray-800 text-sm">{ticket.vendorEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Ticket size={28} className="text-purple-600" />
                Book Tickets
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number of Tickets
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <Minus size={20} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={ticket.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(ticket.quantity, Number(e.target.value))))}
                  className="flex-1 text-center text-2xl font-bold py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={() => setQuantity(Math.min(ticket.quantity, quantity + 1))}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Maximum: {ticket.quantity} tickets available
              </p>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl mb-6 border border-purple-100">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Price per ticket</span>
                  <span className="font-semibold">৳{ticket.price}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Quantity</span>
                  <span className="font-semibold">× {quantity}</span>
                </div>
                <div className="h-px bg-purple-200"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ৳{(ticket.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsDetails;