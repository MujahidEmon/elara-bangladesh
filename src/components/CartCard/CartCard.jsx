"use client";

import Image from "next/image";

export default function CartCard({  }) {
  return (
    <div className="flex border-[#FCAB35] border gap-4 bg-base text-base px-4 py-6 rounded-md shadow-2xl">
      {/* Left */}
      <div className="flex gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 relative">
          <Image
            src={''}
            alt={''}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm sm:text-base font-semibold">
            dfs
          </h3>

          <span className="text-sm text-gray-400">
            Quantity: 1
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex flex-col justify-between items-end">
        <h3 className="text-sm sm:text-base font-semibold">
          447 Taka
        </h3>
      </div>
    </div>
  );
}
