import React from 'react';
import Logo from '../../../Component/Logo/logo';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {

    const { user, LogOut } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const handleLogOut = () => {
        LogOut()
            .then(() => { })
            .catch(console.log);
    };

    // 🔥 শুধু এইটুকু নতুন
    const { data: roleData } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data;
        }
    });

    const links = <>
        <li><NavLink to="">Services</NavLink></li>
        <li><NavLink to="/aboutUs">About Us</NavLink></li>
        <li><NavLink to="/sendParcel">Send Parcel</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/rider">Be A Rider</NavLink></li>
        
        {user && (
            <li>
                <NavLink to="/dashboard/my-parcels">
                    My parcels
                </NavLink>
            </li>
        )}
    </>;

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo />

                {/* 🔥 ROLE SHOW (NEW) */}
                {user && (
                    <span className="badge badge-secondary ml-5 mt-2">
                        {roleData?.role}
                    </span>
                )}
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>



            <div className="navbar-end">
                {
                    user
                        ? <button onClick={handleLogOut} className="btn">Log Out</button>
                        : <Link to="/login" className="btn">Log In</Link>
                }

                <Link to="/rider" className="btn btn-primary text-black mx-4">
                    Be A Rider
                </Link>


            </div>
        </div>
    );
};

export default Navbar;
