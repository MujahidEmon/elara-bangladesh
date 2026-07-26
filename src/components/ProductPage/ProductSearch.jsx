"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="products-search">Search products</label>
      <div className="relative flex-1">
        <IoSearch
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          id="products-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name, category, brand..."
          className="input input-bordered h-12 w-full rounded-lg border-gray-200 bg-white pl-11 text-sm text-slate-900 focus:border-[#FCAB35] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="h-12 rounded-lg bg-[#FCAB35] px-6 text-sm font-bold text-white transition hover:bg-[#e89a2c]"
      >
        Search
      </button>
    </form>
  );
};

export default ProductSearch;
