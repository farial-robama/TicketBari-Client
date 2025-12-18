import React, { useState } from "react";
import { MdOutlineBookOnline } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import MenuItem from "./MenuItem";

const CustomerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineBookOnline}
        label="My Booked Tickets"
        address="/dashboard/my-bookings"
      />
      <MenuItem
        icon={FaHistory}
        label="Transaction History"
        address="/dashboard/transactions"
      />

      <div className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Vendor</span>
      </div>
    </>
  );
};

export default CustomerMenu;
