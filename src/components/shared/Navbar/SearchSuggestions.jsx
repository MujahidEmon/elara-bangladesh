"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const getProductTitle = (product) =>
  product.productName ||
  product.name ||
  product.title ||
  "Product";

const getProductPrice = (product) =>
  product.price ||
  product.salePrice ||
  product.regularPrice;

const SearchSuggestions = ({
  searchTerm,
  compact = false,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);

        const { data } = await axios.get(
          "/api/products",
          {
            params: {
              search: searchTerm,
            },
            signal: controller.signal,
          }
        );

        if (Array.isArray(data)) {
          setSearchResults(data.slice(0, 6));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        if (
          error.name !== "CanceledError" &&
          error.code !== "ERR_CANCELED"
        ) {
          setSearchResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  const handleResultClick = () => {
    setSearchResults([]);
  };

  return (
    <div
      onMouseDown={(event) => event.preventDefault()}
      className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-slate-100 bg-white text-slate-900 shadow-2xl ${
        compact
          ? "max-h-[360px]"
          : "max-h-[430px]"
      }`}
    >
      <div className="border-b border-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
        Search results
      </div>

      {isSearching ? (
        <div className="px-4 py-5 text-sm font-medium text-slate-500">
          Searching...
        </div>
      ) : searchResults.length > 0 ? (
        <div className="max-h-[350px] overflow-y-auto py-2">
          {searchResults.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product?._id}`}
              onClick={handleResultClick}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#fff8ed]"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={getProductTitle(product)}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-950">
                  {getProductTitle(product)}
                </span>

                <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
                  {product.category ||
                    product.brand ||
                    "Elara product"}
                </span>
              </span>

              {getProductPrice(product) && (
                <span className="shrink-0 text-sm font-extrabold text-[#fcab35]">
                  {getProductPrice(product)} Tk
                </span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-4 py-5">
          <p className="text-sm font-semibold text-slate-700">
            No products found for &quot;{searchTerm}&quot;.
          </p>

          <Link
            href={`/products?search=${encodeURIComponent(
              searchTerm
            )}`}
            className="mt-3 inline-flex text-sm font-bold text-[#fcab35]"
          >
            View all matching products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
