"use client";

import useLocalCart from "@/services/useLocalCart";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { FiMinus, FiPlus, FiShoppingBag, FiX } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useCartAnimation } from "./CartAnimationProvider";

const getCartCount = (products = []) =>
  products.reduce((total, product) => total + (Number(product.quantity) || 1), 0);

const getCartTotal = (products = []) =>
  products.reduce((total, product) => total + Number(product.price || 0) * (Number(product.quantity) || 1), 0);

export default function CartSlider() {
  const { isCartSliderOpen, closeCartSlider } = useCartAnimation();
  const {
    cartProducts = [],
    handleDeleteFromLs,
    handleIncreaseLs,
    handleDecreaseLs,
  } = useLocalCart();

  const cartCount = useMemo(() => getCartCount(cartProducts), [cartProducts]);
  const cartTotal = useMemo(() => getCartTotal(cartProducts), [cartProducts]);

  useEffect(() => {
    if (!isCartSliderOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeCartSlider();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeCartSlider, isCartSliderOpen]);

  return (
    <AnimatePresence>
      {isCartSliderOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-80 drawer-overlay
    bg-slate-950/45
    "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartSlider}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-90 flex w-full max-w-sm flex-col bg-white   shadow-2xl sm:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-[#ffdca3] px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#FCAB35]">Elara Cart</p>
                <h2 className="mt-1 text-lg font-light">Your Cart ({cartCount})</h2>
              </div>
              <button
                type="button"
                onClick={closeCartSlider}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FCAB35] transition hover:bg-[#FCAB35] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FCAB35]"
                aria-label="Close cart"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FCAB35]/40 bg-[#FCAB35]/10 text-[#FCAB35]">
                    <FiShoppingBag size={26} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">Your cart is empty</h3>
                  <p className="mt-2 max-w-56 text-sm text-slate-400">Add a product and it will appear here instantly.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartProducts.map((item) => (
                    <article key={item._id} className="rounded-lg border border-[#ffdca3]/40 bg-[#ffdca3]/10 shadow-lg  p-3">
                      <div className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.productName || "Cart product"}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-base-content">
                              {item.productName}
                            </h3>
                            <button
                              type="button"
                              onClick={() => handleDeleteFromLs(item)}
                              className="shrink-0 text-[#FCAB35] transition hover:text-red-400"
                              aria-label={`Remove ${item.productName || "product"}`}
                            >
                              <MdDeleteForever size={21} />
                            </button>
                          </div>

                          <p className="mt-1 text-sm text-slate-400">
                            <span>{Number(item.quantity) || 1}</span>
                            <span> x </span>
                            <span className="font-semibold text-[#FCAB35]">{item.price} Taka</span>
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#FCAB35] text-sm font-semibold text-[#FCAB35]">
                              <button
                                type="button"
                                onClick={() => handleDecreaseLs(item._id)}
                                className="flex h-8 w-8 items-center justify-center text-base-content transition hover:bg-[#FCAB35]/10"
                                aria-label={`Decrease ${item.productName || "product"} quantity`}
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="min-w-8 text-center text-sm font-semibold">{Number(item.quantity) || 1}</span>
                              <button
                                type="button"
                                onClick={() => handleIncreaseLs(item._id)}
                                className="flex h-8 w-8 items-center justify-center text-base-content transition hover:bg-[#FCAB35]/10"
                                aria-label={`Increase ${item.productName || "product"} quantity`}
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-white">
                              {Number(item.price || 0) * (Number(item.quantity) || 1)} Taka
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#ffdca3] p-5">
              <div className="mb-4 flex items-center justify-between text-base">
                <span className="font-medium text-base-content">Total:</span>
                <span className="font-bold text-[#FCAB35]">{cartTotal} Taka</span>
              </div>

              <div className="grid gap-2">
                <Link
                  href="/cart"
                  onClick={closeCartSlider}
                  className="block w-full rounded-md bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCartSlider}
                  className="block w-full rounded-md bg-[#FCAB35] px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-[#e89a2c]"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
