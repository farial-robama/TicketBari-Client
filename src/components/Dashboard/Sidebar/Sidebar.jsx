
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { NavLink } from "react-router";
import CustomerMenu from "../Menu/CustomerMenu";
import VendorMenu from "../Menu/VendorMenu";
import AdminMenu from "../Menu/AdminMenu";
import MenuItem from "../Menu/MenuItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Ticket } from "lucide-react";

const getInitials = (name) =>
  name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

const Sidebar = ({ isCollapsed, setIsCollapsed, onClose }) => {
  const { logOut, user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed!");
    }
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div
      className={`relative flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Collapse toggle — desktop only */}
      <button
        onClick={() => setIsCollapsed?.((p) => !p)}
        className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* User Profile */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 ${
            isCollapsed ? "px-3 py-4" : "px-5 py-4"
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
              {getInitials(user.displayName)}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium capitalize">
                  {role}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        {role === "customer" && <CustomerMenu isCollapsed={isCollapsed} />}
        {role === "vendor" && <VendorMenu isCollapsed={isCollapsed} />}
        {role === "admin" && <AdminMenu isCollapsed={isCollapsed} />}
      </nav>

      {/* Quick Links - Mobile Only */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 px-3 py-3 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-400 dark:text-gray-500 px-3 mb-2 uppercase tracking-wider font-medium">
          Quick Links
        </p>
        <NavLink
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-sm font-medium"
        >
          <Home className="w-5 h-5 shrink-0" />
          <span>Go to Home</span>
        </NavLink>
        <NavLink
          to="/tickets"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-sm font-medium"
        >
          <Ticket className="w-5 h-5 shrink-0" />
          <span>All Tickets</span>
        </NavLink>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-3 space-y-1 bg-gray-50 dark:bg-gray-800/50">
        <MenuItem
          icon={FcSettings}
          label="Profile"
          address="/dashboard/profile"
          isCollapsed={isCollapsed}
        />
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center w-full px-3 py-2.5 gap-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <GrLogout className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>

      {/* Version */}
      {!isCollapsed && (
        <div className="px-5 py-2.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-400 text-center">TicketBari v1.0</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;