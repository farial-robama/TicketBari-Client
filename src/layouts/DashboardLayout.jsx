
import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Outlet, useLocation, Link } from "react-router";
import Footer from "../components/Shared/Footer/Footer";
import { Menu, X, Home, LayoutDashboard, ArrowUp, User, ChevronRight } from "lucide-react";
import useAuth from "../hooks/useAuth";

// Convert pathname to readable breadcrumb
const getBreadcrumb = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "));
};

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const breadcrumbs = getBreadcrumb(location.pathname);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sidebar and user menu on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileSidebarOpen]);

  const closeSidebar = useCallback(() => setIsMobileSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md border-b border-gray-200/60 dark:border-gray-700/60"
            : "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          {/* Left: hamburger + logo + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen((p) => !p)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsCollapsed((p) => !p)}
              className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Collapse sidebar"
            >
              <Menu size={20} />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 transition-transform group-hover:scale-110" />
              <span className="hidden md:block text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TicketBari
              </span>
            </Link>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-2">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronRight size={14} />}
                  <span className={i === breadcrumbs.length - 1 ? "text-gray-800 dark:text-gray-200 font-medium" : ""}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: quick nav + user menu */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((p) => !p)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  {user.photoURL && !imgError ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      onError={() => setImgError(true)}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-200 dark:border-gray-600">
                      {getInitials(user.displayName)}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium max-w-[100px] truncate pr-1">
                    {user.displayName || "User"}
                  </span>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-11 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50"
                      style={{ animation: "dropdownIn 0.15s ease-out" }}
                    >
                      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-sm truncate">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <User size={16} /> My Profile
                      </Link>
                      <Link to="/dashboard" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar wrapper */}
      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-50 transition-transform duration-300 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onClose={closeSidebar}
        />
      </div>

      {/* Main content */}
      <div className={`flex flex-col min-h-screen pt-14 transition-all duration-300 ${
        isCollapsed ? "md:ml-20" : "md:ml-72"
      }`}>
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Scroll to top */}
        {scrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Footer />
        </footer> */}
      </div>

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;