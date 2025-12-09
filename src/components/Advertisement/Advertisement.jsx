import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TicketCard from '../TicketCard/TicketCard';
import { motion } from "framer-motion";

const Advertisement = () => {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const loadAdvertisedTickets = async () => {
            try {
           const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/advertised-home`) 
           setTickets(res.data);
        } catch (error) {
            console.error("Error loading advertised tickets:",error)
        }
        }
        loadAdvertisedTickets();
    }, [])
    return (
        <div className="text-center py-10 px-6">
      <h1 className="font-bold text-2xl">Advertisement Section</h1>
      <p className="text-sm text-[#627382] mt-2 mb-6">
        Explore popular tickets on market provided by us.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate("/games")}
        className="btn btn-active bg-linear-to-br from-[#7A85C1] to-[#9F62F2] text-white mt-7 px-5"
      >
        See details
      </button>
    </div>
    );
};

export default Advertisement;

