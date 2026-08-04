"use client";

import useLocalCart from "@/services/useLocalCart";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCartAnimation } from "./CartAnimationProvider";

const getCartCount = (products = []) =>
  products.reduce((total, product) => total + (Number(product.quantity) || 1), 0);

export default function FloatingCart() {
  const { cartProducts = [] } = useLocalCart();
  const { registerFloatingCart, bounceKey, openCartSlider } = useCartAnimation();
  const shouldReduceMotion = useReducedMotion();

  const cartCount = useMemo(() => getCartCount(cartProducts), [cartProducts]);

  return (
    <motion.div
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] md:bottom-6 md:right-6"
      animate={
        shouldReduceMotion
          ? { scale: bounceKey ? [1, 1.04, 1] : 1 }
          : { scale: bounceKey ? [1, 1.12, 0.96, 1] : 1 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.18, ease: "easeOut" }
          : { duration: 0.52, ease: [0.22, 1, 0.36, 1], times: [0, 0.42, 0.72, 1] }
      }
    >
      <button
        type="button"
        ref={registerFloatingCart}
        onClick={openCartSlider}
        aria-label="View cart"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#ffe0aa] bg-white text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:border-[#FCAB35] hover:text-[#FCAB35] hover:shadow-[0_14px_34px_rgba(252,171,53,0.22)] focus:outline-none focus:ring-2 focus:ring-[#FCAB35] focus:ring-offset-2 active:translate-y-0 md:h-16 md:w-16"
      >
        <AnimatePresence>
          {bounceKey > 0 && !shouldReduceMotion && (
            <motion.span
              key={bounceKey}
              className="pointer-events-none absolute -inset-4 rounded-full"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: [0, 1, 0], scale: [0.72, 1.28, 1.05] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <span className="absolute inset-0 rounded-full bg-[#FCAB35]/18 blur-md" />
              <motion.span
                className="absolute inset-2 rounded-full border-2 border-[#FCAB35]/55"
                animate={{
                  borderRadius: [
                    "50% 50% 50% 50% / 50% 50% 50% 50%",
                    "44% 56% 48% 52% / 58% 42% 56% 44%",
                    "52% 48% 54% 46% / 46% 56% 44% 54%",
                    "50% 50% 50% 50% / 50% 50% 50% 50%",
                  ],
                  scale: [0.82, 1.18, 0.96, 1.04],
                  opacity: [0, 0.85, 0.45, 0],
                }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-5 rounded-full bg-white/55"
                animate={{
                  scale: [0.5, 1.05, 0.8],
                  opacity: [0, 0.55, 0],
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
              {[0, 1, 2, 3].map((bubble) => (
                <motion.span
                  key={bubble}
                  className="absolute rounded-full border border-[#FCAB35]/70 bg-white/90 shadow-sm"
                  style={{
                    width: 7 + bubble,
                    height: 7 + bubble,
                    left: `${34 + bubble * 10}%`,
                    top: `${18 + (bubble % 2) * 56}%`,
                  }}
                  animate={{
                    y: [0, -14 - bubble * 2],
                    opacity: [0, 0.8, 0],
                    scale: [0.3, 1, 0.45],
                  }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: bubble * 0.04 }}
                />
              ))}
            </motion.span>
          )}
        </AnimatePresence>

        <FiShoppingCart size={24} strokeWidth={1.85} aria-hidden="true" />

        <AnimatePresence mode="popLayout">
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.75, y: 4, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -right-1 -top-1 flex min-w-6 items-center justify-center rounded-full bg-[#FCAB35] px-1.5 py-0.5 text-xs font-bold leading-none text-white shadow-sm md:min-w-7 md:text-sm"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
