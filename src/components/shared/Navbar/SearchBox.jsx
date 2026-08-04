"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

import SearchSuggestions from "./SearchSuggestions";

const SearchBox = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const trimmedSearch = searchTerm.trim();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    router.push(
      query
        ? `/products?search=${encodeURIComponent(query)}`
        : "/products"
    );

    setIsSearchFocused(false);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative mx-auto max-w-[520px] flex-1"
    >
      <label
        htmlFor="desktop-site-search"
        className="sr-only"
      >
        Search products
      </label>

      <input
        id="desktop-site-search"
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
            () => setIsSearchFocused(false),
            150
          )
        }
        placeholder="Search in..."
        className="h-14 w-full rounded-lg border-0 bg-[#f5f5f5] px-5 pr-14 text-base font-medium text-slate-950 outline-none placeholder:text-slate-800 transition focus:bg-white focus:ring-2 focus:ring-[#fcab35]/60"
      />

      <button
        type="submit"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-950 transition hover:bg-white hover:text-[#fcab35]"
        aria-label="Search products"
      >
        <FiSearch
          size={26}
          strokeWidth={1.8}
        />
      </button>

      {isSearchFocused && trimmedSearch && (
        <SearchSuggestions
          searchTerm={trimmedSearch}
        />
      )}
    </form>
  );
};

export default SearchBox;