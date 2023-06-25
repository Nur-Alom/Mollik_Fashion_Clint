import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import Search from './Images/search.svg';
import Profile from './Images/Vector (1).svg';
import useCart from '../../Hooks/useCart';
import useFirebase from '../../Hooks/useFirebase';
import defaultUser from '../../Images/user.jpg';
import brandLogo from '../../Images/favicon.jpg';

const Header = () => {
    const { cartLength, cartProduct, subTotal, removeItem, addedProduct, removeProduct } = useCart();
    const { logout, user } = useFirebase();
    const [dropdown, setDropdown] = useState(false);
    const [menu, setMenu] = useState(false);



    // Set Dropdown.
    const setDrop = () => {
        if (dropdown === true) {
            setDropdown(false);
        } else {
            setDropdown(true);
        };
    };


    // Open or Close Cart Canvas.
    const openCart = () => {
        if (menu === true) {
            setMenu(false);
        } else {
            setMenu(true);
        };
    };

    // Per Product Total Price.
    let productTotal = 0;

    return (
        <div className='bg-white sticky top-0'>
            <Drawer
                open={menu}
                direction='right'
                enableOverlay={true}
                lockBackgroundScroll={true}
                size='30vw'
            >
                <div className='overflow-y-auto scroll-smooth h-screen'>
                    <div className='bg-slate-200 flex justify-between items-center px-4 py-3 fixed top-0 w-full'>
                        <div className='flex justify-between items-center font-sans font-bold text-2xl'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 264l-89.6 112-38.4-44.88"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"></path>
                            </svg>
                            <h1 className='mx-2'>Shopping Cart</h1>
                        </div>
                        <button className='font-sans font-semibold text-base border border-gray-300 bg-gray-300 p-2 rounded-full' onClick={() => setMenu(false)}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='my-14'>
                        {!cartProduct.length ?
                            <div className="bg-white font-sans text-center items-center p-8">
                                <div className="bg-gray-300 w-fit mx-auto p-10 rounded-full">
                                    <svg className='mx-auto w-14 h-14' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                                    </svg>
                                </div>
                                <h2 className='font-bold text-2xl text-gray-800 mt-2'>Your cart is empty</h2>
                                <p className='text-base text-gray-500'>No items added in your cart. Please add product to your cart list.</p>
                            </div>
                            :
                            <div className=''>
                                {
                                    cartProduct.map(ctp => <div className='flex font-sans items-center p-2 border border-x-0 border-t-0 border-gray-200 hover:bg-gray-100' key={ctp._id}>
                                        <img className='w-20 h-20' src={ctp?.images[0]} alt="" />
                                        <div className='w-full ms-3'>
                                            <div>
                                                <NavLink title={ctp.title} className="font-bold text-lg text-gray-800" onClick={openCart} to={`/product/${ctp.title}`}>
                                                    {ctp.title.slice(0, 25)}
                                                </NavLink>
                                                <p className='m-0 text-base text-gray-500'>Par Item: {ctp.price.toFixed(2)}<span className='font-extrabold'>৳</span></p>
                                            </div>
                                            <div className='flex justify-between items-center mt-2'>
                                                <strong>{productTotal = (ctp.quantity * ctp.price).toFixed(2)}<span className='font-extrabold'>৳</span></strong>
                                                <div className='bg-white border border-gray-200 flex items-center rounded'>
                                                    <button className='pe-5 ps-3 py-2' title='remove' onClick={() => removeProduct(ctp._id)}>
                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                    </button>
                                                    <span>{ctp.quantity}</span>
                                                    <button className='ps-5 pe-3 py-2' title='Add' onClick={() => addedProduct(ctp._id)}>
                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className='hover:text-red-700' title='Delete' onClick={() => removeItem(ctp._id)} to="">
                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        }
                    </div>
                    {cartProduct.length ?
                        <NavLink onClick={() => setMenu(false)} to="/cart/viewProduct" className="flex justify-between items-center bg-orange-500 text-white font-sans font-semibold fixed bottom-0 py-3 px-3 w-full hover:bg-orange-600">
                            <p>Proceed To Checkout</p>
                            <span className='bg-white px-3 py-1 text-orange-500 rounded-md'>{subTotal.toFixed(2)}<span className='font-extrabold'>৳</span></span>
                        </NavLink>
                        :
                        <button disabled className="flex justify-between items-center bg-orange-500 text-white font-sans font-semibold fixed bottom-0 py-3 px-3 w-full">
                            <p>Proceed To Checkout</p>
                            <span className='bg-white px-3 py-1 text-orange-500 rounded-md'>{subTotal.toFixed(2)}<span className='font-extrabold'>৳</span></span>
                        </button>
                    }
                </div>
            </Drawer>
            <div className='flex items-center px-20 py-2 border border-b border-x-0 border-t-0 border-gray-300 gap-6'>
                <div>
                    <NavLink className='flex items-center' to="/">
                        <img className='w-10 me-2' src={brandLogo} alt="" />
                        <h5>MOLLIK FASHION</h5>
                    </NavLink>
                </div>
                <div className='bg-orange-500 w-3/5 mx-2 flex items-center'>
                    <button type='submit' className='bg-orange-500 px-3'>
                        <img className='w-6 h-6' src={Search} alt="" />
                    </button>
                    <input className='w-full bg-gray-200 font-sans font-semibold px-2 py-2 outline-0' type="search" name="search" id="" placeholder='Search...' />
                </div>
                <div className={user.email ? 'flex items-end gap-4 ms-auto' : 'flex items-center gap-4 ms-auto'}>
                    <button onClick={() => openCart()} className="px-4 relative text-white text-2xl font-bold" title='Cart'>
                        <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">{cartLength === 0 ? 0 : cartLength}</span>
                        <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 drop-shadow-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {/* <img src={Cart} alt="" /> */}
                        {/* <span className="header-cart-amount">{cartLength === 0 ? 0 : cartLength}</span> */}
                    </button>
                    {user.email ?
                        <li title='User Options' className="relative inline-block text-left">
                            <button onClick={setDrop} className="rounded-full dark:bg-gray-500 bg-white text-white h-8 w-8 font-medium mx-auto focus:outline-none">
                                <div className="relative rounded-full inline-block w-8 h-8 align-middle" aria-hidden="true">
                                    <img
                                        className="object-cover w-8 h-8 rounded-full"
                                        src={user?.photoURL ? `data:image/*;base64,${user?.photoURL}` : defaultUser} loading="eager" alt=''
                                    />
                                </div>
                            </button>
                            <ul className={dropdown ? "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" : "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden"}>
                                <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                    <NavLink to="/">
                                        <span className="flex items-center text-sm">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                            </svg>
                                            <span className='text-sm font-bold font-sans'>Dashboard</span>
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                    <NavLink to="/">
                                        <span className="flex items-center text-sm">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z">
                                            </path>
                                            </svg>
                                            <span className='text-sm font-bold font-sans'>Edit Profile</span>
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                    <button className='w-full' onClick={() => logout()}>
                                        <span className="flex items-center text-sm">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256">
                                                </path>
                                            </svg>
                                            <span className='text-sm font-bold font-sans'>Log out</span>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                        :
                        <NavLink className="px-4" title='Login Or Register?' to="user/login">
                            <img src={Profile} alt="" />
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;