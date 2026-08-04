"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import useLocalCart from "@/services/useLocalCart";
import { useCartAnimation } from "../cart/CartAnimationProvider";

const NewProductCard = ({ product }) => {
  const {
    image,
    productName,
    price,
    _id,
  } = product;

  const { handleAddToCart } = useLocalCart();
  const { openCartSlider } = useCartAnimation();

  const handleAdd = (event) => {
    // Prevent parent/card navigation
    event.preventDefault();
    event.stopPropagation();

    handleAddToCart(product);
    openCartSlider();
  };

  return (
    <div
      className="
        relative
        max-w-2xs
        overflow-hidden
        rounded-lg
        border
        border-gray-200
        bg-white
        shadow-[#ffdca3]
        transition-all
        hover:shadow-lg
      "
    >
      {/* Product Link */}
      <Link
        href={`/products/${_id}`}
        className="block"
      >
        <div>
          <div
            className="
              mx-auto
              aspect-square
              overflow-hidden
              bg-gray-50
              text-center
            "
          >
            <figure className="hover-gallery object-contain">
              <Image
                height={200}
                width={200}
                src={image}
                alt={productName}
              />

              <Image
                height={200}
                width={200}
                src="https://i.ibb.co.com/whXHfKy8/Mini-Flower.jpg"
                alt={productName}
              />

              <Image
                height={200}
                width={200}
                src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp"
                alt={productName}
              />

              <Image
                height={200}
                width={200}
                src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp"
                alt={productName}
              />
            </figure>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            {productName}
          </h3>

          <h4 className="mt-6 text-sm font-bold text-slate-900 sm:text-base">
            {price} Taka
          </h4>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="absolute bottom-4 right-4">
        <button
          type="button"
          onClick={handleAdd}
          className="
            btn
            btn-circle
            flex
            cursor-pointer
            items-center
            justify-center
            border-none
            bg-gray-100
            text-slate-900
            transition-all
            hover:bg-[#FCAB35]
            hover:text-white
          "
          aria-label={`Add ${productName} to cart`}
        >
          <MdOutlineAddShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default NewProductCard;  