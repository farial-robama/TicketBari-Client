
import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen">

      {/* Navbar */}
        <header className="hidden md:block sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <Navbar />
        </header>
        
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-72"
        }`}
      >

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;