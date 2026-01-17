import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Shield,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Award,
  Heart,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";

const About = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [counters, setCounters] = useState({
    users: 0,
    tickets: 0,
    partners: 0,
    cities: 0,
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Animated counter effect
  useEffect(() => {
    const targets = {
      users: 10000,
      tickets: 50000,
      partners: 500,
      cities: 64,
    };

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        users: Math.floor(targets.users * progress),
        tickets: Math.floor(targets.tickets * progress),
        partners: Math.floor(targets.partners * progress),
        cities: Math.floor(targets.cities * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Industry-standard payment processing with Stripe integration for safe transactions.",
      color: "bg-blue-100 text-blue-600",
      details: "256-bit SSL encryption, PCI DSS compliance, secure tokenization",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Role System",
      description: "Customer, Vendor, and Admin roles with distinct dashboards and features.",
      color: "bg-purple-100 text-purple-600",
      details: "Role-based access control, customized experiences, permission management",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Live tracking and insights for bookings, revenue, and performance metrics.",
      color: "bg-green-100 text-green-600",
      details: "Interactive charts, revenue tracking, performance insights, export reports",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Quick and easy ticket booking process with real-time seat availability.",
      color: "bg-yellow-100 text-yellow-600",
      details: "One-click booking, real-time updates, instant confirmation, digital tickets",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Wide Coverage",
      description: "Access to Bus, Train, Launch, and Flight services across Bangladesh.",
      color: "bg-red-100 text-red-600",
      details: "64 cities covered, 500+ transport partners, multiple routes available",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Service",
      description: "Round-the-clock platform availability for your travel needs.",
      color: "bg-indigo-100 text-indigo-600",
      details: "Always accessible, instant support, automated processes, no downtime",
    },
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "To simplify travel booking and provide a seamless experience for travelers across Bangladesh.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Our Vision",
      description: "Becoming the most trusted and comprehensive travel ticket platform in the region.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Our Values",
      description: "Quality, reliability, customer satisfaction, and innovation in every service we provide.",
    },
  ];

  const faqs = [
    {
      question: "How does TicketBari ensure secure transactions?",
      answer: "We use industry-standard Stripe payment processing with 256-bit SSL encryption, PCI DSS compliance, and secure tokenization to protect all financial transactions.",
    },
    {
      question: "What types of tickets can I book?",
      answer: "You can book tickets for Bus, Train, Launch, and Flight services across 64 cities in Bangladesh through our platform.",
    },
    {
      question: "How do I become a vendor on TicketBari?",
      answer: "Simply sign up for a vendor account, submit your business details for verification, and once approved, you can start listing your tickets on our platform.",
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, TicketBari is available as a responsive web application that works seamlessly on all devices. A dedicated mobile app is in development.",
    },
  ];

  const stats = [
    { label: "Active Users", value: counters.users, suffix: "+", color: "text-purple-600" },
    { label: "Tickets Booked", value: counters.tickets, suffix: "+", color: "text-blue-600" },
    { label: "Transport Partners", value: counters.partners, suffix: "+", color: "text-green-600" },
    { label: "Cities Covered", value: counters.cities, suffix: "", color: "text-red-600" },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 animate-bounce">
            <Ticket className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TicketBari</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive MERN stack platform revolutionizing the way travelers book transportation tickets across Bangladesh.
          </p>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {formatNumber(stat.value)}{stat.suffix}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Demo Section */}
      {/* <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  See TicketBari in Action
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Discover how our platform makes travel booking simple, fast, and secure for everyone.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Easy 3-step booking process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Real-time seat availability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Instant digital ticket confirmation</span>
                  </li>
                </ul>
              </div>
              <div className="relative bg-gradient-to-br from-purple-700 to-blue-700 flex items-center justify-center p-8">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="group relative"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Play className="text-purple-600 ml-1" size={40} fill="currentColor" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-white rounded-full animate-ping opacity-20"></div>
                </button>
                {isVideoPlaying && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <p className="text-white text-lg">Demo Video Player</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Platform Highlights Section */}
<section className="py-16 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2">
        
        {/* Left Content */}
        <div className="p-8 md:p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Designed for a Better Travel Experience
          </h2>
          <p className="text-lg text-white/90 mb-8">
            TicketBari is designed to make your travel experience smooth, reliable,
            and stress-free—from booking to boarding.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Fast & secure ticket booking in just a few clicks</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Live seat availability with instant confirmation</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Digital tickets with easy access anytime, anywhere</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                ✓
              </span>
              <span>Multiple transport options: Bus, Train & Flight</span>
            </li>
          </ul>
        </div>

        {/* Right Visual Content */}
        <div className="bg-gradient-to-br from-purple-700 to-blue-700 p-10 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 text-white text-center">
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-sm text-white/80 mt-1">Tickets Booked</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold">5K+</h3>
              <p className="text-sm text-white/80 mt-1">Happy Travelers</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold">99%</h3>
              <p className="text-sm text-white/80 mt-1">Success Rate</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-sm text-white/80 mt-1">Support</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>


      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                TicketBari is a modern online ticket booking platform built with cutting-edge MERN stack technology. We provide a centralized solution for booking Bus, Train, Launch, and Flight tickets across Bangladesh.
              </p>
              <p>
                Our platform empowers both travelers and transport operators by creating a seamless ecosystem where booking tickets is as simple as a few clicks, and managing inventory is intuitive and efficient.
              </p>
              <p>
                With secure payment processing, real-time updates, and comprehensive analytics, TicketBari is transforming the travel industry in Bangladesh.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-4">
                  {React.cloneElement(value.icon, { className: "text-white" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TicketBari?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive set of features designed to make your travel booking experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {feature.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about TicketBari
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-purple-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-lg mb-8 text-white/90">
              TicketBari is powered by the MERN stack and integrated with industry-leading services to provide a robust, scalable, and secure platform.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-2">Frontend</h4>
                <p className="text-sm text-white/80">React 18, Tailwind CSS, Vite</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-2">Backend</h4>
                <p className="text-sm text-white/80">Node.js, Express, MongoDB</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-2">Authentication</h4>
                <p className="text-sm text-white/80">Firebase Auth, JWT</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-2">Payments</h4>
                <p className="text-sm text-white/80">Stripe API</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who trust TicketBari for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tickets"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-1"
            >
              <Ticket size={20} />
              Browse Tickets
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold border-2 border-purple-600 transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;