"use client";

import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { usePathname, useSearchParams } from "next/navigation";

const NavigationLinks = ({ categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visibleCategories = categories.slice(0, 11);

  const isActive = (href) => {
    // Home
    if (href === "/") {
      return pathname === "/";
    }

    const [hrefPath, hrefQuery] = href.split("?");

    // Path must match
    if (pathname !== hrefPath) {
      return false;
    }

    // All Products
    // /products হলে active
    // কিন্তু /products?search=... হলে active হবে না
    if (href === "/products") {
      return searchParams.toString() === "";
    }

    // Category URL-এর query parameters
    if (hrefQuery) {
      const hrefParams = new URLSearchParams(hrefQuery);

      for (const [key, value] of hrefParams.entries()) {
        if (searchParams.get(key) !== value) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  const inactiveClass =
    "relative inline-flex items-center shrink-0 " +
    "text-white px-4 py-1 " +
    "transition-colors duration-300 " +
    "hover:text-black/60 " +
    "after:absolute after:bottom-[-1] after:left-0 " +
    "after:h-[2px] after:w-0 " +
    "after:bg-white " +
    "hover:after:w-full " +
    "after:transition-all after:duration-300";

  const activeClass =
    "relative inline-flex items-center shrink-0 " +
    "text-black px-4 py-1 " +
    " " +
    "border-b-2 border-white " +
    "bg-white/15";

  return (
    <>
      {/* Home */}
      <Link
        href="/"
        className={isActive("/") ? activeClass : inactiveClass}
      >
        Home
      </Link>

      {/* All Products */}
      <Link
        href="/products"
        className={
          isActive("/products")
            ? activeClass
            : inactiveClass
        }
      >
        All Products
      </Link>

      {/* Categories */}
      {visibleCategories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className={
            isActive(category.href)
              ? activeClass
              : inactiveClass
          }
        >
          {category.name}

          {category.hasDropdown && (
            <FiChevronDown
              size={17}
              strokeWidth={2.2}
              className="ml-1.5"
            />
          )}
        </Link>
      ))}
    </>
  );
};

export default NavigationLinks;