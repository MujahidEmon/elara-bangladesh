"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const ProductFilters = ({ filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const activeCategory = searchParams.get("category") || "";
  const activeBrand = searchParams.get("brand") || "";
  const activeSort = searchParams.get("sort") || "";
  const categories = filters?.categories || [];
  const brands = filters?.brands || [];

  const pushParams = (params) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const priceHint = useMemo(() => {
    if (!filters?.maxPrice) return "Any price";
    return `${filters.minPrice.toLocaleString("en-BD")} - ${filters.maxPrice.toLocaleString("en-BD")} Tk`;
  }, [filters]);

  const updateParam = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    pushParams(params);
  };

  const applyPrice = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    pushParams(params);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
  };

  return (
    <aside className="space-y-7 border-b border-gray-200 pb-8 lg:border-b-0 lg:border-r lg:pr-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-950">Filters</h2>
        <button type="button" onClick={clearFilters} className="text-sm font-semibold text-[#FCAB35]">
          Clear
        </button>
      </div>

      <div>
        <h3 className="border-b border-gray-200 pb-3 text-sm font-bold text-slate-950">Category</h3>
        <div className="mt-4 space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
              <input
                type="radio"
                name="category"
                checked={activeCategory === category}
                onChange={() => updateParam("category", category)}
                className="radio radio-sm border-gray-300 checked:bg-[#FCAB35]"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="border-b border-gray-200 pb-3 text-sm font-bold text-slate-950">Brand</h3>
        <div className="mt-4 space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
              <input
                type="radio"
                name="brand"
                checked={activeBrand === brand}
                onChange={() => updateParam("brand", brand)}
                className="radio radio-sm border-gray-300 checked:bg-[#FCAB35]"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={applyPrice}>
        <h3 className="border-b border-gray-200 pb-3 text-sm font-bold text-slate-950">Price Range</h3>
        <p className="mt-3 text-xs font-medium text-slate-500">{priceHint}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="sr-only" htmlFor="min-price">Minimum price</label>
          <input
            id="min-price"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Min"
            className="input input-bordered h-11 rounded-md bg-white text-sm"
          />
          <label className="sr-only" htmlFor="max-price">Maximum price</label>
          <input
            id="max-price"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max"
            className="input input-bordered h-11 rounded-md bg-white text-sm"
          />
        </div>
        <button type="submit" className="mt-3 h-11 w-full rounded-md bg-slate-950 text-sm font-bold text-white transition hover:bg-[#FCAB35]">
          Apply Price
        </button>
      </form>

      <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-gray-200 pt-5 text-sm font-bold text-slate-950">
        Best Selling
        <input
          type="checkbox"
          checked={activeSort === "best-selling"}
          onChange={(event) => updateParam("sort", event.target.checked ? "best-selling" : "")}
          className="toggle toggle-sm checked:bg-[#FCAB35]"
        />
      </label>
    </aside>
  );
};

export default ProductFilters;
