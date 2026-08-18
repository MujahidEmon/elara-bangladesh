"use client";

import Link from "next/link";
import { useState } from "react";
import { FiGift, FiMenu, FiSearch, FiX } from "react-icons/fi";

import SearchSuggestions from "./SearchSuggestions";
import CategoryLinks from "./CategoryLinks";

const MobileMenu = ({ categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [isSearchFocused, setIsSearchFocused] =
    useState(false);

  const trimmedSearch = searchTerm.trim();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    window.location.href = query
      ? `/products?search=${encodeURIComponent(query)}`
      : "/products";
  };

  return (
    <>
      {/* Menu button */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900"
        aria-label="Open menu"
      >
        <FiMenu size={26} />
      </button>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu overlay"
          />

          {/* Drawer */}
          <aside className="relative h-full w-[86vw] max-w-sm overflow-y-auto bg-white shadow-xl">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
              <Link
                href="/"
                onClick={() =>
                  setIsDrawerOpen(false)
                }
                className="bg-transparent font-semibold text-black md:text-2xl"
              >
                <span className="text-[#FCAB35]">
                  Elara
                </span>{" "}
                Bangladesh
              </Link>

              <button
                type="button"
                onClick={() =>
                  setIsDrawerOpen(false)
                }
                aria-label="Close menu"
              >
                <FiX size={28} />
              </button>
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative border-b border-gray-100 px-5 py-4"
            >
              <label
                htmlFor="mobile-drawer-search"
                className="sr-only"
              >
                Search products
              </label>

              <div className="relative">
                <input
                  id="mobile-drawer-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  onFocus={() =>
                    setIsSearchFocused(true)
                  }
                  onBlur={() =>
                    setTimeout(
                      () =>
                        setIsSearchFocused(false),
                      150
                    )
                  }
                  placeholder="Search products..."
                  className="input input-bordered h-11 w-full rounded-full border-[#FCAB35] bg-white pl-4 pr-11 text-sm text-slate-900"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#FCAB35] text-white"
                  aria-label="Search products"
                >
                  <FiSearch size={18} />
                </button>
              </div>

              {isSearchFocused &&
                trimmedSearch && (
                  <SearchSuggestions
                    searchTerm={trimmedSearch}
                    compact
                  />
                )}
            </form>

            {/* Categories */}
            <div className="px-5 py-5">
              <p className="text-sm font-bold uppercase text-gray-400">
                Browse Categories
              </p>

              <CategoryLinks
                categories={categories}
              />

              {/* Help */}
              {/* <p className="mt-5 text-sm font-bold uppercase text-gray-400">
                Help Link
              </p> */}

              {/* <div className="mt-3 space-y-3">
                <Link
                  href="/products?search=offer"
                  onClick={() =>
                    setIsDrawerOpen(false)
                  }
                  className="flex items-center gap-3 text-lg font-medium text-slate-900"
                >
                  <FiGift size={21} />
                  Offer Zone
                </Link>

                <Link
                  href="/cart"
                  onClick={() =>
                    setIsDrawerOpen(false)
                  }
                  className="flex items-center gap-3 text-lg font-medium text-slate-900"
                >
                  Cart
                </Link>
              </div> */}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileMenu;