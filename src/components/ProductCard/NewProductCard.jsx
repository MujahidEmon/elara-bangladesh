'use client';
const { default: Image } = require("next/image");
import Link from "next/link";
import { MdOutlineAddShoppingCart } from "react-icons/md";


const NewProductCard = ({ product }) => {
    const { image, productName, price, _id } = product;
    // <figure className="hover-gallery h-64 object-contain">

    //     <Image height={200} alt="text" width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
    //     <Image height={200} alt="text" width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
    //     <Image height={200} alt="text" width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
    //     <Image height={200} alt="text" width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
    // </figure>
    return (
        <Link href={`/products/${_id}`}
            className="bg-white border border-gray-200 max-w-2xs hover:shadow-lg shadow-[#ffdca3] overflow-hidden 
                 rounded-2xl  transition-all relative"
        >
            <div className="">
                <div
                    className="aspect-square text-center bg-gray-50 overflow-hidden 
                     mx-auto rounded-b-2xl"
                >
                    <figure className="hover-gallery  object-contain">

                        <Image height={200} alt={productName} width={200} src={image} />
                        <Image height={200} alt={productName} width={200} src="https://i.ibb.co.com/whXHfKy8/Mini-Flower.jpg" />
                        <Image height={200} alt={productName} width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
                        <Image height={200} alt={productName} width={200} src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
                    </figure>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {productName}
                </h3>

                <div className="flex items-center justify-between gap-2 mt-6">
                    <h4 className="text-sm sm:text-base text-slate-900 font-bold">
                        {price} Taka
                    </h4>
                    <button
                        type="button"
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 
                       flex items-center justify-center rounded-full 
                       cursor-pointer"
                        aria-label="Add to Cart"
                    >
                        <MdOutlineAddShoppingCart size={20} />
                    </button>

                </div>
            </div>
        </Link>
    );
};

export default NewProductCard;