import React, { useEffect, useState } from 'react';
import './Home.css';
import icon1 from './Images/Vector (2).svg';
import icon2 from './Images/Vector (3).svg';
import icon3 from './Images/Vector (4).svg';
import banner3 from './Images/imageedit_1_6625049767.png';
import TrendingItems from '../TrendingItems/TrendingItems';
import NewCollection from '../NewCollection/NewCollection';
import NewsLetter from '../NewsLetter/NewsLetter';
import Footer from '../Footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [categories, setCategories] = useState([]);


    // Load Products.
    useEffect(() => {
        fetch('/Category.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);


    return (
        <div>
            <div className='px-20'>
                <div className='w-full bg-cover bg-no-repeat py-60' style={{ backgroundImage: `url(${require('./Images/banner1.jpg')})` }}>
                    <div className='pl-12'>
                        <h2 className='font-mono text-4xl font-semibold text-white leading-normal'>Mollik Fashion House!!</h2>
                        <p className='font-mono text-xl font-medium text-white leading-normal'>Product Are Available in Store & Online All Time.</p>
                        <button className='px-3 py-1 mt-6 text-white hover:bg-green-500 font-bold font-sans rounded-md border border-white hover:border-green-500 duration-300'>SHOP NOW</button>
                    </div>
                </div>
                <div className='flex justify-between items-center my-28 gap-12'>
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
                {/* <div className='w-3/5 my-20 mx-auto'>
                    <Swiper
                        breakpoints={{
                            480: {
                                width: 480,
                                slidesPerView: '2'
                            },
                            768: {
                                width: 768,
                                slidesPerView: '3'
                            },
                            1279: {
                                width: 1279,
                                slidesPerView: '3'
                            }
                        }}
                        slidesPerView={3}
                        spaceBetween={50}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="my-swiper"
                    >
                        {
                            categories.map(category => <SwiperSlide className='swiper-main' key={category.id}>
                                <NavLink to={`/${category.parent}`} className="bg-gray-100 flex items-center rounded-md shadow-lg">
                                    <div className='bg-white rounded-s-md'>
                                        <img className='swiper-img rounded-s-md' src={category.icon} alt="" />
                                    </div>
                                    <h1 className='ms-4 font-sans font-semibold text-base'>{category.parent}</h1>
                                </NavLink>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div> */}
            </div>
            <TrendingItems />
            <div className='px-20 my-28 bg-gray-100'>
                <div className='w-full bg-contain bg-no-repeat pt-40 pb-28' style={{ backgroundImage: `url(${require('./Images/banner2.jpg')})` }}>
                    <div className='grid grid-cols-2 gap-52'>
                        <div></div>
                        <div>
                            <h1 className='font-sans text-4xl font-bold text-gray-700 pb-2'>The Best Dress Of 2023</h1>
                            <p className='font-sans font-normal text-lg text-gray-700 pb-2'>We Give Best Product And at a Special Price.</p>
                            <span>
                                <button className='font-sans font-semibold text-base bg-red-500 text-white px-4 py-2 mt-6 rounded-md'>Shop Now</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <NewCollection />
            <div className='px-20 my-32 bg-gray-100'>
                <div className='grid grid-cols-2 items-center gap-10 px-16'>
                    <img className='w-auto h-auto -mt-48 bg-inherit mx-auto' src={banner3} alt="" />
                    <div className='ps-6'>
                        <h1 className='font-sans text-4xl font-bold text-gray-700 pb-2'>Exclusive Offer</h1>
                        <p className='font-sans font-normal text-lg text-gray-700 pb-2'>Some Product Buy 20% Off </p>
                        <span>
                            <button className='font-sans font-semibold text-base bg-red-500 text-white px-4 py-2 mt-6 rounded-md'>Get Offer</button>
                        </span>
                    </div>
                </div>
            </div>
            <NewsLetter />
            <Footer />
        </div>
    );
};

export default Home;