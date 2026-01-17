
import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const dropdownRef = useRef(null);

  // Initialize theme from memory state instead of localStorage
  useEffect(() => {
    const storedTheme = "light"; // Default theme
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  const navLinkClass = ({ isActive }) =>
    `px-4 lg:px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-gray-700 hover:text-primary hover:bg-gray-100"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You logged out successfully!");
      setIsOpen(false);
    } catch (err) {
      console.log("Logout failed!", err);
      toast.error("Logout failed!");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 z-50 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="py-3 lg:py-4">
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/logo.png" 
                className="w-8 lg:w-10 transition-transform group-hover:scale-110" 
                alt="TicketBari Logo"
              />
              <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TicketBari
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/tickets" className={navLinkClass}>
                All Tickets
              </NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle - Desktop */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-500 text-lg" />
                ) : (
                  <FaMoon className="text-gray-700 text-lg" />
                )}
              </button>

              {/* User Menu Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 lg:gap-3 p-2 lg:p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800"
                  aria-label="User menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <AiOutlineClose className="text-gray-700 dark:text-gray-300 text-xl" />
                  ) : (
                    <AiOutlineMenu className="text-gray-700 dark:text-gray-300 text-xl" />
                  )}
                  <img
                    className="rounded-full w-7 h-7 lg:w-8 lg:h-8 object-cover border-2 border-gray-200 dark:border-gray-600"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "/placeholder.jpg"}
                    alt="User avatar"
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Mobile Navigation Links */}
                    <div className="md:hidden border-b border-gray-200 dark:border-gray-700">
                      <Link
                        to="/"
                        onClick={closeMenu}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                      >
                        🏠 Home
                      </Link>
                      <Link
                        to="/tickets"
                        onClick={closeMenu}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                      >
                        🎫 All Tickets
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                      >
                        📊 Dashboard
                      </Link>
                      <Link
                        to="/about"
                        onClick={closeMenu}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                      >
                        ℹ️ About
                      </Link>
                      <Link
                        to="/contact"
                        onClick={closeMenu}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                      >
                        📧 Contact
                      </Link>
                    </div>

                    {/* User Menu Items */}
                    <div className="py-2">
                      {user ? (
                        <>
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {user.displayName || "User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                          </div>

                          <Link
                            to="/profile"
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                          >
                            👤 My Profile
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium text-red-600 dark:text-red-400"
                          >
                            🚪 Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={closeMenu}
                            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                          >
                            🔑 Login
                          </Link>
                          <Link
                            to="/signup"
                            onClick={closeMenu}
                            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-primary"
                          >
                            ✨ Sign Up
                          </Link>
                        </>
                      )}

                      {/* Theme Toggle - Mobile */}
                      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={toggleTheme}
                          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                        >
                          <span>Theme</span>
                          <div className="flex items-center gap-2">
                            {theme === "dark" ? (
                              <>
                                <FaSun className="text-yellow-500" />
                                <span className="text-sm">Light</span>
                              </>
                            ) : (
                              <>
                                <FaMoon className="text-gray-700" />
                                <span className="text-sm">Dark</span>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;