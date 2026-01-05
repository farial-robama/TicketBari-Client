import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Outlet, useLocation, useNavigate, Link } from "react-router";
import Footer from "../components/Shared/Footer/Footer";
import { 
  Menu, 
  X, 
  ChevronRight,
  Home,
  LayoutDashboard,
  TrendingUp,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Moon,
  Sun
} from "lucide-react";
import { AuthContext } from "../providers/AuthContext";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use useContext to access AuthContext
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const signOutUser = authContext?.signOutUser;

  // Handle theme
  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  // Get page title from location
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard Overview";
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  // Get breadcrumb items
  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
      path: "/" + paths.slice(0, index + 1).join("/"),
      isLast: index === paths.length - 1
    }));
  };

  const handleLogout = async () => {
    try {
      if (signOutUser) {
        await signOutUser();
      }
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white border-b transition-all duration-300 ${
          scrolled ? "shadow-md" : "border-gray-200 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Left Section - Menu & Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileSidebarOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>

            {/* Logo - Always visible */}
            <div className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 transition-transform group-hover:scale-110" />
              <span className="hidden md:block text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TicketBari
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </nav>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-indigo-600" />
              )}
            </button>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.photoURL || "/default-profile.png"}
                    alt={user?.displayName || "User"}
                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user?.displayName || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{user?.displayName || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </Link>
                      

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 transition-transform duration-300
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-14
        `}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={true}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`
          flex flex-col min-h-screen 
          transition-all duration-300 ease-in-out
          pt-14
          ${isCollapsed ? "md:ml-20" : "md:ml-72"}
        `}
      >

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Scroll to Top Button */}
        {scrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40"
            aria-label="Scroll to top"
          >
            <TrendingUp size={20} />
          </button>
        )}

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;