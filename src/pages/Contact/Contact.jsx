import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle,
  User,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "support@ticketbari.com",
      subdetails: "info@ticketbari.com",
      color: "bg-blue-100 text-blue-600",
      copyable: true,
      type: "email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+880 1234-567890",
      subdetails: "+880 1987-654321",
      color: "bg-green-100 text-green-600",
      copyable: true,
      type: "phone",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Travel Street",
      subdetails: "Dhaka, Bangladesh",
      color: "bg-purple-100 text-purple-600",
      copyable: false,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM",
      subdetails: "Sunday: Closed",
      color: "bg-orange-100 text-orange-600",
      copyable: false,
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, name: "Facebook", href: "https://facebook.com", color: "hover:bg-blue-600" },
    { icon: <Twitter size={20} />, name: "Twitter", href: "https://twitter.com", color: "hover:bg-sky-500" },
    { icon: <Instagram size={20} />, name: "Instagram", href: "https://instagram.com", color: "hover:bg-pink-600" },
    { icon: <Linkedin size={20} />, name: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-blue-700" },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Booking Support" },
    { value: "technical", label: "Technical Issue" },
    { value: "vendor", label: "Vendor Inquiry" },
    { value: "feedback", label: "Feedback" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
      });
      setErrors({});
      setIsSubmitting(false);
    }, 2000);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast.success(`${type === "email" ? "Email" : "Phone"} copied to clipboard!`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 animate-bounce">
            <MessageSquare className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${info.color} rounded-lg mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">{info.details}</p>
                    {info.copyable && (
                      <button
                        onClick={() => copyToClipboard(info.details, info.type)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        {(info.type === "email" && copiedEmail) || (info.type === "phone" && copiedPhone) ? (
                          <Check className="text-green-600" size={16} />
                        ) : (
                          <Copy className="text-gray-400" size={16} />
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{info.subdetails}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                        placeholder="+880 1234-567890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                      placeholder="How can we help you?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.message.length} / 500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-1 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Quick Support Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Quick Support</h3>
                <p className="text-white/90 mb-6">
                  Need immediate assistance? Check out our FAQ section or contact our 24/7 support team.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">Average response time: 2 hours</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">24/7 customer support available</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">Multiple contact channels</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">Dedicated support for vendors</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20"></div>
                  <div className="text-center relative z-10">
                    <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Our Office Location</p>
                    <p className="text-sm text-gray-600">123 Travel Street, Dhaka</p>
                    <button className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors shadow-md font-medium">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for updates and exclusive offers
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-600 rounded-lg hover:text-white transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our support team is always ready to assist you with any inquiries or concerns.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-3">
                <User size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Support</h4>
              <p className="text-sm text-gray-600">For booking and account issues</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-3">
                <MessageSquare size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Vendor Support</h4>
              <p className="text-sm text-gray-600">For partner inquiries</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-3">
                <CheckCircle size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Technical Support</h4>
              <p className="text-sm text-gray-600">For technical assistance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;