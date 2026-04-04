import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="h-20"></div> 
      <div className='flex-grow px-4 md:px-10 mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
    );
};

export default MainLayout;