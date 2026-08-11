"use client";

import useLocalCart from "@/services/useLocalCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";


const CartButton = ({ compact = false }) => {
    const {cartProducts} = useLocalCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server + first client render must be identical
  if (!mounted) {
    if (compact) {
      return (
        <span className="relative inline-flex">
          <FiShoppingCart size={28} />
        </span>
      );
    }

    return (
      <Link
        href="/cart"
        className="relative inline-flex"
        aria-label="View cart"
      >
        <FiShoppingCart size={28} />
      </Link>
    );
  }

  const cartCount = cartProducts?.reduce(
    (total, item) => total + Number(item?.quantity || 1),
    0
  );

  if (compact) {
    return (
      <span className="relative inline-flex">
        <FiShoppingCart size={28} />

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#FCAB35] px-1 text-center text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </span>
    );
  }

  return (
    <Link
      href="/cart"
      className="relative inline-flex"
      aria-label="View cart"
    >
      <FiShoppingCart size={28} />

      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#FCAB35] px-1 text-center text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;