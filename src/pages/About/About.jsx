import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Ticket, Shield, Users, TrendingUp, MapPin, Clock,
  Award, Heart, Target, Zap, ChevronDown, ChevronUp,
  Bus, Train, Plane, Ship, ArrowRight, Star, Globe,
} from "lucide-react";

// ── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target, inView, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return value;
}

const STATS = [
  { label: "Active Users", target: 10000, suffix: "+", icon: "👥" },
  { label: "Tickets Booked", target: 50000, suffix: "+", icon: "🎫" },
  { label: "Transport Partners", target: 500, suffix: "+", icon: "🚌" },
  { label: "Cities Covered", target: 64, suffix: "", icon: "🗺️" },
];

function StatCard({ label, target, suffix, icon, inView }) {
  const value = useCounter(target, inView);
  const display = value >= 1000 ? (value / 1000).toFixed(value >= 10000 ? 0 : 1) + "K" : value;
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
        {display}{suffix}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{label}</p>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

const FEATURES = [
  { icon: Shield, title: "Secure Payments", desc: "256-bit SSL + PCI DSS compliance via Stripe.", color: "from-blue-500 to-cyan-500" },
  { icon: Users, title: "Multi-Role System", desc: "Customer, Vendor, and Admin with distinct dashboards.", color: "from-violet-500 to-purple-500" },
  { icon: TrendingUp, title: "Real-time Analytics", desc: "Live revenue and performance insights with charts.", color: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "Instant Booking", desc: "One-click booking with real-time seat availability.", color: "from-amber-500 to-orange-500" },
  { icon: Globe, title: "Wide Coverage", desc: "Bus, Train, Launch & Flight across all 64 districts.", color: "from-rose-500 to-pink-500" },
  { icon: Clock, title: "24/7 Service", desc: "Platform available round-the-clock, zero downtime.", color: "from-indigo-500 to-blue-500" },
];

const VALUES = [
  { icon: Target, title: "Our Mission", desc: "Simplify travel booking for every Bangladeshi traveler with a seamless, trustworthy experience.", gradient: "from-violet-500 to-purple-600" },
  { icon: Heart, title: "Our Vision", desc: "Become the most comprehensive and trusted travel platform in South Asia.", gradient: "from-rose-500 to-pink-600" },
  { icon: Award, title: "Our Values", desc: "Quality, reliability, innovation, and customer-first thinking in every decision we make.", gradient: "from-amber-500 to-orange-600" },
];

const FAQS = [
  { q: "How does TicketBari ensure secure transactions?", a: "We use Stripe with 256-bit SSL encryption, PCI DSS compliance, and secure tokenization to protect every transaction." },
  { q: "What types of tickets can I book?", a: "You can book Bus, Train, Launch, and Flight tickets across 64 cities in Bangladesh." },
  { q: "How do I become a vendor on TicketBari?", a: "Sign up for a vendor account, submit your business details for verification, and once approved, start listing tickets." },
  { q: "Is there a mobile app available?", a: "TicketBari is a fully responsive web app that works great on all devices. A native mobile app is in development." },
];

export default function About() {
  const [statsRef, statsInView] = useInView();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full blur-3xl opacity-40 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-40 translate-y-1/2" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-6 border border-violet-200 dark:border-violet-700">
            <Star size={14} className="fill-current" /> Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Reimagining travel <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              across Bangladesh
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TicketBari is a MERN-stack platform connecting millions of travelers with bus, train, launch, and flight tickets — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/tickets" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
              <Ticket size={18} /> Browse Tickets
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => <StatCard key={s.label} {...s} inView={statsInView} />)}
        </div>
      </section>

      {/* ── WHO WE ARE ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">About Us</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Built for <br /> Bangladesh's travelers
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>TicketBari is a centralized solution for booking transportation tickets of all kinds — Bus, Train, Launch, and Flight — across Bangladesh.</p>
                <p>Our platform empowers both travelers and operators: passengers find and book with confidence; vendors manage inventory and revenue with precision.</p>
                <p>With Stripe payments, real-time seat availability, and role-based dashboards, we're transforming how Bangladesh travels.</p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                {[Bus, Train, Plane, Ship].map((Icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Icon size={20} className="text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-500">All transport types</span>
              </div>
            </div>
            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">What drives us</p>
            <h2 className="text-4xl font-black tracking-tight">Our foundation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, gradient }) => (
              <div key={title} className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-violet-400 hover:to-blue-400 transition-all duration-300 group">
                <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-7">
                  <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} items-center justify-center mb-5`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-black mb-3">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM HIGHLIGHTS ────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-700 to-blue-700 p-1">
            <div className="rounded-[22px] bg-gradient-to-br from-violet-700 via-purple-800 to-blue-800 overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-14 text-white flex flex-col justify-center">
                  <p className="text-violet-300 text-xs font-bold uppercase tracking-widest mb-4">Platform Highlights</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
                    Designed for a better travel experience
                  </h2>
                  <p className="text-white/70 mb-8 leading-relaxed">From booking to boarding, every step is smooth, reliable, and secure.</p>
                  <ul className="space-y-3">
                    {[
                      "Fast & secure booking in a few clicks",
                      "Live seat availability + instant confirmation",
                      "Digital tickets accessible anytime",
                      "Bus, Train, Launch & Flight in one place",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-10 md:p-14 flex items-center justify-center bg-black/10">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    {[["10K+", "Tickets Booked"], ["5K+", "Happy Travelers"], ["99%", "Success Rate"], ["24/7", "Support"]].map(([val, lbl]) => (
                      <div key={lbl} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-colors">
                        <p className="text-3xl font-black">{val}</p>
                        <p className="text-xs text-white/70 mt-1">{lbl}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Technology</p>
            <h2 className="text-4xl font-black tracking-tight">Built with modern tech</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Frontend", tech: "React 19 · Vite · Tailwind CSS", emoji: "⚛️" },
              { title: "Backend", tech: "Node.js · Express · MongoDB", emoji: "🖥️" },
              { title: "Auth", tech: "Firebase Auth · JWT · RBAC", emoji: "🔐" },
              { title: "Payments", tech: "Stripe API · PCI DSS", emoji: "💳" },
            ].map(({ title, tech, emoji }) => (
              <div key={title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                <div className="text-2xl mb-3">{emoji}</div>
                <h4 className="font-bold mb-1 text-sm">{title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">FAQ</p>
            <h2 className="text-4xl font-black tracking-tight">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "bg-violet-600 border-violet-600 text-white" : "border-gray-300 dark:border-gray-600 text-gray-400"}`}>
                    {openFaq === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48" : "max-h-0"}`}>
                  <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 rounded-3xl border border-violet-100 dark:border-violet-800 p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ready to travel?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Join thousands of travelers who trust TicketBari for their journeys.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/tickets" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-violet-200 dark:shadow-violet-900/30 text-base">
                <Ticket size={20} /> Browse Tickets
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-base">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}