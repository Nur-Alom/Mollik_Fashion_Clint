import React, { useEffect, useState } from 'react';
import icon1 from '../Home/Images/Vector (2).svg';
import icon2 from '../Home/Images/Vector (3).svg';
import icon3 from '../Home/Images/Vector (4).svg';
import Search from '../Header/Images/Group 65.svg';
import Footer from '../Footer/Footer';
import NewsLetter from '../NewsLetter/NewsLetter';
import { NavLink } from 'react-router-dom';

const Pant = () => {
    const [pants, setPants] = useState([]);

    // Load Pants Products.
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                const filterPants = data.filter(dt => dt.category.includes("women's clothing"));
                setPants(filterPants);
            });
        window.scroll(0, 0);
    }, []);


    return (
        <div className=''>
            <div className='text-center px-20 bg-slate-50 mb-20'>
                <div className='w-full bg-cover bg-no-repeat py-20 mb-32' style={{ backgroundImage: `url(${require('../../Images/pant-banner.jpg')})` }}>
                    <h1 className='font-sans font-bold text-5xl text-white'>PANT</h1>
                </div>
                <div className='flex gap-6'>
                    <div className='bg-white w-1/5 h-fit p-4 rounded-md shadow-lg text-start'>
                        <div>
                            <h2 className='font-sans font-semibold text-md text-gray-800'>FILTERS</h2>
                            <hr />
                            <div className='px-2 mt-2 flex items-center border border-gray-400 rounded'>
                                <button>
                                    <img src={Search} alt="" />
                                </button>
                                <input className='w-full pl-2 py-1 rounded-full outline-0 font-sans font-semibold text-base text-gray-800' type="search" name="pantSearch" id="" placeholder='Search Products' />
                            </div>
                        </div>
                        <hr className='my-4' />
                        <ul className='flex justify-between items-center font-sans font-normal text-lg text-gray-800'>
                            <ul>
                                <li>Man</li>
                                <li>Woman</li>
                                <li>Kid</li>
                            </ul>
                            <ul>
                                <li><input type="checkbox" name="Man" id="" /></li>
                                <li><input type="checkbox" name="Woman" id="" /></li>
                                <li><input type="checkbox" name="Kid" id="" /></li>
                            </ul>
                        </ul>
                        <span>Showing { } OF { } Results</span>
                    </div>
                    <div className='w-4/5 grid grid-cols-4 gap-5'>
                        {
                            pants.map(pant => <div key={pant.id} className='shadow-2xl bg-white rounded-lg'>
                                <NavLink to={`/product/${pant.id}`}>
                                    <div className=''>
                                        <img className='w-52 h-60 mx-auto p-5' src={pant.image} alt="" />
                                    </div>
                                    <div className='pt-4 px-5 text-left'>
                                        <h1 title={pant.title} className='font-sans font-semibold text-base'>{pant.title.slice(0, 15)}...</h1>
                                        <p className='pb-2 font-sans font-semibold text-sm text-gray-500'>{pant.description.slice(0, 15)}</p>
                                        <span className='font-sans font-semibold text-sm text-center text-red-600'>Price: {pant.price}</span>
                                    </div>
                                </NavLink>
                                <div className='py-4 px-5 grid grid-cols-2 gap-2'>
                                    <button className='bg-gray-600 text-white font-semibold font-sans text-sm px-1 py-1 rounded'>Add To Cart</button>
                                    <button className='bg-orange-600 text-white font-semibold font-sans text-sm px-1 py-1 rounded'>Buy Now</button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className='flex justify-between items-center my-28 gap-12 pb-32 text-start'>
                    <div className='flex justify-between items-center shadow-2xl rounded-md px-4 py-2 gap-8'>
                        <img src={icon1} alt="" />
                        <div className=''>
                            <h1 className='font-sans font-semibold text-lg'>HOME DELIVERY</h1>
                            <p className='font-sans text-sm'>Your Precious Package IsExpedited And Insured.</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center shadow-2xl rounded-md px-4 py-2 gap-8'>
                        <img src={icon2} alt="" />
                        <div className=''>
                            <h1 className='font-sans font-semibold text-lg'>SECURE PAYMENT</h1>
                            <p className='font-sans text-sm'>Your Payment Information Is
                                Encryption.</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center shadow-2xl rounded-md px-4 py-2 gap-8'>
                        <img src={icon3} alt="" />
                        <div className=''>
                            <h1 className='font-sans font-semibold text-lg'>24/7 SUPPORT</h1>
                            <p className='font-sans text-sm'>Our Support Team Are Ready 24/7 to Answer Your Question</p>
                        </div>
                    </div>
                </div>
            </div>
            <NewsLetter />
            <Footer />
        </div>
    );
};

export default Pant;