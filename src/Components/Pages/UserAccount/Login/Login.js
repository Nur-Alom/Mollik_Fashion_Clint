import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import googleIcon from '../Images/google-logo.svg';
import facebookIcon from '../Images/imageedit_8_5478616097.png';
import useFirebase from '../../../Hooks/useFirebase';

const Login = () => {
    const { loginUser, handleFacebookLogin, handleGoogleLogin, loading } = useFirebase();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [passView, setPassView] = useState(false);


    // Password View & Hide Function.
    const passwordView = () => {
        if (passView === true) {
            setPassView(false);
        } else {
            setPassView(true);
        };
    };


    // Email & Password Login Function.
    const onSubmit = data => {
        loginUser(data?.loginMail, data?.loginPass, location, navigate);
    }

    // Facebook Login Function.
    const FacebookLogin = () => {
        handleFacebookLogin(location, navigate)
    }

    // Google Login Function.
    const GoogleLogin = () => {
        handleGoogleLogin(location, navigate)
    }


    return (
        <div className='text-center mt-16'>
            <div className='w-1/4 mx-auto'>
                <h1 className='mb-3 font-sans font-semibold text-base text-start text-gray-800'>Welcome to <span className='text-orange-500'>Mallik Fashion!</span> Please login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("loginMail", { required: true })} className='w-full font-sans font-semibold text-gray-800 px-2 py-2 border border-gray-200 bg-gray-100 rounded outline-0 mb-4' type="email" name="loginMail" id="loginMail" autoComplete='username' placeholder='Email' />
                        <br />
                        <div className='flex justify-between items-center border border-gray-200 bg-gray-100 rounded mb-2'>
                            <input {...register("loginPass", { required: true, minLength: 6 })} className='w-full font-sans font-semibold text-gray-800 px-2 py-2 bg-gray-100 outline-0' type={passView ? "text" : "password"} name="loginPass" id="loginPass" autoComplete='current-password' placeholder='Password' />
                            <button type='button' onClick={() => passwordView()} className='me-2'>
                                {passView ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                }
                            </button>
                        </div>
                        <p className='text-end'>
                            <NavLink className="font-sans font-semibold text-sm text-sky-600 hover:underline" to="/">Forget Your Password!</NavLink>
                        </p>
                    </div>
                    <button className='w-full bg-orange-500 border border-orange-500 rounded py-2 font-sans font-semibold text-lg text-white mt-2 flex justify-center items-center' type="submit">
                        Login
                        {loading && <svg class="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                    </button>
                </form>
                <p className='font-sans font-semibold text-start text-sm mt-3'>Or, Login With</p>
                <div>
                    <button onClick={() => GoogleLogin()} className='w-full border border-red-600 rounded py-2 font-sans font-semibold text-base text-white mt-3 items-center'>
                        <img className='w-fit h-8 mx-auto py-1' src={googleIcon} alt="" />
                    </button>
                    <button className='w-full border border-blue-600 rounded py-2 font-sans font-semibold text-base text-white mt-3 items-center'>
                        <img className='w-fit h-8 mx-auto py-1' src={facebookIcon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;