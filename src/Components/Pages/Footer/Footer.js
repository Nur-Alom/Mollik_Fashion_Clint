import React from 'react';
import logo from './Images/imageedit_4_6309655512.png';
import socialIcon1 from './Images/Vector (1).svg';
import socialIcon2 from './Images/Vector (2).svg';
import socialIcon3 from './Images/Vector (3).svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-gray-800 px-20 mt-20 py-12'>
            <div className='text-gray-300 text-center grid grid-cols-4 gap-12'>
                <div className='text-start'>
                    <img className='w-3/5 h-auto mb-4' src={logo} alt="" />
                    <span>
                        <p>Rupatoli housing 8200, Barishal Sadar, Barishal Division, Barishal. Bangladesh.</p>
                    </span>
                    <ul className='flex gap-4 pt-4'>
                        <li>
                            <a target='blank_' href="https://www.facebook.com/mollikfashionltd">
                                <img src={socialIcon1} alt="" />
                            </a>
                        </li>
                        <li>
                            <a target='blank_' href="https://www.facebook.com/mollikfashionltd">
                                <img src={socialIcon2} alt="" />
                            </a>
                        </li>
                        <li>
                            <a target='blank_' href="https://www.facebook.com/mollikfashionltd">
                                <img src={socialIcon3} alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='text-start'>
                    <h1 className='font-sans font-semibold text-xl text-white'>Information</h1>
                    <hr className='mb-4' />
                    <ul>
                        <li><NavLink to="/">About Us</NavLink></li>
                        <li><NavLink to="/">Return & Refound</NavLink></li>
                        <li><NavLink to="/">Privacy Policy</NavLink></li>
                    </ul>
                </div>
                <div className='text-start'>
                    <h1 className='font-sans font-semibold text-xl text-white'>Customer Services</h1>
                    <hr className='mb-4' />
                    <ul>
                        <li><NavLink to="/">Payment Methods</NavLink></li>
                        <li><NavLink to="/">Shipping</NavLink></li>
                    </ul>
                </div>
                <div className='text-start'>
                    <h1 className='font-sans font-semibold text-xl text-white'>Contact Us</h1>
                    <hr className='mb-4' />
                    <ul>
                        <li>
                            Hot Line:
                            <a className='font-sans font-bold' href="tel:+880123456789"> +880123456789</a>
                        </li>
                        <li>
                            Email:
                            <a className='font-sans font-bold' href="mailto:mollikfashionltd@gmail.com"> mollikfashionltd@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;