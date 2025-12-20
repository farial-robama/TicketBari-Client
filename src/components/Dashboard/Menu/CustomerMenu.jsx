import React, { useState } from "react";
import { MdOutlineBookOnline } from "react-icons/md";
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

    </>
  );
};

export default CustomerMenu;
