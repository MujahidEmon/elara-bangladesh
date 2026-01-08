'use client';
import React from 'react';
import { FaFacebookSquare, FaPhone } from 'react-icons/fa';
import { IoMailOutline } from "react-icons/io5";


const page = () => {
    return (
        <div
        style={{
                backgroundImage: 'url("https://i.ibb.co.com/mCGK4RHP/elara-wallpaper.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'

            }} 
        className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8  text-white">
            <div className="max-w-4xl mx-auto backdrop-blur-2xl shadow-2xl md:p-12 p-6 rounded-xl">
                {/* Main Heading - Exact match to image */}
                <h1 className="text-3xl font-bold text-left mb-8 text-[#FCAB35] underline">Contact Us</h1>

                <div className="flex flex-col-reverse md:flex-row gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="w-full md:w-1/2 space-y-6">
                        {/* Contact Information */}
                        <div className="space-y-3">
                            <p className="text-lg md:text-xl font-semibold text-white flex flex-row items-center gap-2"><IoMailOutline color="#FCAB35"></IoMailOutline> contact.elaraint@gmail.com</p>
                            <p className="text-lg md:text-xl font-semibold text-white flex flex-row items-center gap-2"><FaPhone color="#FCAB35"></FaPhone> +880 1765-580804</p>
                            <p className="text-lg md:text-xl font-semibold text-white flex flex-row items-center gap-2"><FaPhone color="#FCAB35"></FaPhone> +880 1609-121133</p>
                            <a href="https://www.facebook.com/elarainternational" target="blank" className="text-lg md:text-xl font-semibold text-white flex flex-row items-center gap-2"><FaFacebookSquare color="#FCAB35"></FaFacebookSquare> Elara Int Facebook</a>
                        </div>

                        {/* Information Text - Bottom left as per image */}
                        <div className="mt-8 space-y-1">
                            <h2 className="text-lg font-bold text-white">INFORMATION ABOUT US</h2>

                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="h-full w-px bg-gray-300 mx-6"></div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-lg font-bold text-[#FCAB35]  mb-8">CONTACT US FOR ANY QUESTIONS</h2>
                        <form className="space-y-4" >
                            {/* Name and Email row */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 text-gray-100">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="w-full  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 text-gray-100">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block mb-1 text-gray-100">Subject Name</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block mb-1 text-gray-100">Your Message</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    className="w-full  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                ></textarea>
                            </div>

                            {/* Submit Button - Blue from image */}
                            <button className="w-full bg-[#FCAB35] hover:bg-[#fc6735] text-white font-medium py-2 px-4 rounded transition-colors">
                                SEND YOUR MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;