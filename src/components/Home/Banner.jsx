import { ChevronLeft, ChevronRight, Play, Sparkles, Pause, MapPin, Calendar, Users } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      image:
        "https://media.istockphoto.com/id/1154151207/photo/white-bus-traveling-on-the-asphalt-road-around-line-of-trees-in-rural-landscape-at-sunset.jpg?s=612x612&w=0&k=20&c=NLXHp8-e5glAM7t-30Flvcl8R0S_ch8cE5gKghfFbVI=",
      title: "Journey Beyond Boundaries",
      subtitle: "Discover seamless travel experience",
      description: "Book your next adventure with confidence and ease",
      badge: "Bus Travel",
      icon: "🚌",
      stats: { routes: "500+", customers: "1M+", rating: "4.8" },
      color: "from-orange-600 to-red-600"
    },
    {
      image:
        "https://media.istockphoto.com/id/669839722/photo/passenger-train-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jw1cuXEjZ7QRWoIlNMvDABxrBUEIEGp56125d0HJPZQ=",
      title: "Comfort Meets Convenience",
      subtitle: "Premium service, affordable price",
      description: "Join millions who trust us for their travel needs",
      badge: "Train Service",
      icon: "🚂",
      stats: { routes: "300+", customers: "800K+", rating: "4.9" },
      color: "from-blue-600 to-cyan-600"
    },
    {
      image:
        "https://images.unsplash.com/photo-1679400441308-c20e93746bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEElMjBwbGFuZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Your Adventure Awaits",
      subtitle: "Connect to destinations worldwide",
      description: "From city escapes to countryside retreats",
      badge: "Air Travel",
      icon: "✈️",
      stats: { routes: "200+", customers: "500K+", rating: "4.7" },
      color: "from-purple-600 to-pink-600"
    },
  ];

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, isTransitioning, goToSlide]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, isTransitioning, goToSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Travel destinations carousel"
    >
      {/* Background Slides with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-110"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0 translate-x-0"
                    : "opacity-0 translate-y-10 translate-x-8 absolute pointer-events-none"
                }`}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-semibold text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 transition-colors">
                  <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                  <span className="text-xl">{slide.icon}</span>
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                  {slide.title.split(' ').map((word, i) => (
                    <span 
                      key={i}
                      className="inline-block mr-3"
                      style={{ 
                        animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <div className={`inline-block mb-4 px-6 py-2.5 bg-gradient-to-r ${slide.color} rounded-full shadow-lg`}>
                  <p className="text-base md:text-lg font-semibold text-white">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Enhanced Stats with Icons */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                    <MapPin className="text-blue-400" size={24} />
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {slide.stats.routes}
                      </div>
                      <div className="text-xs text-gray-300 uppercase tracking-wider">
                        Routes
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                    <Users className="text-green-400" size={24} />
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {slide.stats.customers}
                      </div>
                      <div className="text-xs text-gray-300 uppercase tracking-wider">
                        Customers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {slide.stats.rating}
                      </div>
                      <div className="text-xs text-gray-300 uppercase tracking-wider">
                        Rating
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link to="/tickets"
                    className={`group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r ${slide.color} rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30`}
                    aria-label="Book your ticket"
                  >
                    <Calendar size={20} className="mr-2" />
                    Book Your Ticket
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  {/* <button 
                    className="group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 border border-white/30 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20"
                    aria-label="Watch introduction video"
                  >
                    <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    Watch Video
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/20 hover:border-white/40 shadow-lg group focus:outline-none focus:ring-4 focus:ring-white/30"
        aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
      >
        {isAutoPlaying ? (
          <Pause size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Play size={20} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-lg">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed ${
              index === currentSlide
                ? "w-12 bg-white shadow-lg"
                : "w-2 bg-white/50 hover:bg-white/70 hover:w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          ></button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className={`h-full bg-gradient-to-r ${currentSlideData.color} transition-all duration-300`}
          style={{
            width: isAutoPlaying ? '100%' : '0%',
            transition: isAutoPlaying ? 'width 5s linear' : 'width 0.3s',
            animation: isAutoPlaying ? 'progressBar 5s linear infinite' : 'none'
          }}
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Banner;