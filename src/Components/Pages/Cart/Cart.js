import React, { useEffect, useState } from 'react';
import useCart from '../../Hooks/useCart';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { products, subTotal, removeProduct, addedProduct } = useCart();


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


    // Load User Info on DB.
    // useEffect(() => {
    //     fetch(`https://daily-bazar-clint.onrender.com/api/users?email=${user.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             data[0].cart = cartProduct;
    //             data[0].subTotal = subTotal;
    //             data[0].shippingCoast = shippingCoast ? shippingCoast : 60;
    //             data[0].discount = discount;
    //             data[0].grandTotal = grandTotal;
    //             setAllInfo(data[0]);
    //             setInfoLoading(false);
    //         })
    // }, [user, infoLoading]);


    // Per Product Total Price.
    let productTotal = 0;


    return (
        <div className='bg-slate-100'>
            <div className='px-20 py-8'>
                <div className='bg-white rounded-lg px-6 py-4'>
                    <h1 className='font-sans font-semibold text-2xl text-gray-800 mb-4'>Shopping Cart</h1>
                    {loading ?
                        <div className='text-center py-16'>
                            <svg className="mx-auto h-8 w-8 animate-spin text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        :
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-sm font-semibold tracking-wide text-gray-500 uppercase bg-slate-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td className="px-3 py-3 border border-y-0 border-s-0 border-e-2 border-white">Image</td>
                                    <td className="px-3 py-3 border border-y-0 border-s-0 border-e-2 border-white">Product Name</td>
                                    <td className="px-3 py-3 border border-y-0 border-s-0 border-e-2 border-white">Quantity</td>
                                    <td className="px-3 py-3 border border-y-0 border-s-0 border-e-2 border-white">Unit Price</td>
                                    <td className="px-3 py-3 border border-y-0 border-s-0 border-e-2 border-white">Total</td>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                {
                                    cartProduct.map(ctp => <tr className='hover:bg-gray-50 font-sans' key={ctp._id}>
                                        <td className="px-3 py-3">
                                            <img className='w-14 h-14' src={ctp.images[0]} alt="" />
                                        </td>
                                        <td className="px-3 py-3 font-semibold text-gray-800 text-sm">
                                            {ctp.title}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className='bg-white border border-gray-200 flex justify-between items-center rounded'>
                                                <button className='pe-5 ps-3 py-2' title='remove' onClick={() => removeProduct(ctp._id)}>
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                </button>
                                                <span>{ctp.quantity}</span>
                                                <button className='ps-5 pe-3 py-2' title='Add' onClick={() => addedProduct(ctp._id)}>
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 font-bold">
                                            {ctp.price.toFixed(2)}<span className='font-extrabold'>৳</span>
                                        </td>
                                        <td className="px-3 py-3 text-red-600 font-bold">
                                            {productTotal = (ctp.quantity * ctp.price).toFixed(2)}<span className='font-extrabold'>৳</span>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                    <div className='font-sans font-bold border border-x-0 border-b-0 border-gray-100 py-4 text-end text-gray-800 px-10'>
                        <h1 className='text-2xl'>Total Amount: <span className='text-red-600'>{subTotal.toFixed(2)}<span className='font-extrabold'>৳</span></span></h1>
                    </div>
                    <div className='mt-12 mb-6 flex justify-between items-center'>
                        <button className="font-sans font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded" onClick={() => window.history.back()}>Continue Shopping</button>
                        <NavLink className="font-sans font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded" to="/cart/checkout">Confirm Order</NavLink>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;