"use client";
import CartCard from "@/components/CartCard/CartCard";
import useLocalCart from "@/services/useLocalCart";
import Link from "next/link";
import { useState } from "react";

const ProductCart = () => {

  const [insideDhaka, setInsideDhaka] = useState(true);
  const { cartProducts } = useLocalCart();
  console.log(cartProducts);

  const deliveryCharge = insideDhaka ? 80 : 130;

  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const grandTotal = totalPrice + deliveryCharge;



  return (
    <div className="max-w-5xl min-h-[calc(100vh-260px)] max-md:max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-base-400">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10 mt-8">
        {/* Left */}
        <div className="md:col-span-2 space-y-4">
          {cartProducts.length === 0 ? (
            <Link href="/allProducts">
              <button className="btn btn-outline w-full mt-24 border-[#FCAB35] text-[#FCAB35]">
                Browse Product
              </button>
            </Link>
          ) : (
            cartProducts.map((product, idx) => (
              <CartCard key={idx} product={product} />
            ))
          )}
        </div>

        {/* Right */}
        <div className="bg-[#c2ffe1] rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
          <ul className="text-base-content font-medium space-y-4">
            <li className="flex text-sm">
              Subtotal
              <span className="ml-auto font-semibold">
                BDT {totalPrice}
              </span>
            </li>

            <li className="flex text-sm">
              Shipping
              <span className="ml-auto font-semibold">BDT {deliveryCharge}</span>
            </li>
            
            <div className="flex justify-between gap-4">
              <label className="flex items-center text-sm gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  checked={insideDhaka === true}
                  onChange={() => setInsideDhaka(true)}
                />
                Inside Dhaka
              </label>

              <label className="flex items-center text-sm gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  checked={insideDhaka === false}
                  onChange={() => setInsideDhaka(false)}
                />
                Outside Dhaka
              </label>
            </div>

            <hr className="border-slate-300" />

            <li className="flex text-sm font-semibold">
              Total
              <span className="ml-auto">BDT {grandTotal}</span>
            </li>
          </ul>

          <div className="mt-8 ">
            <Link href="/checkout">
              <button className="text-sm px-4 py-2.5 mb-3 w-full font-semibold tracking-wide cursor-pointer hover:bg-amber-500 transition-transform bg-[#FCAB35] text-white rounded-md">
                Buy Now
              </button>
            </Link>

            <Link href="/allProducts">
              <button className="text-sm px-4 py-2.5 w-full font-semibold hover:border-amber-950 cursor-pointer tracking-wide border border-slate-300 rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
