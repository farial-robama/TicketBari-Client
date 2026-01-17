import React from "react";
import { FaChartLine, FaClipboardList } from "react-icons/fa";
import { MdAddCircleOutline, MdConfirmationNumber, MdDashboard } from "react-icons/md";
import MenuItem from "./MenuItem";

const VendorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdDashboard}
        label="Dashboard Overview"
        address="/dashboard"
      />

      <MenuItem
        icon={MdAddCircleOutline}
        label="Add Ticket"
        address="/dashboard/add-tickets"
      />
      <MenuItem
        icon={MdConfirmationNumber}
        label="My Added Ticket"
        address="/dashboard/my-tickets"
      />
      <MenuItem
        icon={FaClipboardList}
        label="Requested Bookings"
        address="/dashboard/requested-bookings"
      />
      <MenuItem
        icon={FaChartLine}
        label="Revenue Overview"
        address="/dashboard/revenue"
      />
    </>
  );
};

export default VendorMenu;
