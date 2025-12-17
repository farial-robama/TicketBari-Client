import React from "react";
import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
  return (
      <div className="card bg-[#F7F7F7] w-full h-96 shadow-sm p-6">
        <figure className="h-50 mb-4 rounded-md">
          <img src={ticket.image} />
        </figure>
        <div className="card-body flex flex-col p-0">
          <h2 className="card-title flex items-start">{ticket.title}</h2>
          <p className="flex items-start text-gray-500">
            Price: {ticket.price} tk (per unit)
          </p>
        </div>
        <div className="card-actions flex flex-col justify-between mt-2 mb-4">
          <p className="flex items-center gap-2">
            <img
              className="w-5"
              src="https://img.icons8.com/?size=100&id=qdQpy48X3Rjv&format=png&color=000000"
              alt=""
            />
            <span className="text-xs">{ticket.quantity}</span>
          </p>
          <p className="flex items-center gap-2">
            <img
              className="w-5"
              src="https://img.icons8.com/?size=100&id=DSWMfvLschFy&format=png&color=000000"
              alt=""
            />
            <span className="text-xs">{ticket.transportType}</span>
          </p>
        </div>

        {/* <ul className="text-sm text-gray-500 mt-2">
            {ticket.perks?.map((perk, i) => (
                <li key={i}>{perk}</li>
            ))}
        </ul> */}

        <Link to={`/ticket/${ticket._id}`}
        className="btn text-white hover:shadow-xl bg-gradient-to-tl to-[#632EE3] from-[#9F62F2] mt-3 ">See Details</Link>
      </div>
  );
};

export default TicketCard;
