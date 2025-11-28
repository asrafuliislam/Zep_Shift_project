import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Pages/SharedLayout/Navbar/Navbar';
import Footer from '../../Pages/SharedLayout/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='min-h-screen bg-gray-100 max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;