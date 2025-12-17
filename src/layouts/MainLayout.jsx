import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
      <Navbar />
      <div className='flex-grow px-4 md:px-10 py-10 mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
    );
};

export default MainLayout;