import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to='/' className='flex items-end'>
                <img src={logo} alt="" />
                <h3 className='text-3xl font-bold -ms-2 '>ZapShit</h3>
            </Link>
        </div>
    );
};

export default Logo;