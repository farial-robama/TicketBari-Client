import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { motion } from "framer-motion";
import { useParams } from 'react-router';

const TicketsDetails = () => {
    const { id } = useParams();
    const ticketId = id;
    const [ticket, setTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");

   useEffect(() => {
          axios.get(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`) 
             .then(res => setTicket(res.data));     
      }, []);

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
      }, [ticket]);

      const handleBooking = async () => {
        if (quantity > ticket.quantity) {
            alert("Quantity exceeds available tickets!")
            return;
        }
        const booking = {
            ticketId: ticket._id,
            quantity,
            status: "Pending",
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/booking`, booking);
        toast("Booking submitted (Pending)!");
        setShowModal(false)
      }

      if(!ticket) return <LoadingSpinner></LoadingSpinner>

      const isDeparturePassed = new Date(ticket.departure) < new Date();
      const isOutOfStock = ticket.quantity === 0;
  
    return (
        <div>
      <motion.div
        className="card md:w-96 shadow-lg mx-auto bg-[#AAC4F5] border-2 border-[#cfc6b6]
        text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
      >
        <div className="card-body">
          {/* <span className="badge badge-xs white-outline bg-[#ECF4E8] text-gray-800">
            See Details!
          </span> */}
          <div className="flex justify-between items-center border-b border-dashed border-gray-500 pb-3">
            <h2 className=" text-2xl md:text-3xl font-bold">{ticket.title}</h2>
            <span className="text-3xl md:text-4xl">From: ${ticket.from}</span>
            <span className="text-3xl md:text-4xl">To: ${ticket.to}</span>
          </div>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Departure</h1>
            <p className="text-xs text-gray-600">{ticket.departure}</p>
          </div>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Available</h1>
            <p className="text-xs text-gray-600">{ticket.quantity}</p>
          </div>
          <h3>Countdown: {countdown}</h3>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Date</h1>
            <p className="flex items-center gap-3">
              <FaCalendarDay></FaCalendarDay>
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>

          <button
            disabled={isDeparturePassed || isOutOfStock}
            onClick={() => setShowModal(true)}
            className="btn btn-active btn-accent bg-[#00D390] md:w-[150px] w-full text-xs text-white p-2 border-0"
          >
            {isDeparturePassed || isOutOfStock ? "Booked" : "Book Now"}
          </button>

          {/* <div className="card-actions justify-end pt-3.5">
            <div
              onClick={() => navigate("/transaction/my")}
              className="badge white-outline bg-[#c9dcc0] text-gray-800 cursor-pointer"
            >
              Back
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="badge white-outline bg-[#c9dcc0] text-gray-800 cursor-pointer"
            >
              Update
            </div>
            <div
              onClick={() => handleDelete(transaction._id)}
              className="badge white-outline bg-[#c9dcc0] text-gray-800 cursor-pointer"
            >
              Delete
            </div>
          </div> */}
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
           <h2>Book Tiket</h2>
           <input
           type='number'
           min='1'
           max={ticket.quantity}
           value={quantity}
           onChange={(e) => setQuantity(Number(e.target.value))}
           className='border p-2'
           />
            <div className="flex gap-3 justify-end mt-3">
              <button
                type="submit"
                className="btn btn-active bg-[#C2E2FA] text-[#39505a] cursor-pointer"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-active bg-[#C2E2FA] text-[#39505a] cursor-pointer"
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default TicketsDetails;

