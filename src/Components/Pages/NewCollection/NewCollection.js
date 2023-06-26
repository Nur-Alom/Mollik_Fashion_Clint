import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const NewCollection = () => {
    const { addedProduct } = useCart();
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('/Products.json')
            .then(res => res.json())
            .then(data => {
                const filterProduct = data.filter(dt => dt.category.includes("women's clothing"));
                setProducts(filterProduct);
            });
    }, []);


    return (
        <div className='px-20'>
            <div>
                <h1 className='font-sans font-bold text-4xl text-gray-800'>New Collections</h1>
                <hr className='my-5' />
            </div>
            <div className='bg-white px-20 pt-12 pb-16 grid grid-cols-4 gap-5'>
                {
                    products.map(product => <div key={product._id} className='shadow-2xl bg-white rounded-lg'>
                        <NavLink to={`/product/${product._id}`}>
                            <div className=''>
                                <img className='w-52 h-60 mx-auto p-5' src={product.images[0]} alt="" />
                            </div>
                            <div className='pt-4 px-5 text-left'>
                                <h1 title={product.title} className='font-sans font-semibold text-base'>{product.title.slice(0, 20)}...</h1>
                                <p className='pb-2 font-sans font-semibold text-sm text-gray-500'>{product.description.slice(0, 15)}</p>
                                <span className='font-sans font-semibold text-sm text-center text-red-600'>Price: {product.price}</span>
                            </div>
                        </NavLink>
                        <div className='py-4 px-5 grid grid-cols-2 gap-2'>
                            <button onClick={() => addedProduct(product._id)} className='bg-gray-600 text-white font-semibold font-sans text-sm px-1 py-1 rounded'>Add To Cart</button>
                            <button className='bg-orange-600 text-white font-semibold font-sans text-sm px-1 py-1 rounded'>Buy Now</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default NewCollection;