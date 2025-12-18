"use client";

import Image from "next/image";
import Link from "next/link";
import elogo from '../../../public/elogo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo and Social */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src={elogo}
                                alt="Elara International"
                                className=" w-auto transition-opacity hover:opacity-90"
                                height={80}
                                width={100}
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Pioneering global trade solutions with innovation and integrity.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-5">
                            {[
                                { icon: <FacebookIcon />, label: "Facebook" },
                                { icon: <LinkedInIcon />, label: "LinkedIn" },
                                { icon: <TwitterIcon />, label: "Twitter" },
                                { icon: <InstagramIcon />, label: "Instagram" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
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
                                        className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center"
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
                                        className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center"
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
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start">
                                <EmailIcon />
                                info@elarainternational.com
                            </li>

                            <li className="flex items-start">
                                <PhoneIcon />
                                +880 1765-580804
                            </li>

                            <li className="flex items-start">
                                <LocationIcon />
                                123 Business Avenue, Dhaka 1212, Bangladesh
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Elara International. All rights reserved.
                    </p>

                    <div className="flex space-x-6">
                        <Link href="/TermsAndConditions" className="text-gray-500 hover:text-primary text-sm">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

/* ------- ICON COMPONENTS ------- */

const FacebookIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12..." />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.447 20.452h-3.554..." />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M23.953 4.57a10 10..." />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2.163c3.204..." />
    </svg>
);

const EmailIcon = () => (
    <svg className="h-5 w-5 mr-3 mt-0.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth={2} d="M3 8l7.89 5.26..." />
    </svg>
);

const PhoneIcon = () => (
    <svg className="h-5 w-5 mr-3 mt-0.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth={2} d="M3 5a2 2..." />
    </svg>
);

const LocationIcon = () => (
    <svg className="h-5 w-5 mr-3 mt-0.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth={2} d="M17.657 16.657..." />
    </svg>
);
