import { ChevronLeft, ChevronRight } from "lucide-react";
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
      title: "Journey Beyound Boundaries",
      subtitle: "Discover seamless travel experience",
      description: "Book your next adventure with confidence and ease",
    },
    {
      image:
        "https://media.istockphoto.com/id/669839722/photo/passenger-train-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jw1cuXEjZ7QRWoIlNMvDABxrBUEIEGp56125d0HJPZQ=",
      title: "Comfort Meets Convenience",
      subtitle: "Premium service, affordable price",
      description: "Join millions who trust us for their travel needs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1679400441308-c20e93746bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEElMjBwbGFuZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Your Adventure Awaits",
      subtitle: "Connect to destination worldwide",
      description: "From city escape to countryside retreats.",
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
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 pt-30">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slides.title}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradien-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 absolute"
                }`}
              >
                <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-white bg-blue-600 rounded-full">
                  {slide.subtitle}
                </div>
                <h1 className="text-5xl md:text-2xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  {slide.description}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/tickets")}
                    className="btn btn-active bg-gradient-to-t to-[#632EE3] from-[#9F62F2] text-white mt-7 px-5"
                  >
                    Book Now
                  </button>
                  <button className="btn btn-active bg-gradient-to-t to-[#632EE3] from-[#9F62F2] text-white mt-7 px-5">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-white border border-white/30"
      >
        <ChevronLeft size={24}></ChevronLeft>
      </button>

      <button
        onClick={nextSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-white border border-white/30"
      >
        <ChevronRight size={24}></ChevronRight>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3"></div>
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "w-12 bg-white"
              : "w-2 bg-white/50 hover:bg-white/70"
          }`}
        ></button>
      ))}
    </div>
  );
};

export default Banner;
