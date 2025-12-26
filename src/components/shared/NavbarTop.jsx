import React from 'react';

const NavbarTop = () => {
    return (
        <div className='bg-[#fcab35]'>
            <form className="max-w-2xl mx-auto">
                <div className="flex  rounded-base -space-x-0.5">
                    <label
                        htmlFor="search-dropdown"
                        className="block mb-2.5 text-sm font-medium text-heading sr-only"
                    >
                        Search
                    </label>

                    {/* Dropdown Button */}
                    <button
                        id="dropdown-button"
                        data-dropdown-toggle="dropdown"
                        type="button"
                        className="inline-flex items-center shrink-0 z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-4 py-2.5 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                            />
                        </svg>

                        All categories

                        <svg
                            className="w-4 h-4 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        id="dropdown"
                        className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
                    >
                        <ul
                            className="p-2 text-sm text-body font-medium"
                            aria-labelledby="dropdown-button"
                        >
                            {["Shopping", "Images", "News", "Finance"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Search Input */}
                    <input
                        type="search"
                        id="search-dropdown"
                        className="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
                        placeholder="Search for products"
                        required
                    />

                    {/* Search Button */}
                    <button
                        type="button"
                        className="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        Search
                    </button>
                </div>
            </form>

        </div>
    );
};

export default NavbarTop;