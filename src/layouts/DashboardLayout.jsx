import React from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen md:flex">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="hidden md:block mb-20">
          <Navbar></Navbar>
        </header>
        <main className="flex-1 px-8 py-4">
          {/* Outlet*/}
          <Outlet />
        </main>
        <footer className="mt-6">
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
