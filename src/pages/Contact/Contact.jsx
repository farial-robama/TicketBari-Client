import React, { useState, useCallback } from "react";
import { Link } from "react-router";
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare,
  Facebook, Twitter, Instagram, Linkedin,
  AlertCircle, User, MessageCircle, Copy, Check,
  ArrowRight, ChevronDown, ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";

const CONTACT_INFO = [
  { icon: Mail, title: "Email Us", main: "support@ticketbari.com", sub: "info@ticketbari.com", color: "from-blue-500 to-cyan-500", copyable: true, type: "email" },
  { icon: Phone, title: "Call Us", main: "+880 1234-567890", sub: "+880 1987-654321", color: "from-violet-500 to-purple-500", copyable: true, type: "phone" },
  { icon: MapPin, title: "Visit Us", main: "123 Travel Street", sub: "Dhaka, Bangladesh", color: "from-emerald-500 to-teal-500", copyable: false },
  { icon: Clock, title: "Working Hours", main: "Mon – Sat: 9AM – 6PM", sub: "Sunday: Closed", color: "from-amber-500 to-orange-500", copyable: false },
];

const SOCIAL = [
  { icon: Facebook, name: "Facebook", href: "https://facebook.com", bg: "hover:bg-blue-600" },
  { icon: Twitter, name: "Twitter", href: "https://twitter.com", bg: "hover:bg-sky-500" },
  { icon: Instagram, name: "Instagram", href: "https://instagram.com", bg: "hover:bg-pink-600" },
  { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com", bg: "hover:bg-blue-700" },
];

const CATEGORIES = [
  { value: "general", label: "General Inquiry" },
  { value: "booking", label: "Booking Support" },
  { value: "technical", label: "Technical Issue" },
  { value: "vendor", label: "Vendor Inquiry" },
  { value: "feedback", label: "Feedback" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "", category: "general" };

function validate(data) {
  const e = {};
  if (!data.name.trim() || data.name.trim().length < 2) e.name = "Name must be at least 2 characters";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Valid email required";
  if (data.phone && !/^[0-9+\-\s()]{10,}$/.test(data.phone)) e.phone = "Enter a valid phone number";
  if (!data.subject.trim() || data.subject.trim().length < 5) e.subject = "Subject must be at least 5 characters";
  if (!data.message.trim() || data.message.trim().length < 10) e.message = "Message must be at least 10 characters";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(null); // type string or null
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); toast.error("Please fix the errors"); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitting(false);
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast.success("Copied to clipboard!");
    });
  };

  const inputBase = "w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const inputOk = "border-gray-200 dark:border-gray-700";
  const inputErr = "border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/10";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-40 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-6 border border-violet-200 dark:border-violet-700">
            <MessageSquare size={14} /> We'd love to hear from you
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Get in <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or need help? Our team is ready to assist — reach out and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ─────────────────────────────────────────────── */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CONTACT_INFO.map(({ icon: Icon, title, main, sub, color, copyable, type }) => (
            <div key={title} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-sm mb-2">{title}</h3>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{main}</p>
                {copyable && (
                  <button
                    onClick={() => copyText(main, type)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                    title="Copy"
                  >
                    {copied === type ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-gray-400" />}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + SIDEBAR ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">

          {/* Form — 3/5 */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black mb-1">Send a message</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Your Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    className={`${inputBase} ${errors.name ? inputErr : inputOk} pl-9`} placeholder="John Doe" />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Email *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      className={`${inputBase} ${errors.email ? inputErr : inputOk} pl-9`} placeholder="you@example.com" />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Phone <span className="normal-case text-gray-400 font-normal">(optional)</span></label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className={`${inputBase} ${errors.phone ? inputErr : inputOk} pl-9`} placeholder="+880 1234-567890" />
                  </div>
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className={`${inputBase} ${inputOk} appearance-none cursor-pointer`}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Subject *</label>
                <div className="relative">
                  <MessageCircle size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    className={`${inputBase} ${errors.subject ? inputErr : inputOk} pl-9`} placeholder="How can we help?" />
                </div>
                {errors.subject && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} maxLength={500}
                  className={`${inputBase} ${errors.message ? inputErr : inputOk} resize-none`}
                  placeholder="Tell us more about your inquiry..." />
                <div className="flex items-center justify-between mt-1.5">
                  {errors.message
                    ? <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>
                    : <span />}
                  <p className="text-xs text-gray-400">{form.message.length}/500</p>
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-violet-200 dark:shadow-violet-900/30 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar — 2/5 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick support */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-700 to-blue-700 p-8 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <h3 className="text-xl font-black mb-2">Quick support</h3>
              <p className="text-white/70 text-sm mb-6">Need help right away? Here's what to expect.</p>
              <ul className="space-y-3">
                {["Avg. reply time: ~2 hours", "24/7 support available", "Multiple contact channels", "Dedicated vendor support"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center mx-auto mb-2">
                    <MapPin size={22} className="text-violet-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold mb-0.5">123 Travel Street</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Dhaka, Bangladesh</p>
                <a href="https://maps.google.com/?q=Dhaka,Bangladesh" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                  Get Directions <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-black mb-1">Follow us</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">Stay updated with the latest news and offers.</p>
              <div className="flex gap-3">
                {SOCIAL.map(({ icon: Icon, name, href, bg }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                    className={`w-11 h-11 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center hover:text-white transition-all hover:-translate-y-0.5 ${bg}`}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">FAQ</p>
            <h2 className="text-4xl font-black tracking-tight">Still have questions?</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "How quickly will I get a response?", a: "Our average response time is 2 hours during working hours. For urgent issues, call us directly." },
              { q: "What's the best way to report a technical issue?", a: "Select 'Technical Issue' in the category dropdown and describe the problem in detail. Screenshots help a lot!" },
              { q: "Can vendors contact you separately?", a: "Yes — select 'Vendor Inquiry' in the form category and our vendor support team will prioritize your request." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "bg-violet-600 border-violet-600 text-white" : "border-gray-300 dark:border-gray-600 text-gray-400"}`}>
                    {openFaq === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT TYPES ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🧑‍💼", title: "Customer Support", desc: "For booking and account issues", color: "from-blue-500 to-cyan-500" },
              { emoji: "🏪", title: "Vendor Support", desc: "For partner and listing inquiries", color: "from-violet-500 to-purple-500" },
              { emoji: "🔧", title: "Technical Support", desc: "For bugs and technical assistance", color: "from-emerald-500 to-teal-500" },
            ].map(({ emoji, title, desc, color }) => (
              <div key={title} className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-5 rounded-full translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity`} />
                <div className="text-3xl mb-3">{emoji}</div>
                <h4 className="font-black mb-1">{title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}