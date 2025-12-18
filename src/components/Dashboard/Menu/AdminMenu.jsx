import React from "react";
import { FaBullhorn, FaTicketAlt, FaUser } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaTicketAlt}
        label="Manage Tickets"
        address="/dashboard/manage-tickets"
      />
      <MenuItem
        icon={FaUser}
        label="Manage Users"
        address="/dashboard/manage-users"
      />
      <MenuItem
        icon={FaBullhorn}
        label="Advertise Tickets"
        address="/dashboard/advertise-tickets"
      />
    </>
  );
};

export default AdminMenu;
