import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { NAV_LINKS } from "./navLinks";


const getInitials = (name) =>
  name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      closeMenu();
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="py-3 lg:py-4">
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img
                src="/logo.png"
                className="w-8 lg:w-10 transition-transform duration-200 group-hover:scale-110"
                alt="TicketBari Logo"
              />
              <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TicketBari
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1" role="menubar">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} className={navLinkClass} role="menuitem">
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-2 lg:gap-3 p-2 lg:p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 bg-white dark:bg-gray-800"
                  aria-label="User menu"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {isOpen ? (
                    <AiOutlineClose className="text-gray-700 dark:text-gray-300 text-xl" />
                  ) : (
                    <AiOutlineMenu className="text-gray-700 dark:text-gray-300 text-xl" />
                  )}

                  {/* Avatar with initials fallback */}
                  {user?.photoURL && !imgError ? (
                    <img
                      className="rounded-full w-7 h-7 lg:w-8 lg:h-8 object-cover border-2 border-gray-200 dark:border-gray-600"
                      referrerPolicy="no-referrer"
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="rounded-full w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-200 dark:border-gray-600">
                      {user ? getInitials(user.displayName) : "?"}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    style={{ animation: "dropdownIn 0.15s ease-out" }}
                  >
                    {/* Mobile nav links */}
                    <div className="md:hidden border-b border-gray-200 dark:border-gray-700">
                      {NAV_LINKS.map(({ to, label, emoji }) => (
                        <Link
                          key={to}
                          to={to}
                          onClick={closeMenu}
                          role="menuitem"
                          className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 text-sm"
                        >
                          {emoji} {label}
                        </Link>
                      ))}
                    </div>

                    <div className="py-2">
                      {user ? (
                        <>
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
                            role="menuitem"
                            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 text-sm"
                          >
                            👤 My Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            role="menuitem"
                            className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium text-red-600 dark:text-red-400 text-sm"
                          >
                            🚪 Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={closeMenu}
                            role="menuitem"
                            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 text-sm"
                          >
                            🔑 Login
                          </Link>
                          <Link
                            to="/signup"
                            onClick={closeMenu}
                            role="menuitem"
                            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-primary text-sm"
                          >
                            ✨ Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;