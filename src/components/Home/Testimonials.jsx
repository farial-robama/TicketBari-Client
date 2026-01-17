import { Star } from 'lucide-react';
import React from 'react';

const Testimonials = () => {
    const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Regular Traveler",
      image: "/user1.jpg",
      rating: 5,
      text: "TicketBari made my travel planning so easy! I booked my bus ticket in under 2 minutes. Highly recommended!",
    },
    {
      name: "Fatima Rahman",
      role: "Business Professional",
      image: "/user2.jpg",
      rating: 5,
      text: "The best ticket booking platform in Bangladesh. Secure payments and instant confirmation every time.",
    },
    {
      name: "Karim Uddin",
      role: "Student",
      image: "/user3.jpg",
      rating: 5,
      text: "Great prices and easy to use. I've been using TicketBari for all my trips home. Never had any issues!",
    },
  ];

    return (
       <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from real travelers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Testimonials;