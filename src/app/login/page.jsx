"use client";
import Link from 'next/link';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    // const [showPass, setShowPass] = useState(false);

    const router = useRouter()
    const session = useSession();
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = signIn('credentials', {
            email, password, redirect: false
        });
        console.log(response);
    }


    //google login
    const handleGoogleLogin =  () => {
        const response =  signIn('google', { redirect: false });
    }


    //redirecting user after login
    if(session?.status === 'authenticated'){
        router.push('/')
    }

    

    return (
        <div
            className='py-10'
        >
            <div

                className="flex lg:w-2/3 w-full  shadow-2xl rounded-xl lg:max-w-xl max-w-sm backdrop-blur-2xl mx-auto  font-raleway justify-center">
                <form className="max-w-lg w-full px-6 py-8 mx-auto"
                    onSubmit={handleLogin}
                >
                    <div className="mb-6">
                        <h3 className="text-base-400 font-rancho text-center text-4xl font-bold">
                            Login
                        </h3>
                    </div>

                    <div className=''>
                        <label className="text-base-400 font-rancho text-2xl block font-bold mt-4">
                            Email
                        </label>
                        <div className="relative flex items-center">
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full text-sm text-base-400 rounded-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-base-400 font-rancho text-2xl block font-bold">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="w-full text-sm text-base-400 rounded-lg border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                placeholder="Enter password"
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
                                ></path>
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-1 block text-sm text-base-400">
                                Remember Me
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        {/* {loading ? <button disabled={loading} className="btn shadow-none font-rancho bg-[#FCAB35] text-xl w-full"><HashLoader size={15} color='#FCAB35'></HashLoader></button> : <button className="btn font-rancho bg-[#FCAB35] text-xl w-full shadow-none border-none">Login</button>} */}
                        <button className="btn font-rancho bg-[#FCAB35] text-xl text-white w-full shadow-none border-none">Login</button>



                        <div className=" flex items-center gap-4">
                            <hr className="w-full border-gray-300" />
                            <p className="text-sm text-base-400 text-center">or</p>
                            <hr className="w-full border-gray-300" />
                        </div>


                        <div className="flex items-center justify-center">
                            <button onClick={handleGoogleLogin} className="btn text-white font-rancho bg-[#FCAB35] text-lg w-full shadow-none border-none">
                                Sign In With Google<FaGoogle size={15} color='white' />
                            </button>

                        </div>
                        <p className="text-base-400 text-sm text-center mt-2">
                            Don&apos;t have an account?{" "}
                            <Link className="text-green-500 font-bold" href={"/signUp"}>
                                Register
                            </Link>
                        </p>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Page;
