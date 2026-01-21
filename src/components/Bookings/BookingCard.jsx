import React from 'react';
import {
  Ticket,
  Calendar,
  MapPin,
  Bus,
  Train,
  Plane,
  CheckCircle,
  XCircle,
  CreditCard,
  Trash2
} from 'lucide-react';

const BookingCard = ({ booking, onPayNow, onCancel, isCancelling }) => {
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

  const isPendingPayment = booking.bookingStatus === "pending" && booking.status !== "paid";
  const isConfirmed = booking.status === "paid" || booking.bookingStatus === "confirmed";
  const isCancelled = booking.bookingStatus === "cancelled";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            {getTypeIcon(booking.ticketType)}
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking)}`}>
            {booking.status === "paid" ? "Confirmed" : booking.bookingStatus}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg truncate">
          {booking.ticketTitle}
        </h3>
        <p className="text-white/80 text-xs mt-1">Ref: {booking.bookingReference}</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
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
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-gray-100 mb-4">
          <p className="text-xs text-gray-500">Total Price</p>
          <p className="text-2xl font-bold text-green-600">
            ${booking.price ? booking.price.toFixed(2) : '0.00'}
          </p>
        </div>

        {/* Action Buttons */}
        {isPendingPayment && (
          <div className="flex gap-2">
            <button
              onClick={() => onPayNow(booking)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
            >
              <CreditCard size={18} />
              Pay Now
            </button>
            
            <button
              onClick={() => onCancel(booking._id)}
              disabled={isCancelling}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {isConfirmed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
            <span className="text-sm text-green-700 font-medium">Booking Confirmed</span>
          </div>
        )}

        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <XCircle className="text-red-600 flex-shrink-0" size={18} />
            <span className="text-sm text-red-700 font-medium">Booking Cancelled</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;