import React, { useEffect, useState } from 'react';
import paymentLogo from '../../Images/card-logo.png';
import { useForm } from 'react-hook-form';
import useCart from '../../Hooks/useCart';
import Footer from '../Footer/Footer';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const [cartProduct, setCartProduct] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { products, subTotal } = useCart();

    // Set Cart Product.
    useEffect(() => {
        setLoading(true)
        if (products.length) {
            const cartData = localStorage.getItem("cart")
            const data = JSON.parse(cartData)
            const productArray = [];
            for (const key in data) {
                const product = products.find(pd => pd._id === parseInt(key))
                if (product) {
                    const dataQuantity = data[key];
                    product.quantity = dataQuantity
                    productArray.push(product)
                }
            }
            setCartProduct(productArray)
            setLoading(false)
        }
        window.scrollTo(0, 0);
    }, [products]);


    // Customer Information Collection Function.
    const onSubmit = data => {
        console.log(data);
    }


    // Per Product Total Price.
    let productTotal = 0;

    return (
        <div className='bg-slate-100 font-sans'>
            <div className='px-20 py-8'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Checkout</h1>
                <div className='flex items-start gap-6'>
                    <div className='w-2/6 bg-white p-5 rounded-md'>
                        <h1 className='font-semibold text-xl text-gray-800 border border-x-0 border-t-0 border-gray-300 pb-3 mb-2'><span className='bg-orange-200 px-3 py-1 mr-2 rounded-full text-red-600'>1</span> Customer Information</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="#fullName">
                                <p className='font-semibold text-base text-gray-800 mb-2'>Full Name.</p>
                                <input {...register("fullName", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' type="text" name='fullName' id='fullName' placeholder='NAME' />
                            </label>
                            <label htmlFor="#address">
                                <p className='font-semibold text-base text-gray-800 mb-2'>Full Address.</p>
                                <textarea {...register("address", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' name="address" id="address" cols="30" rows="1" placeholder='Full Address'></textarea>
                            </label>
                            <label htmlFor="#contact">
                                <p className='font-semibold text-base text-gray-800 mb-2'>Contact Number.</p>
                                <input {...register("contact", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' type="number" name='contact' id='contact' placeholder='Contact' />
                            </label>
                            <label htmlFor="#email">
                                <p className='font-semibold text-base text-gray-800 mb-2'>Email.</p>
                                <input {...register("email", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' type="email" name='email' id='email' placeholder='Email' />
                            </label>
                            <div className='flex items-center gap-4'>
                                <label className='w-full' htmlFor="#city">
                                    <p className='font-semibold text-base text-gray-800 mb-2'>City.</p>
                                    <input {...register("city", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' type="text" name='city' id='city' placeholder='City' />
                                </label>
                                <label className='w-full' htmlFor="#area">
                                    <p className='font-semibold text-base text-gray-800 mb-2'>Area.</p>
                                    <input {...register("area", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' type="text" name='area' id='area' placeholder='Area' />
                                </label>
                            </div>
                            <label htmlFor="#comment">
                                <p className='font-semibold text-base text-gray-800 mb-2'>Comment.</p>
                                <textarea {...register("comment", { required: true })} className='w-full border border-gray-300 focus:border-gray-500 outline-0 rounded px-3 py-2 mb-4 font-sans font-normal text-gray-800' name="comment" id="comment" cols="30" rows="3" placeholder='Comment'></textarea>
                            </label>
                            {/* <button type="submit">Submit</button> */}
                        </form>
                    </div>
                    <div className='w-4/6'>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='bg-white p-5 rounded-md'>
                                <h1 className='font-semibold text-xl text-gray-800 border border-x-0 border-t-0 border-gray-300 pb-3 mb-2'><span className='bg-orange-200 px-3 py-1 mr-2 rounded-full text-red-600'>2</span> Payment Method.</h1>
                                <p className='mb-3 font-sans text-base'>Select a Payment Method</p>
                                <div className='flex justify-start items-center gap-2'>
                                    <ul>
                                        <li><input type="radio" name="payment_method" id="cod" /></li>
                                        <li><input type="radio" name="payment_method" id="pwb" /></li>
                                    </ul>
                                    <ul>
                                        <li className='font-sans font-medium text-base text-gray-800'>Cash On Delivery</li>
                                        <li className='font-sans font-medium text-base text-gray-800'>Pay With Bkash</li>
                                    </ul>
                                </div>
                                <p className='my-4 font-sans font-semibold text-base text-gray-700'>We Accept: <span className='text-red-600'>Coming Soon...</span></p>
                                <img src={paymentLogo} alt="" />
                            </div>
                            <div className='bg-white p-5 rounded-md'>
                                <h1 className='font-semibold text-xl text-gray-800 border border-x-0 border-t-0 border-gray-300 pb-3 mb-2'><span className='bg-orange-200 px-3 py-1 mr-2 rounded-full text-red-600'>3</span> Delivery Method.</h1>
                                <p className='mb-3 font-sans text-base'>Select a Delivery Method</p>
                                <div className='flex justify-start items-center gap-2'>
                                    <ul>
                                        <li><input type="radio" name="delivery_method" id="home" /></li>
                                        <li><input type="radio" name="delivery_method" id="express" /></li>
                                    </ul>
                                    <ul>
                                        <li className='font-sans font-medium text-base text-gray-800'>Home Delivery- 60<span className='font-extrabold'>৳</span></li>
                                        <li className='font-sans font-medium text-base text-gray-800'>Express Delivery- Charge Applicable</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-5 rounded-md my-6'>
                            <div className='flex items-center'>
                                <input className='w-full px-3 py-2 border border-e-0 border-gray-300 focus:border-orange-600 font-sans font-normal outline-0 rounded-s ' type="text" placeholder='Promo / Coupon Code' />
                                <button className='px-10 py-2 border border-s-0 border-orange-500 hover:border-orange-600 bg-orange-500 hover:bg-orange-600 font-sans font-semibold text-white rounded-e' type="submit">Apply</button>
                            </div>
                        </div>
                        <div className='bg-white p-5 rounded-md'>
                            <h1 className='font-semibold text-xl text-gray-800 border border-x-0 border-t-0 border-gray-300 pb-3 mb-2'><span className='bg-orange-200 px-3 py-1 mr-2 rounded-full text-red-600'>4</span> Order Overview.</h1>
                            <div>
                                {loading ?
                                    <div className='text-center py-16'>
                                        <svg className="mx-auto h-8 w-8 animate-spin text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                    :
                                    <div>
                                        <table className="w-full whitespace-no-wrap">
                                            <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase bg-slate-100 dark:text-gray-400 dark:bg-gray-800">
                                                <tr>
                                                    <td className="px-3 py-2 border border-y-0 border-s-0 border-e-2 border-white">Image</td>
                                                    <td className="px-3 py-2 border border-y-0 border-s-0 border-e-2 border-white">Product Name</td>
                                                    <td className="px-3 py-2 border border-y-0 border-s-0 border-e-2 border-white">Price</td>
                                                    <td className="px-3 py-2 border border-y-0 border-s-0 border-e-2 border-white">Total</td>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                {
                                                    cartProduct.map(ctp => <tr className='hover:bg-gray-50 font-sans' key={ctp._id}>
                                                        <td className="px-3 py-3">
                                                            <img className='w-12 h-12 mx-auto' src={ctp.images[0]} alt="" />
                                                        </td>
                                                        <td className="w-3/6 px-3 py-3 font-semibold text-gray-800 text-sm">
                                                            {ctp.title}
                                                        </td>
                                                        <td className="px-3 py-3 font-bold">
                                                            {ctp.price.toFixed(2)}<span className='font-extrabold'>৳</span> x {ctp.quantity}
                                                        </td>
                                                        <td className="px-3 py-3 text-red-600 font-bold">
                                                            {productTotal = (ctp.quantity * ctp.price).toFixed(2)}<span className='font-extrabold'>৳</span>
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                        <div className='px-3'>
                                            <h1 className='w-full text-end border border-x-0 border-b-0 border-gray-100 font-sans font-medium text-lg py-3 px-3'>Sub-Total: <span className='text-red-600'>
                                                {subTotal.toFixed(2)}
                                                <span className='font-extrabold'>৳</span></span>
                                            </h1>
                                            <h1 className='w-full text-end border border-x-0 border-b-0 border-gray-100 font-sans font-medium text-lg py-3 px-3'>Shipping Coast: <span className='text-red-600'>
                                                {discount.toFixed(2)}
                                                <span className='font-extrabold'>৳</span></span>
                                            </h1>
                                            <h1 className='w-full text-end border border-x-0 border-b-0 border-gray-100 font-sans font-medium text-lg py-3 px-3'>Discount: <span className='text-red-600'>
                                                {coupon.toFixed(2)}
                                                <span className='font-extrabold'>৳</span></span>
                                            </h1>
                                        </div>
                                    </div>
                                }
                                <div className='font-sans font-bold border border-x-0 border-b-0 border-gray-100 py-4 text-end text-gray-800 px-3'>
                                    <h1 className='text-xl'>Total Payable Amount: <span className='text-red-600 px-3'>{subTotal.toFixed(2)}<span className='font-extrabold'>৳</span></span></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center font-sans py-7 mt-5 border-2 border-x-0 border-b-0 border-gray-200'>
                    <span>
                        <input className='cursor-pointer' required type="checkbox" name="agree-with-condition" id="agree-with-condition" />
                        <span className='font-medium text-base text-gray-800 ml-4'>I have read and agree to the <span className='text-orange-500 hover:underline cursor-pointer'>Terms and Conditions</span>, <span className='text-orange-500 hover:underline cursor-pointer'>Privacy Policy</span> and <span className='text-orange-500 hover:underline cursor-pointer'>Refund and Return Policy</span></span>
                    </span>
                    <button className='font-semibold text-white bg-orange-500 hover:bg-orange-600 border border-orange-500 hover:border-orange-600 px-4 py-1 rounded'>Confirm Order</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;