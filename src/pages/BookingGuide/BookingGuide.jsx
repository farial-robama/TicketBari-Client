import React, { useState } from "react";
import { Link } from "react-router";
import {
  Search, Ticket, CreditCard, CheckCircle,
  ShieldCheck, Clock, AlertCircle, Bus, Train,
  Plane, Ship, ArrowRight, ChevronDown, ChevronUp,
  Smartphone, HelpCircle,
} from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Search Your Trip",
    desc: "Choose your route, travel date, and preferred transport type to find available tickets.",
    color: "from-blue-500 to-cyan-500",
    tip: "Use filters to narrow by price or departure time.",
  },
  {
    icon: Ticket,
    title: "Select & Review",
    desc: "Review ticket details, check seat availability, and confirm your booking information.",
    color: "from-violet-500 to-purple-500",
    tip: "Check the departure time carefully before proceeding.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    desc: "Pay safely using Stripe-powered payment with full encryption and transaction protection.",
    color: "from-emerald-500 to-teal-500",
    tip: "We never store your card details — Stripe handles everything.",
  },
  {
    icon: CheckCircle,
    title: "Get Confirmation",
    desc: "Receive instant booking confirmation and manage your ticket from your dashboard.",
    color: "from-amber-500 to-orange-500",
    tip: "Your digital ticket appears instantly in your dashboard.",
  },
];

const TRANSPORT = [
  { icon: Bus, label: "Bus", desc: "Inter-city & local routes across Bangladesh", count: "200+ routes", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800" },
  { icon: Train, label: "Train", desc: "Comfortable railway journeys nationwide", count: "50+ routes", color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800" },
  { icon: Plane, label: "Flight", desc: "Domestic flights between major cities", count: "All airports", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800" },
  { icon: Ship, label: "Launch", desc: "River routes through the Sundarbans region", count: "30+ routes", color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800" },
];

const NOTES = [
  { icon: AlertCircle, text: "Ensure travel date and time are correct before payment.", color: "text-red-500" },
  { icon: Clock, text: "Bookings for past departure times are blocked automatically.", color: "text-blue-500" },
  { icon: ShieldCheck, text: "All payments are 256-bit SSL encrypted via Stripe.", color: "text-emerald-500" },
  { icon: CheckCircle, text: "Confirmed tickets appear instantly in your dashboard.", color: "text-violet-500" },
  { icon: Smartphone, text: "Access your digital ticket anytime from any device.", color: "text-amber-500" },
  { icon: HelpCircle, text: "Contact support if you face issues within 24 hours of travel.", color: "text-rose-500" },
];

const FAQS = [
  { q: "Can I cancel or modify my booking?", a: "Cancellation and modification policies depend on the vendor. Check the ticket details page for specific terms before booking." },
  { q: "What happens if the transport is cancelled?", a: "In case of cancellations by the operator, your booking status will be updated and you can contact support for refund assistance." },
  { q: "How many tickets can I book at once?", a: "You can book multiple tickets in a single transaction. Seat availability is checked in real-time during checkout." },
  { q: "Is my payment information safe?", a: "Yes. We use Stripe for all payments — your card details are never stored on our servers. All transactions use 256-bit SSL encryption." },
];

export default function BookingGuide() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-700">
            <Ticket size={14} /> Step-by-Step Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Book your ticket <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              in 4 simple steps
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            TicketBari makes travel booking fast, secure, and stress-free. Here's exactly how it works.
          </p>
          <Link to="/tickets" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
            Start Booking <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── INTERACTIVE STEPS ──────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Step selector */}
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const active = activeStep === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 group ${
                      active
                        ? "bg-white dark:bg-gray-800 border-violet-300 dark:border-violet-600 shadow-lg"
                        : "bg-white/60 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 transition-transform ${active ? "scale-110" : "group-hover:scale-105"}`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Step {i + 1}</span>
                          {active && <span className="text-xs px-2 py-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full font-semibold">Active</span>}
                        </div>
                        <h3 className="font-bold">{step.title}</h3>
                      </div>
                      <ArrowRight size={16} className={`text-gray-400 shrink-0 transition-transform ${active ? "translate-x-1 text-violet-500" : ""}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step detail */}
            <div className="lg:sticky lg:top-24">
              {(() => {
                const step = STEPS[activeStep];
                const Icon = step.icon;
                return (
                  <div className={`bg-gradient-to-br ${step.color} p-[2px] rounded-3xl shadow-xl`}>
                    <div className="bg-white dark:bg-gray-900 rounded-[22px] p-8 md:p-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                        <Icon size={30} className="text-white" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Step {activeStep + 1} of {STEPS.length}</p>
                      <h2 className="text-3xl font-black mb-4">{step.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{step.desc}</p>
                      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <span className="text-amber-500 text-lg shrink-0">💡</span>
                        <p className="text-sm text-amber-800 dark:text-amber-200">{step.tip}</p>
                      </div>
                      <div className="flex gap-2 mt-6">
                        {STEPS.map((_, i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i === activeStep ? `bg-gradient-to-r ${step.color}` : "bg-gray-100 dark:bg-gray-800"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSPORT TYPES ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Coverage</p>
            <h2 className="text-4xl font-black tracking-tight">Supported transport types</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">One platform, every way to travel across Bangladesh.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TRANSPORT.map(({ icon: Icon, label, desc, count, color }) => (
              <div key={label} className={`rounded-2xl border p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200 ${color}`}>
                <Icon size={28} className="mb-4" />
                <h3 className="font-black text-lg mb-1">{label}</h3>
                <p className="text-xs opacity-70 leading-relaxed mb-3">{desc}</p>
                <span className="text-xs font-bold opacity-60">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPORTANT NOTES ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Before You Book</p>
            <h2 className="text-4xl font-black tracking-tight">Important notes</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {NOTES.map(({ icon: Icon, text, color }, i) => (
              <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-sm transition-shadow">
                <Icon size={20} className={`${color} mt-0.5 shrink-0`} />
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">FAQ</p>
            <h2 className="text-4xl font-black tracking-tight">Booking questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 dark:border-gray-600 text-gray-400"}`}>
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

      {/* ── HELP BANNER ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-violet-700 to-purple-700 p-10 md:p-14 text-white text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black mb-3">Need help booking?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Our support team is available 24/7 to help with any booking, payment, or ticket issues.</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["24/7 Support", "Secure Payments", "Instant Confirmation"].map((t) => (
                  <span key={t} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">{t}</span>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-violet-700 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                Contact Support <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}