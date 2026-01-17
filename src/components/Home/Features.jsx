import { Clock, CreditCard, Shield, Users } from "lucide-react";
import React from "react";

const Features = () => {
    
const features = [
    {
      icon: <Shield size={32} />,
      title: "Secure Payments",
      description: "100% secure transactions with Stripe integration",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Clock size={32} />,
      title: "Instant Booking",
      description: "Get confirmed tickets in seconds",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <CreditCard size={32} />,
      title: "Best Prices",
      description: "Compare and choose the best deals",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Users size={32} />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
      color: "bg-orange-100 text-orange-600",
    },
  ];
  return <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TicketBari?
            </h2>
            <p className="text-lg text-gray-600">
              Experience hassle-free travel booking with our premium features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-lg mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>;
};

export default Features;
