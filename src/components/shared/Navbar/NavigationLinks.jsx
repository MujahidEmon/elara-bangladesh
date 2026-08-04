"use client";

import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { usePathname } from "next/navigation";

const NavigationLinks = ({ categories }) => {
  const pathname = usePathname();

  const visibleCategories = categories.slice(0, 11);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/products?")) {
      return pathname === "/products";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Home */}
      <Link
        href="/"
        className={`inline-flex shrink-0 items-center gap-1.5 text-base transition hover:text-black ${
          isActive("/")
            ? "font-semibold text-black"
            : "text-white"
        }`}
      >
        Home
      </Link>

      {/* All Products */}
      <Link
        href="/products"
        className={`inline-flex shrink-0 items-center gap-1.5 text-base transition hover:text-black ${
          isActive("/products")
            ? "font-semibold text-black"
            : "text-white"
        }`}
      >
        All Products
      </Link>

      {/* Categories */}
      {visibleCategories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className={`inline-flex shrink-0 items-center gap-1.5 text-base transition hover:text-black ${
            isActive(category.href)
              ? "font-semibold text-black"
              : "text-white"
          }`}
        >
          {category.name}

          {category.hasDropdown && (
            <FiChevronDown
              size={17}
              strokeWidth={2.2}
            />
          )}
        </Link>
      ))}
    </>
  );
};

export default NavigationLinks;