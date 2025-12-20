import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Clock, Headphones, Gift, Zap } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time seat availability",
      description: "Instant confirmation with live updates"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure payment gateways",
      description: "Multiple payment options, fully encrypted"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 customer support",
      description: "Always here for booking assistance"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Easy cancellation",
      description: "Instant refund policy, no hassle"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Exclusive discounts",
      description: "Special deals for frequent travelers"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section 1  */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col-reverse lg:flex-row gap-12 items-center mb-24"
        >
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Why TicketBari?
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Your Trusted Travel Partner
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              We're more than just a booking site. <span className="font-bold text-blue-600">TicketBari</span> connects 
              you to thousands of routes with verified operators, ensuring your journey is safe, affordable, and on time.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">1000+</p>
                  <p className="text-sm text-gray-600">Verified Operators</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-600">Daily Bookings</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.8★</p>
                  <p className="text-sm text-gray-600">User Rating</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-2xl opacity-20"></div>
            <img
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              src="https://media.istockphoto.com/id/2161855658/photo/woman-listening-music-on-smartphone-in-public-transport.jpg?s=612x612&w=0&k=20&c=BcrGXcsC3P_Y9DmkcqaLJN0R0vENUp74JcZLlDztBb0="
              alt="Happy traveler"
            />
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-20"></div>
            <img
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              src="https://media.istockphoto.com/id/2208462604/photo/public-transportation-in-modern-city-bus-parked-at-bus-stop-with-skyline-in-the-background.jpg?s=612x612&w=0&k=20&c=tr_pcTz8-x4TufrfcfUe7YgX-lnujK17NSRZhknfdMk="
              alt="Modern bus"
            />
          </motion.div>

          <div className="flex-1 order-1 lg:order-2">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Our Advantages
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              The TicketBari Difference
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Join Over 1 Million Happy Travelers
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Experience the easiest way to book your journey today
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Start Booking Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;