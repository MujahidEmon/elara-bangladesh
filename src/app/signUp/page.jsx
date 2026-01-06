'use client';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { FaGoogle, FaImage } from 'react-icons/fa';

const page = () => {
    const handleSignUp = async(event) => {
        event.preventDefault();

        const newUser = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            // image: event.target.image.files[0],
        }
        const {data} = await axios.post('http://localhost:3000/signUp/api', newUser);

        console.log(data);
    }


    return (
        <div
            className='py-10'
        >
            <div className="flex lg:w-2/3 w-full  shadow-2xl rounded-xl lg:max-w-xl max-w-sm backdrop-blur-2xl mx-auto  font-raleway justify-center ">
                <form
                    onSubmit={handleSignUp}
                    className="max-w-lg w-full px-6 py-8 mx-auto"
                >
                    <div className="mb-6">
                        <h3 className="text-base-400 font-rancho  text-center md:text-4xl text-3xl font-bold">
                            Register
                        </h3>
                    </div>
                    <div className="">
                        <div>
                            <label className="text-base-400 font-rancho text-xl block font-bold mt-4">
                                Full Name
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full text-sm text-base-400 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-lg"

                                    placeholder="Enter Your Name"
                                // {...register("email", { required: true })}
                                />
                                <div className="w-[18px] h-[18px] absolute right-2"></div>
                            </div>
                            {/* {errors.email && (
                        <span className="text-primary text-xs font-medium">
                            Please Enter Your Email
                        </span>
                        )} */}
                        </div>
                        <div>
                            <label className="text-base-400 font-rancho text-xl block font-bold mt-4">
                                PhotoURL
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    // required
                                    className="w-full text-sm text-base-400 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-lg"

                                    placeholder="Give Your Photo URL"
                                // {...register("email", { required: true })}
                                />
                                <div className="w-[18px] h-[18px] absolute right-2"><FaImage></FaImage></div>
                            </div>
                            {/* {errors.email && (
                        <span className="text-primary text-xs font-medium">
                            Please Enter Your Email
                        </span>
                        )} */}
                        </div>
                        <div>
                            <label className="text-base-400 font-rancho text-xl block font-bold mt-4">
                                Email
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full text-sm text-base-400 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-lg"

                                    placeholder="Enter email"
                                // {...register("email", { required: true })}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2"
                                    viewBox="0 0 682.667 682.667"
                                >
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g
                                        clipPath="url(#a)"
                                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                    >
                                        <path
                                            fill="none"
                                            strokeMiterlimit="10"
                                            strokeWidth="40"
                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                            data-original="#000000"
                                        ></path>
                                        <path
                                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                            data-original="#000000"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            {/* {errors.email && (
                        <span className="text-primary text-xs font-medium">
                            Please Enter Your Email
                        </span>
                        )} */}
                        </div>

                        <div className="mt-4">
                            <label className="text-base-400 font-rancho text-xl block font-bold ">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type={"password"}
                                    required
                                    className="w-full text-sm text-base-400 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none rounded-lg"

                                    placeholder="Enter password"
                                // {...register("password", {
                                //   required: "Password is required",
                                //   minLength: {
                                //     value: 6,
                                //     message: "Password must be at least 6 characters",
                                //   },
                                //   validate: {
                                //     hasUppercase: (value) =>
                                //       /[A-Z]/.test(value) ||
                                //       "Must contain at least one uppercase letter",
                                //     hasLowercase: (value) =>
                                //       /[a-z]/.test(value) ||
                                //       "Must contain at least one lowercase letter",
                                //   },
                                // })}
                                />
                                <svg
                                    // onClick={() => setShowPass(!showPass)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 128 128"
                                >
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    ></path>
                                </svg>
                            </div>
                            {/* {errors.password && <p>{errors.password.message}</p>} */}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    // onChange={() => setAccepted(!accepted)}
                                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-1 block text-sm text-base-400"
                                >
                                    Accept Terms And Conditions
                                </label>
                            </div>
                        </div>

                        <div className="mt-6">
                            {/* <button
                            to={"/login"}
                            className="w-full font-semibold rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Login</span>
                        </button> */}
                            <div className="flex flex-col gap-4">
                                <button  className="btn disabled:text-gray-500  font-rancho bg-[#FCAB35] shadow-none border-none text-xl w-full">Register</button>

                                <div className=" flex items-center gap-4">
                                    <hr className="w-full border-gray-300" />
                                    <p className="text-sm text-base-400 text-center">or</p>
                                    <hr className="w-full border-gray-300" />
                                </div>


                            </div>

                        </div>
                    </div>


                    <div className="flex items-center justify-center">
                        <button  className="btn disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 font-rancho bg-[#FCAB35] text-lg w-full shadow-none border-none">
                            Sign In With Google<FaGoogle size={15} />
                        </button>

                    </div>
                    <p className="text-base-400 text-sm text-center mt-2">
                        Already have an account ?{" "}
                        <Link className="text-green-500 font-bold" href={"/login"}>
                            Login
                        </Link>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default page;