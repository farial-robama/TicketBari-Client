
import React from "react";
import { Link } from "react-router";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp,
  Bus,
  Train,
  Plane,
  Ship,
  ArrowRight,
  Eye,
  Star,
  Tag
} from "lucide-react";

const TicketCard = ({ ticket }) => {
  // Transport type icon mapping
  const getTransportIcon = (type) => {
    const icons = {
      Bus: Bus,
      Train: Train,
      Flight: Plane,
      Ferry: Ship,
    };
    const Icon = icons[type] || Bus;
    return <Icon size={20} />;
  };

  // Transport type color mapping
  const getTransportColor = (type) => {
    const colors = {
      Bus: "bg-blue-100 text-blue-700",
      Train: "bg-green-100 text-green-700",
      Flight: "bg-purple-100 text-purple-700",
      Ferry: "bg-cyan-100 text-cyan-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={ticket.image} 
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Transport Type Badge */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full ${getTransportColor(ticket.transportType)} backdrop-blur-sm font-medium text-sm shadow-lg`}>
          {getTransportIcon(ticket.transportType)}
          <span>{ticket.transportType}</span>
        </div>

        {/* Quick View Button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <Eye size={18} className="text-gray-700" />
          </button>
        </div>

        {/* Price Tag on Image */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
          <div className="text-xs text-gray-600 font-medium">From</div>
          <div className="text-2xl font-bold text-gray-900">
            ৳{ticket.price}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {ticket.title}
        </h3>

        {/* Route Information */}
        {ticket.from && ticket.to && (
          <div className="flex items-center gap-2 mb-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin size={16} className="text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate">
                {ticket.from}
              </span>
            </div>
            <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <MapPin size={16} className="text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate">
                {ticket.to}
              </span>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Available Seats */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
            <div className="p-1.5 bg-white rounded-lg">
              <Users size={16} className="text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Available</div>
              <div className="text-sm font-semibold text-gray-900">
                {ticket.quantity} seats
              </div>
            </div>
          </div>

          {/* Departure Time */}
          {ticket.departureTime && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
              <div className="p-1.5 bg-white rounded-lg">
                <Clock size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Departure</div>
                <div className="text-sm font-semibold text-gray-900">
                  {ticket.departureTime}
                </div>
              </div>
            </div>
          )}

          {/* Date */}
          {ticket.date && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 col-span-2">
              <div className="p-1.5 bg-white rounded-lg">
                <Calendar size={16} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Travel Date</div>
                <div className="text-sm font-semibold text-gray-900">
                  {new Date(ticket.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Perks/Features */}
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {ticket.perks.slice(0, 3).map((perk, i) => (
                <div key={i} className="flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  <Star size={12} fill="currentColor" />
                  <span>{perk}</span>
                </div>
              ))}
              {ticket.perks.length > 3 && (
                <div className="flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  +{ticket.perks.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/ticket/${ticket._id}`}
          className="group/btn relative w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="relative z-10">View Details</span>
          <ArrowRight 
            size={18} 
            className="relative z-10 group-hover/btn:translate-x-1 transition-transform" 
          />
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>

      {/* Status Indicator */}
      {ticket.quantity < 5 && ticket.quantity > 0 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            Only {ticket.quantity} left!
          </div>
        </div>
      )}

      {ticket.quantity === 0 && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-6 py-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">Sold Out</div>
            <div className="text-sm text-gray-600">Check back later</div>
          </div>
        </div>
      )}

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default TicketCard;