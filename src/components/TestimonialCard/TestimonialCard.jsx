'use client';
import Image from 'next/image';
import React from 'react';

const TestimonialCard = ({ name, image, rating = 5, text }) => {
    return (
        <div className="max-w-sm border  bg-amber-600 relative rounded-md p-4 lg:p-8 [box-shadow:0_2px_22px_-4px_rgba(93,96,127,0.2)]">

            {/* Quote Icon */}
            <div className="bg-[#ff0000] flex items-center justify-center w-12 h-12 rounded-full absolute -top-5 -right-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-white"
                    viewBox="0 0 475.082 475.081"
                >
                    <path d="M164.454 36.547H54.818C24.588 36.547 0 61.135 0 91.365v109.632c0 30.23 24.588 54.814 54.818 54.814h63.953c15.15 0 27.408 12.262 27.408 27.411v9.131c0 40.363-32.728 73.084-73.086 73.084H54.818c-10.09 0-18.27 8.18-18.27 18.273v36.549c0 10.094 8.18 18.274 18.27 18.274h18.271c90.98 0 164.454-73.475 164.454-164.456V91.361c0-30.226-24.588-54.814-54.818-54.814z" />
                </svg>
            </div>

            {/* User */}
            <div className="flex items-center">
                <Image
                    src={image}
                    alt={name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                />


                <div className="ml-4">
                    <h6 className="text-[15px] font-semibold">{name}</h6>

                    {/* Stars */}
                    <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-3.5 h-3.5 ${i < rating ? "fill-[#ff0000]" : "fill-[#CED5D8]"
                                    }`}
                                viewBox="0 0 14 13"
                            >
                                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>

            {/* Text */}
            <p className="mt-6 text-[15px] text-slate-700 leading-relaxed">
                {text}
            </p>
        </div>
    );
};

export default TestimonialCard;