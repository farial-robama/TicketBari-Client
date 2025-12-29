import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image:
        "https://media.istockphoto.com/id/1154151207/photo/white-bus-traveling-on-the-asphalt-road-around-line-of-trees-in-rural-landscape-at-sunset.jpg?s=612x612&w=0&k=20&c=NLXHp8-e5glAM7t-30Flvcl8R0S_ch8cE5gKghfFbVI=",
      title: "Journey Beyond Boundaries",
      subtitle: "Discover seamless travel experience",
      description: "Book your next adventure with confidence and ease",
      badge: "🚌 Bus Travel",
      stats: { routes: "500+", customers: "1M+" }
    },
    {
      image:
        "https://media.istockphoto.com/id/669839722/photo/passenger-train-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jw1cuXEjZ7QRWoIlNMvDABxrBUEIEGp56125d0HJPZQ=",
      title: "Comfort Meets Convenience",
      subtitle: "Premium service, affordable price",
      description: "Join millions who trust us for their travel needs",
      badge: "🚂 Train Service",
      stats: { routes: "300+", customers: "800K+" }
    },
    {
      image:
        "https://images.unsplash.com/photo-1679400441308-c20e93746bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEElMjBwbGFuZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Your Adventure Awaits",
      subtitle: "Connect to destinations worldwide",
      description: "From city escapes to countryside retreats",
      badge: "✈️ Air Travel",
      stats: { routes: "200+", customers: "500K+" }
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 mt-20">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 absolute pointer-events-none"
                }`}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                  <Sparkles size={16} className="text-yellow-300" />
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="inline-block animate-fade-in">
                    {slide.title}
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                  <p className="text-lg md:text-xl font-semibold text-white">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Stats */}
                <div className="flex gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {slide.stats.routes}
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider">
                      Routes
                    </div>
                  </div>
                  <div className="w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {slide.stats.customers}
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider">
                      Happy Customers
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/tickets")}
                    className="group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Book Your Ticket
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  
                  <button className="group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 border border-white/30 transform hover:scale-105 transition-all duration-300">
                    <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-12 bg-white shadow-lg"
                : "w-2 bg-white/50 hover:bg-white/70 hover:w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;