import React from "react";
import {
  Search,
  Ticket,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  Clock,
  AlertCircle,
  Bus,
  Train,
  Plane,
  Ship,
} from "lucide-react";

const BookingGuide = () => {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Search Your Trip",
      description:
        "Choose your route, travel date, and preferred transport type to find available tickets.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Ticket size={28} />,
      title: "Select Ticket & Seat",
      description:
        "Review ticket details, choose seat availability, and confirm your booking information.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <CreditCard size={28} />,
      title: "Make Secure Payment",
      description:
        "Pay securely using supported payment methods with full transaction protection.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Get Confirmation",
      description:
        "Receive instant booking confirmation and manage your ticket from your dashboard.",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Ticket className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Booking <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Guide</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Book your journey with TicketBari in just a few simple, secure, and reliable steps.
          </p>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 ${step.color} rounded-lg mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Types */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Supported Transport Types
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            TicketBari supports multiple transport options to make your journey flexible and convenient.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Bus size={32} />, label: "Bus", color: "bg-blue-100 text-blue-600" },
              { icon: <Train size={32} />, label: "Train", color: "bg-purple-100 text-purple-600" },
              { icon: <Plane size={32} />, label: "Flight", color: "bg-green-100 text-green-600" },
              { icon: <Ship size={32} />, label: "Launch", color: "bg-orange-100 text-orange-600" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 ${item.color} rounded-lg mb-4`}
                >
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  {item.label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Important Booking Notes
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <span>Ensure travel date and time are correct before payment.</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-blue-500 mt-0.5" size={20} />
              <span>Bookings for past trips are not allowed.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="text-green-500 mt-0.5" size={20} />
              <span>All payments are secured and encrypted.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-emerald-500 mt-0.5" size={20} />
              <span>Confirmed tickets appear instantly in your dashboard.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help With Booking?
          </h2>
          <p className="text-white/90 mb-8">
            Our support team is always ready to assist you with booking, payment, or ticket issues.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <span className="px-6 py-3 bg-white/10 rounded-full text-sm">
              24/7 Support
            </span>
            <span className="px-6 py-3 bg-white/10 rounded-full text-sm">
              Secure Payments
            </span>
            <span className="px-6 py-3 bg-white/10 rounded-full text-sm">
              Instant Confirmation
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingGuide;
