"use client";

import Image from "next/image";
import Link from "next/link";
import elogo from '../../../public/elogoBlack.png';
import { IoMailSharp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLocationArrow, FaPhone, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#fcab35] mt-12 pt-16 pb-8 px-4 sm:px-6 lg:px-8  border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo and Social */}
                    <div className="space-y-2">
                        <Link href="/" className="inline-block">
                            <Image
                                src={elogo}
                                alt="Elara International"
                                className=" w-auto transition-opacity hover:opacity-90"
                                height={200}
                                width={200}
                            />
                        </Link>
                        <p className="text-black font-bold uppercase text-sm leading-relaxed">
                            Where Excellence Meets Commitment
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-5">
                            <FaFacebookF size={20} color="white"></FaFacebookF>
                            <FaInstagram size={20} color="white"></FaInstagram>
                            <FaTiktok size={20} color="white"></FaTiktok>
                            <FaYoutube size={20} color="white"></FaYoutube>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Products", path: "/allProducts" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.path}
                                        className="text-black hover:text-primary text-sm transition-colors duration-300 flex items-center"
                                    >
                                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                            Information
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", path: "/about" },
                                { name: "Terms & Conditions", path: "/TermsAndConditions" },
                                { name: "Shipping Policy", path: "/shipping" },
                                { name: "Return Policy", path: "/returns" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.path}
                                        className="text-black hover:text-primary text-sm transition-colors duration-300 flex items-center"
                                    >
                                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-black text-sm">
                            <li className="flex items-center gap-1">
                                <IoMailSharp />
                                info@elarainternational.com
                            </li>

                            <li className="flex items-center gap-1">
                                <FaPhone></FaPhone>
                                +880 1765-580804
                            </li>

                            <li className="flex items-center gap-1">
                                <FaLocationArrow></FaLocationArrow>
                                123 Business Avenue, Dhaka 1212, Bangladesh
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white font-semibold text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Elara International. All rights reserved.
                    </p>

                    <div className="flex space-x-6">
                        <Link href="/TermsAndConditions" className="text-white font-semibold hover:text-primary text-sm">
                            Developed By Mujahid Emon
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

