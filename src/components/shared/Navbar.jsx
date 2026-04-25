'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultButton from "./DefaultButton/DefaultButton";
import { IoSearch } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import useLocalCart from "@/services/useLocalCart";

const Navbar = () => {

    const { cartProducts } = useLocalCart();
    const session = useSession();
    const user = session?.data?.user;
    console.log(session);
    const navItems = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "Contact Us", path: "/contact" }
    ]

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className={`navbar md:px-8 sticky top-0 z-50 transition-shadow duration-300 ease-in-out   bg-[#fffefe] ${scrolled ? "shadow-md" : ""}`}>
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/'
                                        ? 'font-semibold bg-[#FCAB35]'
                                        : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                    }`}
                                href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link
                                className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/allProducts'
                                        ? 'font-semibold bg-[#FCAB35]'
                                        : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                    }`}
                                href={'/products'}>All Products</Link>
                        </li>
                        <li>
                            <Link
                                className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/contact'
                                        ? 'font-semibold bg-[#FCAB35]'
                                        : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                    }`}
                                href={'/contact'}>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <Link href={'/'} className=" bg-transparent border-0 ml-0 pl-0 md:pl-auto md:text-2xl text-black font-semibold"><span className="text-[#FCAB35]">Elara</span> Bangladesh</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul
                    className="menu menu-horizontal px-1"
                >
                    <li>
                        <Link
                            className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/'
                                    ? 'font-semibold bg-[#FCAB35]'
                                    : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                }`}
                            href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link
                            className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/products'
                                    ? 'font-semibold bg-[#FCAB35]'
                                    : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                }`}
                            href={'/products'}>All Products</Link>
                    </li>
                    <li>
                        <Link
                            className={`text-black px-4 py-2 transition duration-300 relative
                                    ${usePathname() === '/contact'
                                    ? 'font-semibold bg-[#FCAB35]'
                                    : 'hover:text-[#FCAB35] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FCAB35] after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                }`}
                            href={'/contact'}>Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <p className="font-semibold">{user?.name}</p>
                <button className="mr-3 btn btn-circle bg-white border-none"><IoSearch size={25}></IoSearch></button>
                <div className="dropdown dropdown-end">
                    <div>
                    </div>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="badge badge-sm bg-accent rounded-sm indicator-item">{cartProducts.length}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg text-[#FCAB35] font-bold">{cartProducts.length} Items</span>
                            <span className="text-[#FCAB35]">Subtotal: BDT {120}</span>
                            <div className="card-actions">
                                <Link href={'/cart'} className="btn border-[#FCAB35] text-[#FCAB35] btn-outline">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    //         user ?
                    //             <div className="dropdown dropdown-end">
                    //                 <div
                    //                     tabIndex={0}
                    //                     role="button"
                    //                     className="btn btn-ghost ml-4 btn-circle avatar"
                    //                 >
                    //                     <div className="w-10 rounded-full">
                    //                         <Image
                    //                             alt="Tailwind CSS Navbar component"
                    //                             href={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //                 <ul
                    //                     tabIndex={0}
                    //                     className="menu menu-sm dropdown-content bg-base-200 rounded-sm z-1 mt-3 w-36 p-2 shadow"
                    //                 >
                    //                     {/* <li>  
                    //   <a className="justify-between">
                    //     Profile
                    //     <span className="badge">New</span>
                    //   </a>
                    // </li>
                    // <li>
                    //   <a>Settings</a>
                    // </li> */}
                    //                     {/* <h1 className="font-semibold lg:flex hidden mr-3">{user?.displayName}</h1> */}
                    //                     <li>
                    //                         {user ? <button className="text-black text-base font-semibold px-2 py-2  transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300" >Logout</button> : <Link href={'/login'}>Login</Link>}
                    //                     </li>
                    //                 </ul>
                    //             </div>

                    //             :
                    user ? <button className="btn " onClick={() => signOut()}>Logout</button> :
                        <DefaultButton text="Login" href="login"></DefaultButton>

                }

            </div>
        </div>
    );
};

export default Navbar;
