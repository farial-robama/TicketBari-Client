import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Gift, Bell, Zap } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errors, setErrors] = useState("");

  const benefits = [
    {
      icon: <Gift size={20} />,
      text: "Exclusive discounts & offers",
      color: "text-purple-600",
    },
    {
      icon: <Bell size={20} />,
      text: "Early access to new routes",
      color: "text-blue-600",
    },
    {
      icon: <Zap size={20} />,
      text: "Travel tips & updates",
      color: "text-orange-600",
    },
  ];

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    // Validation
    if (!email.trim()) {
      setErrors("Email is required");
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setErrors("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("🎉 Successfully subscribed! Check your email for confirmation.");
      setEmail("");
      setErrors("");
      setIsSubscribing(false);
    }, 1500);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce">
            <Mail className="text-white" size={40} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Never Miss a Deal!
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-2">
            Subscribe to our newsletter and get exclusive travel offers
          </p>
          <p className="text-sm text-white/80">
            Join 10,000+ smart travelers who save money on every trip
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                {benefit.icon}
              </div>
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors("");
                  }}
                  placeholder="Enter your email address"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 ${
                    errors
                      ? "ring-2 ring-red-500"
                      : "focus:ring-purple-500"
                  } text-gray-900 text-lg`}
                  disabled={isSubscribing}
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold whitespace-nowrap flex items-center justify-center gap-2 ${
                  isSubscribing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubscribing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errors && (
            <div className="mt-3 flex items-center gap-2 text-red-200 justify-center">
              <AlertCircle size={16} />
              <span className="text-sm">{errors}</span>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-center text-white/70 text-sm mt-4">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </form>

        {/* Success Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
            <div className="text-sm text-white/80">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">50%</div>
            <div className="text-sm text-white/80">Avg. Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-white/80">Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;