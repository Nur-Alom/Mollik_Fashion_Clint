import React from 'react';
import Header from '../Header/Header';
import headPhoneLogo from '../../Images/headphones.png';
import { NavLink, Outlet } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <div className='bg-black'>
                <div className='flex justify-between items-center font-sans font-semibold px-14 py-2'>
                    <small className='flex items-center text-gray-300'>
                        <img className='w-4 me-2' src={headPhoneLogo} alt="" /> <p>We are available 24/7, Need help? Call Us: <a className='tel hover:text-orange-500' href="tel:+8801234567890">+8801234567890</a></p>
                    </small>
                    <div className='text-gray-300'>
                        <small><NavLink className="hover:text-orange-500" to="/">About Us</NavLink></small>
                        <span> | </span>
                        <small><NavLink className="hover:text-orange-500" to="/">Contact Us</NavLink></small>
                        <span> | </span>
                        <small><NavLink className="hover:text-orange-500" to="/">Terms & Conditions</NavLink></small>
                        <span> | </span>
                        <small><NavLink className="hover:text-orange-500" to="/">Privacy Policy</NavLink></small>
                    </div>
                </div>
            </div>
            <Header />
            <Outlet />
        </div>
    );
};

export default LandingPage;