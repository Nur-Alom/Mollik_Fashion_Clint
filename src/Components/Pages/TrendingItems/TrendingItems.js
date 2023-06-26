import React, { useEffect, useState } from 'react';
import useCart from '../../Hooks/useCart';
import { NavLink } from 'react-router-dom';

const TrendingItems = () => {
    const { addedProduct } = useCart();
    const [items, setItems] = useState('All');
    const [products, setProducts] = useState([]);


    // Set Items Value.
    const changeItems = (value) => {
        if (value === 'All') {
            setItems('All')
        } else if (value === 'Man') {
            setItems('Man')
        } else if (value === 'Woman') {
            setItems('Woman')
        } else if (value === 'Kid') {
            setItems('Kid')
        }
        console.log(items);
    };


    // Load Products.
    useEffect(() => {
        fetch('/Products.json')
            .then(res => res.json())
            .then(data => {
                const filterProduct = data.filter(dt => dt.category.includes("clothing"));
                setProducts(filterProduct);
            })
    }, []);


    return (
        <div className='text-center px-20'>
            <h1 className='font-sans text-5xl font-bold mb-3'>Trending Items</h1>
            <p className='font-sans text-lg font-normal text-gray-400'>Fashion As Unique As You Want.</p>
            <div className='mx-auto w-fit shadow-2xl my-14 p-2 rounded-md'>
                <button value='All' onClick={(e) => changeItems(e.target.value)} className={items === 'All' ? 'bg-orange-500 px-3 py-1 mx-1 text-white font-sans font-semibold text-base' : 'px-3 py-1 mx-1 text-gray-600 font-sans font-semibold text-base'}>All</button>
                <button value='Man' onClick={(e) => changeItems(e.target.value)} className={items === 'Man' ? 'bg-orange-500 px-3 py-1 mx-1 text-white font-sans font-semibold text-base' : 'px-3 py-1 mx-1 text-gray-600 font-sans font-semibold text-base'}>Man</button>
                <button value='Woman' onClick={(e) => changeItems(e.target.value)} className={items === 'Woman' ? 'bg-orange-500 px-3 py-1 mx-1 text-white font-sans font-semibold text-base' : 'px-3 py-1 mx-1 text-gray-600 font-sans font-semibold text-base'}>Woman</button>
                <button value='Kid' onClick={(e) => changeItems(e.target.value)} className={items === 'Kid' ? 'bg-orange-500 px-3 py-1 mx-1 text-white font-sans font-semibold text-base' : 'px-3 py-1 mx-1 text-gray-600 font-sans font-semibold text-base'}>Kid</button>
            </div>
            <div className='bg-white px-20 grid grid-cols-4 gap-5'>
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

export default TrendingItems;