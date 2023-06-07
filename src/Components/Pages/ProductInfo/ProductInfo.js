import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whitelistFill from '../../Images/heart-fill.svg';
import whitelistBlank from '../../Images/heart-blank.svg';
import socialIcon1 from '../Footer/Images/Vector (1).svg';
import socialIcon2 from '../Footer/Images/Vector (2).svg';
import socialIcon3 from '../Footer/Images/Vector (3).svg';
import icon1 from '../Home/Images/Vector (4).svg';
import icon2 from '../Home/Images/Vector (4).svg';
import icon3 from '../Home/Images/Vector (4).svg';
import Footer from '../Footer/Footer';
import NewsLetter from '../NewsLetter/NewsLetter';
import useCart from '../../Hooks/useCart';

const ProductInfo = () => {
    const { addedNewQuantity } = useCart();
    const [products, setProducts] = useState({});
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [newQuantity, setNewQuantity] = useState(1);
    const { id } = useParams();

    const { title, description, price, rating, category } = products;

    useEffect(() => {
        fetch('/Products.json')
            .then(res => res.json())
            .then(data => {
                const filterProduct = data.filter(dt => dt._id === parseInt(id));
                setProducts(filterProduct[0]);
                setImages(filterProduct[0].images);
                // console.log(filterProduct[0].images);
            });
        window.scrollTo(0, 0);
    }, [id]);


    // Handle Cart Quantity Minus.
    const handleMinusQuantity = () => {
        if (newQuantity !== 1) {
            const updateQuantity = newQuantity - 1;
            setNewQuantity(updateQuantity);
        };
    };


    // Handle Cart Quantity Plus.
    const handlePlusQuantity = () => {
        // if (newQuantity === 5) {
        //     const updateQuantity = 5;
        //     setNewQuantity(updateQuantity);
        // } else {
        //     const updateQuantity = newQuantity + 1;
        //     setNewQuantity(updateQuantity);
        // }
        const updateQuantity = newQuantity + 1;
        setNewQuantity(updateQuantity);
    };


    return (
        <div className='bg-slate-100'>
            <div className='px-20 py-20'>
                <div className='grid grid-cols-2'>
                    <div className=''>
                        <img className='w-96 h-96 mx-auto' src={image ? image : images[0]} alt="" />
                        <div className='mt-4 w-96 mx-auto grid grid-cols-4'>
                            {
                                images?.map(image => <button className='w-fit' onClick={() => setImage(image)}>
                                    <img className='w-20 h-16' src={image} alt="" />
                                </button>)
                            }
                        </div>
                    </div>
                    <div className='border border-b border-x-0 border-t-0 border-gray-400'>
                        <h1 className='font-sans font-bold text-4xl text-gray-800 mb-4'>{title}</h1>
                        <p className='font-sans font-semibold text-lg text-red-600'>Price: ${price}</p>
                        <ul className='my-7'>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>XS</button>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>S</button>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>M</button>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>L</button>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>XL</button>
                            <button className='font-sans font-bold text-xs border border-orange-400 px-2 py-1 me-2'>XXL</button>
                        </ul>
                        <p className='font-sans font-bold text-gray-800 mb-3'>Availability :-<span className='font-semibold text-gray-500'> 50 4000 item(s) in stock!</span></p>
                        <p className='font-sans font-bold text-gray-800'>Estimated delivery :-<span className='font-semibold text-gray-500'> Sunday, 28 May - Monday, 05 June</span></p>
                        <button title='Add To Whitelist' className='my-4'>
                            {<img className='bg-slate-100' src={whitelistBlank} alt="" />}
                        </button>
                        <div className='w-fit flex justify-between items-center border border-gray-400 rounded'>
                            <button onClick={() => handleMinusQuantity()} className='text-gray-500 hover:text-gray-900 text-base px-4 py-2 items-center'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <input value={newQuantity} className='font-sans font-normal w-10 text-center outline-0 px-1 bg-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" name="Quantity" id="" />
                            <button onClick={() => handlePlusQuantity()} className='text-gray-500 hover:text-gray-900 text-base px-4 py-2 items-center'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                        <div className='my-6'>
                            <button onClick={() => addedNewQuantity(id, newQuantity)} className='font-sans font-semibold text-base text-gray-600 hover:text-gray-100 border border-gray-500 hover:border-gray-600 hover:bg-gray-600 px-4 py-2 me-5 rounded'>Add To Cart</button>
                            <button className='font-sans font-semibold text-base text-white border border-orange-500 hover:border-orange-700 bg-orange-500 hover:bg-orange-700 px-4 py-2 me-5 rounded'>Buy Now</button>
                        </div>
                        <div className='flex items-center my-8 gap-4'>
                            <img src={socialIcon1} alt="" />
                            <img src={socialIcon2} alt="" />
                            <img src={socialIcon3} alt="" />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h1 className='font-sans font-semibold text-lg text-gray-800 mb-4'>Description</h1>
                        <strong className='font-sans text-base text-gray-800 mb-5'>Jeans Pant 2323-IJP.</strong>
                        <p className='font-sans font-semibold text-base text-gray-800 my-2'>Fabric:- <span className='font-sans font-normal text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur</span></p>
                        <p className='font-sans font-semibold text-base text-gray-800 my-2'>Origin:- <span className='font-sans font-normal text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur</span></p>
                        <p className='font-sans font-semibold text-base text-gray-800 my-2'>Size:- <span className='font-sans font-normal text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur</span></p>
                        <strong>Delivery Status:-</strong>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam repudiandae debitis modi voluptatibus unde, natus similique totam eum minus aliquam ipsum, veritatis veniam esse quidem animi, pariatur corporis consequuntur!</p>
                    </div>
                    <div className='mt-10'>
                        <h1 className='font-sans font-semibold text-lg text-gray-800 mb-2 pb-2 border border-b border-x-0 border-t-0 border-gray-500'>Buyer Rating</h1>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-28 mb-20 gap-12'>
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

export default ProductInfo;