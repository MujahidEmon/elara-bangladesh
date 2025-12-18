'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { _id, name, price, image } = product;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full md:w-[260px]"
    >
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {name}
        </h2>

        <p className="text-[#FCAB35] font-bold text-xl">
          ৳ {price}
        </p>

        <Link href={`/product/${_id}`}>
          <button className="mt-2 w-full btn btn-outline border-[#FCAB35] text-[#FCAB35] hover:bg-[#FCAB35] hover:text-white">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
