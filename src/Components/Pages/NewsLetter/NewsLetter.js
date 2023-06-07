import React from 'react';

const NewsLetter = () => {
    return (
        <div className='px-20 pb-14'>
            <div className='text-center'>
                <h1 className='font-sans font-bold text-4xl text-gray-800'>News Letter</h1>
                <p className='font-sans font-semibold text-lg text-gray-500 mt-3'>Subscribe Our News Letter To Get special Offer</p>
                <div>
                    <input className='w-2/4 bg-gray-200 font-sans font-bold text-base text-gray-800 ps-4 py-3 rounded-s-md outline-0' type="email" name="NewsLetterMail" id="" placeholder='Enter Your Email' />
                    <button className='font-sans font-semibold text-base bg-red-500 text-white px-8 py-3 mt-6 rounded-e-md outline-0'>SUBSCRIBE</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;