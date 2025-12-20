
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { AiOutlineBars } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { NavLink } from "react-router";
import CustomerMenu from "../Menu/CustomerMenu";
import VendorMenu from "../Menu/VendorMenu";
import AdminMenu from "../Menu/AdminMenu";
import { GrLogout } from "react-icons/gr";
import MenuItem from "../Menu/MenuItem";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Ticket, ChevronRight, ChevronLeft } from "lucide-react";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, isRoleLoading] = useRole();
  
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You logged out successfully!");
    } catch (err) {
      console.log("Logout failed!", err);
    }
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 flex justify-between items-center md:hidden sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={handleMobileToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <AiOutlineBars className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-7 h-7" alt="" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TicketBari
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4">
          <NavLink
            to="/"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home className="h-5 w-5 text-gray-600" />
          </NavLink>
          <NavLink
            to="/tickets"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Ticket className="h-5 w-5 text-gray-600" />
          </NavLink>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMobileToggle}
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl transition-all duration-300 md:w-72 w-72 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div>
                <h1 className="font-bold text-xl text-gray-800">TicketBari</h1>
                <p className="text-xs text-gray-500">Travel Made Easy</p>
              </div>
            </motion.div>
            
            {/* Close button for mobile only */}
            <button
              onClick={handleMobileToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
           
          </div>
        </div>

        {/* User Profile */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-4 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.displayName?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="mt-1">
                  <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium capitalize">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {role === "customer" && <CustomerMenu />}
          {role === "vendor" && <VendorMenu />}
          {role === "admin" && <AdminMenu />}
        </nav>

       
        <div className="border-t border-gray-200 px-4 py-4 space-y-2 bg-gray-50">
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 gap-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
          >
            <GrLogout className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            TicketBari v1.0
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;



