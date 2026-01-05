
import React from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Shield,
  Award,
  Users,
  ChevronRight,
  Heart
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Tickets", path: "/tickets" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About Us", path: "/about" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/faq" },
    { name: "Booking Guide", path: "/guide" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Refund Policy", path: "/refund" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  const socialLinks = [
    { icon: Facebook, link: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, link: "#", color: "hover:bg-sky-500" },
    { icon: Instagram, link: "#", color: "hover:bg-pink-600" },
    { icon: Linkedin, link: "#", color: "hover:bg-blue-700" },
  ];

  const features = [
    { icon: Shield, text: "Secure Payment" },
    { icon: Award, text: "Trusted Platform" },
    { icon: Users, text: "24/7 Support" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <img src="/logo.png" className="w-8 h-8 object-contain" alt="TicketBari Logo" />
              </div>
              <h6 className="font-bold text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TicketBari
              </h6>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for seamless travel experiences. Book bus, train, launch, and flight tickets with confidence and ease.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h6 className="text-white font-semibold">Stay Updated</h6>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all group">
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
                  <feature.icon size={16} className="text-purple-400" />
                  <span className="text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              Quick Links
            </h6>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              Support
            </h6>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal Combined */}
          <div className="lg:col-span-4 space-y-8">
            {/* Contact Info */}
            <div>
              <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                Get In Touch
              </h6>
              <div className="space-y-4">
                <a href="mailto:support@ticketbari.com" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="font-medium">support@ticketbari.com</div>
                  </div>
                </a>

                <a href="tel:+8801234567890" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="font-medium">+880 1234-567890</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-slate-400">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Address</div>
                    <div className="font-medium">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h6 className="text-white font-semibold mb-4">Follow Us</h6>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-800 rounded-lg hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h6 className="text-white font-semibold mb-3 text-center md:text-left">Accepted Payment Methods</h6>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <div className="px-4 py-2 bg-white rounded-lg">
                  <img src="https://img.icons8.com/color/48/visa.png" className="h-6" alt="Visa" />
                </div>
                <div className="px-4 py-2 bg-white rounded-lg">
                  <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6" alt="Mastercard" />
                </div>
                <div className="px-4 py-2 bg-white rounded-lg">
                  <img src="https://img.icons8.com/fluency/48/stripe.png" className="h-6" alt="Stripe" />
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-sm font-medium">bKash</span>
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <span className="text-sm font-medium">Nagad</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Shield size={16} className="text-green-500" />
              <span>SSL Encrypted & Secure</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-slate-400 text-center md:text-left">
              © {currentYear}{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TicketBari
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-slate-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
              <span>in Bangladesh</span>
            </div>

            <nav className="flex flex-wrap gap-4 justify-center">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-400 hover:text-white transition-colors text-xs"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Scroll to top button could go here */}
    </footer>
  );
};

export default Footer;
