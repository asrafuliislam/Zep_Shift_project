import React from 'react';
import Logo from '../../Component/Logo/logo';
import AuthImage from '../../assets/authImage.png'
import { Outlet } from 'react-router';
const AuthLayOut = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={AuthImage} alt="" />
                </div>
            </div>

        </div>
    );
};

export default AuthLayOut;