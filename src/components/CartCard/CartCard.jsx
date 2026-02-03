"use client";

import useLocalCart from "@/services/useLocalCart";
import Image from "next/image";
import { use } from "react";

export default function CartCard({ product }) {
  const { handleIncreaseLs, handleDecreaseLs, handleDeleteFromLs } = useLocalCart();
  const { _id, productName, price, quantity, image } = product;
  return (
    <div className="flex border-[#FCAB35] border gap-4 bg-base text-base px-4 py-6 rounded-md shadow-xl">
      {/* Left */}
      <div className="flex gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 relative">
          <Image
            src={image}
            alt={productName}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-semibold">
            {productName}
          </h3>

          <span className="text-sm text-gray-400">
            Quantity: {quantity}
          </span>
          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={() => handleDecreaseLs(_id)}
              type="button"
              className="flex items-center justify-center w-5 h-5 bg-[#FCAB35] cursor-pointer outline-none rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2 fill-white"
                viewBox="0 0 124 124"
              >
                <path
                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
            <span className="font-semibold text-sm leading-[18px]">{product.quantity}</span>
            <button
              onClick={() => handleIncreaseLs(_id)}
              type="button"
              className="flex items-center justify-center w-5 h-5 bg-[#FCAB35] cursor-pointer outline-none rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2 fill-white"
                viewBox="0 0 42 42"
              >
                <path
                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
          </div>


        </div>

      </div>

      {/* Right */}
      <div className="ml-auto flex flex-col justify-between items-end">
        {/* Remove from Cart Button */}
        <button onClick={() => handleDeleteFromLs(product)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 cursor-pointer fill-[#FCAB35] hover:fill-red-600 inline-block"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            ></path>
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            ></path>
          </svg>
        </button> 
        <h3 className="text-sm sm:text-base font-semibold">
          {price} Taka
        </h3>
      </div>

    </div>
  );
}
