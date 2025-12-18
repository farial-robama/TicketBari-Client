import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaArrowRight, FaCalendarAlt, FaClock, FaMapPin } from 'react-icons/fa';
import { BsTicket } from 'react-icons/bs';
import { CiTimer } from "react-icons/ci";
import useAuth from '../../hooks/useAuth';

const TicketsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");
  const queryClient = useQueryClient()

  const { data: ticket, isLoading } = useQuery({
          queryKey: ['ticket-details', id],
          queryFn: async () => {
              const { data } = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/tickets/${id}`) 
              return data
          }
      })

     const { data: role } = useQuery({
          queryKey: ['user-role'],
          enabled: !!user?.email,
          queryFn: async () => {
              const { data } = await axiosSecure.get('/user/role') 
              return data.role;
          }
      })

  

      useEffect(() => {
        if(!ticket) return;

        const interval = setInterval(() => {
            const now = new Date();
            const depart = new Date(ticket.departure);

            const diff = depart - now;

            if (diff <= 0) {
                setCountdown("Departure Passed");
                return clearInterval(interval);
            }
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)
            setCountdown(`${hours}h : ${minutes}m : ${seconds}s`)
        }, 1000)
        return () => clearInterval(interval)
      }, [ticket]);

      const handleBooking = async () => {
        if (quantity > ticket.quantity) {
            toast.error("Quantity exceeds available tickets!")
            return;
        }
         if (quantity < 1) {
            toast.error("Please select at least 1 ticket!")
            return;
        }
        try {
          const booking = {
            ticketId: ticket._id,
            quantity,
            totalPrice: ticket.price * quantity,
            status: "Pending",
        }
        await axiosSecure.post('/bookings', booking);
        queryClient.invalidateQueries({ queryKey: ['ticket-details', id]});
        toast.success(`Successfully booked ${quantity} ticket(s)!`);
        setShowModal(false);
        setQuantity(1);
        } catch (error) {
          console.error(error)
          toast.error('Failed to book ticket. Please try again.')
        }
      }

      if(isLoading) return <LoadingSpinner></LoadingSpinner>

      if(!ticket) return <div className=' text-center py-12 text-gray-700'>
        <p>Ticket not found</p>
        <button  onClick={() => navigate(-1)}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition font-semibold'>
                Go Back</button>
      </div>

      const isDeparturePassed = new Date(ticket.departure) < new Date();
      const isOutOfStock = ticket.quantity === 0;
      const isUser = role ? role === 'customer' : false;
      const isAvailable = !isDeparturePassed && !isOutOfStock && isUser;
  
  
    return (
        <div className='container mx-auto py-30'>
      <motion.div
        className="card max-w-2xl shadow-2xl mx-auto bg-[#BBDCE5] text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
      >
          {/* Image Section */}
          <div className="relative h-96 m-4 rounded-md overflow-hidden">
            <img src={ticket.image} alt={ticket.title} className='w-full h-full object-cover rounded-md' />
            <div className='absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold'>{ticket.transportType}
            </div>
          </div>
          {/* Content Section */}
          <div className='p-8'>
            {/* Title & Price */}
            <div className="flex justify-between items-start border-b border-gray-500 pb-3">
                
                <div>

                  <h1 className=" text-2xl md:text-3xl font-bold mb-2">{ticket.title}</h1>

                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                  <FaMapPin className='w-5 h-5'></FaMapPin>
                  <span>{ticket.from}</span>
                </div>
                <span><FaArrowRight /></span>
                <div className='flex items-center gap-2'>
                  <FaMapPin className='w-5 h-5'></FaMapPin>
                  <span>{ticket.to}</span>
                </div>
                </div>
                  </div>
      
            </div>
            <div className='text-start'>
              <p className='text-sm text-gray-600'>Price per ticket</p>
              <p className='text-4xl font-bold text-blue-600'>${ticket.price}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-6'>
            {/* Departure Date */}
            <div className='flex items-center gap-3'>
              <FaCalendarAlt className='w-6 h-6 text-blue-600 mt-1'></FaCalendarAlt>
              <div>
                <p className='text-sm text-gray-600 font-semibold'>Departure Date</p>
                <p className='text-lg text-gray-800'>{ticket.departureDate}</p>
              </div>
            </div>

            {/* Departure Time */}
            <div className='flex items-center gap-3'>
              <CiTimer className='w-6 h-6 text-blue-600 mt-1' />
              <div>
                <p className='text-sm text-gray-600 font-semibold'>Departure Time</p>
                <p className='text-lg text-gray-800'>{ticket.departureTime}</p>
              </div>
            </div>
            
            {/* Available Tickets */}
            <div className='flex items-center gap-3'>
              <BsTicket className='w-6 h-6 text-blue-600 mt-1'></BsTicket>
              <div>
                <p className='text-sm text-gray-600 font-semibold'>Available Tickets</p>
                <p className='text-lg text-gray-800'>
                  {ticket.quantity}{ticket.quantity === 1 ? 'ticket' : 'tickets'}
                  </p>
              </div>
            </div>

             {/* Countdown */}
            <div className='flex items-center gap-3'>
              <FaClock className='w-6 h-6 text-blue-600 mt-1'></FaClock>
              <div>
                <p className='text-sm text-gray-600 font-semibold'>Time Until Departure</p>
                <p className='text-lg text-gray-800'>{countdown}</p>
              </div>
            </div>

            {/* Perks */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                <p className='text-sm text-gray-600 font-semibold'>Included Perks</p>
                <div className='flex flex-wrap gap-2'>
                  {ticket.perks.map((perk, index) => (
                    <span key={index} className='bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full'>
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor Info */}
            <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                <p className='text-sm text-gray-600 font-semibold'>Vendor Info:</p>
                <p className='text-gray-800'>{ticket.vendorName}</p>
                <p className='text-sm text-gray-800'>{ticket.vendorEmail}</p>
            </div>

          </div>
          {/* Action Buttons */}
            <div className='flex flex-col md:flex-row gap-10 mx-6 mb-6'>
              <button
              onClick={() => navigate(-1)}
              className='px-8 py-3 text-gray-700 text-sm rounded-lg bg-[#5bb3e6] hover:bg-gray-400 transition font-semibold'>
                Go Back
              </button>
              <button
              disabled={!isAvailable}
            onClick={() => setShowModal(true)}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition ${isAvailable ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-900 cursor-not-allowed'}`}>
                {isDeparturePassed ? 'Departure Passed' : isOutOfStock ? "Sold Out" : !isUser ? 'Only Customer Can Book' : "Book Now"}
              </button>
            </div>
          </motion.div>

          {/* Booking Modal */}

          {showModal && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
              <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Book Tickets</h2>

                {/* Quantity Selector */}
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Number of Tickets
                  </label>
                  <input type="number"
                  min='1' max={ticket.quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg'/>
                  <p className='text-sm text-gray-600 mt-2'>
                    Available: {ticket.quantity} tickets
                  </p>
                </div>
                {/* Price Summary */}
                <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                  <div className='flex justify-between mb-2'>
                    <span className='text-gray-600'>Price per ticket:</span>
                    <span className='font-semibold'>${ticket.price}</span>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <span className='text-gray-600'>Quantity:</span>
                    <span className='font-semibold'>${quantity}</span>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <span className='text-gray-600'>Total:</span>
                    <span className='font-bold text-lg text-blue-600'>${(ticket.price * quantity).toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className='flex gap-3'>
                  <button
                  onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
                  <button
                  onClick={handleBooking}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold">
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          </div>
    );
  };

export default TicketsDetails;

