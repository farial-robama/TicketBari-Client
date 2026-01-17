import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Ticket,
  TrendingUp,
  MapPin,
  Building2,
  Star,
  Shield,
  Clock,
} from "lucide-react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    tickets: 0,
    vendors: 0,
    cities: 0,
    satisfaction: 0,
    partners: 0,
  });
  const sectionRef = useRef(null);

  // Statistics data
  const stats = [
    {
      id: "users",
      icon: <Users size={32} />,
      target: 10000,
      suffix: "+",
      label: "Happy Customers",
      description: "Trusted by travelers nationwide",
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "tickets",
      icon: <Ticket size={32} />,
      target: 50000,
      suffix: "+",
      label: "Tickets Booked",
      description: "Successfully completed journeys",
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "vendors",
      icon: <Building2 size={32} />,
      target: 500,
      suffix: "+",
      label: "Transport Partners",
      description: "Verified service providers",
      color: "bg-green-100 text-green-600",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "cities",
      icon: <MapPin size={32} />,
      target: 64,
      suffix: "",
      label: "Cities Covered",
      description: "Nationwide connectivity",
      color: "bg-red-100 text-red-600",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "satisfaction",
      icon: <Star size={32} />,
      target: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Based on customer reviews",
      color: "bg-yellow-100 text-yellow-600",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: "partners",
      icon: <Shield size={32} />,
      target: 150,
      suffix: "+",
      label: "Premium Routes",
      description: "High-quality travel options",
      color: "bg-indigo-100 text-indigo-600",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  // Format number with K suffix
  const formatNumber = (num, target) => {
    if (target >= 10000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (target >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animated counter effect
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newCounters = {};
      stats.forEach((stat) => {
        newCounters[stat.id] = Math.floor(stat.target * progress);
      });

      setCounters(newCounters);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Set final values
        const finalCounters = {};
        stats.forEach((stat) => {
          finalCounters[stat.id] = stat.target;
        });
        setCounters(finalCounters);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <TrendingUp className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Join the growing community of satisfied travelers who trust TicketBari for their journey
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isVisible ? "fadeInUp 0.6s ease-out forwards" : "none",
              }}
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${stat.gradient} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl">
                    {React.cloneElement(stat.icon, { className: "text-white" })}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl md:text-5xl font-bold text-white">
                      {formatNumber(counters[stat.id], stat.target)}
                      {stat.suffix}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
              <Shield size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">100% Secure</h4>
            <p className="text-sm text-gray-600">
              Protected payments with industry-standard encryption
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
              <Clock size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Instant Booking</h4>
            <p className="text-sm text-gray-600">
              Get confirmed tickets in less than 2 minutes
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
              <Star size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Top Rated</h4>
            <p className="text-sm text-gray-600">
              Rated #1 travel booking platform in Bangladesh
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <span className="text-lg">Become part of our success story</span>
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Statistics;