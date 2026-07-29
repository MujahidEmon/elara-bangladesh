"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiChevronDown,
  FiGift,
  FiHeart,
  FiMenu,
  FiMoreHorizontal,
  FiPackage,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import useLocalCart from "@/services/useLocalCart";
import categoryPhone from "../../../public/Untitled design (6).png";
import categoryLaptop from "../../../public/t109.png";
import categoryDesktop from "../../../public/feature1.jpg";
import categoryAccessory from "../../../public/109.png";
import categorySound from "../../../public/feature2.jpg";
import categoryTv from "../../../public/feature3.jpg";
import categorySmart from "../../../public/bannerbg1.png";





const actions = [
  { label: "Track Order", icon: FiPackage, href: "/track/order" },
  // { label: "Sign In", icon: FiUser, href: "/login", isAccount: true },
  // { label: "Wishlist", icon: FiHeart, href: "#" },
  { label: "Cart", icon: FiShoppingCart, href: "/cart", isCart: true },
  // { label: "More", icon: FiMoreHorizontal, href: "#" },
];

const getProductTitle = (product) => product.productName || product.name || product.title || "Product";
const getProductPrice = (product) => product.price || product.salePrice || product.regularPrice;

const Navbar = () => {
  const { cartProducts } = useLocalCart();
  const session = useSession();
  const user = session?.data?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { data: dbCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data;
    },
  });
  const navCategories = dbCategories.map((category) => ({
      name: category.name,
      href: category.href || `/products?search=${encodeURIComponent(category.name)}`,
      image: category.image || category.imageUrl || categoryLaptop,
      hasDropdown: category.hasDropdown,
    }))
  const visibleCategories = useMemo(() => navCategories.slice(0, 11), [navCategories]);
  const trimmedSearch = searchTerm.trim();
  const shouldShowSuggestions = isSearchFocused && trimmedSearch.length > 0;

  console.log(typeof pathname);

  const href = usePathname();
const act =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);


  useEffect(() => {
    if (!trimmedSearch) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    let isCurrent = true;
    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        const { data } = await axios.get("/api/products", {
          params: { search: trimmedSearch },
        });

        if (isCurrent) {
          setSearchResults(Array.isArray(data) ? data.slice(0, 6) : []);
        }
      } catch {
        if (isCurrent) {
          setSearchResults([]);
        }
      } finally {
        if (isCurrent) {
          setIsSearching(false);
        }
      }
    }, 220);

    return () => {
      isCurrent = false;
      clearTimeout(timeoutId);
    };
  }, [trimmedSearch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    setIsDrawerOpen(false);
    setIsSearchFocused(false);
  };

  const handleResultClick = () => {
    setIsDrawerOpen(false);
    setIsSearchFocused(false);
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const SearchSuggestions = ({ compact = false }) => (
    <div
      className={`absolute left-0 right-0 top-[calc(100%+8px)] z-70 overflow-hidden rounded-xl border border-slate-100 bg-white text-slate-900 shadow-2xl ${compact ? "max-h-[360px]" : "max-h-[430px]"
        }`}
    >
      <div className="border-b border-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
        Search results
      </div>
      {isSearching ? (
        <div className="px-4 py-5 text-sm font-medium text-slate-500">Searching...</div>
      ) : searchResults.length ? (
        <div className="max-h-[350px] overflow-y-auto py-2">
          {searchResults.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              onClick={handleResultClick}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#fff8ed]"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {product.image && (
                  <Image src={product.image} alt={getProductTitle(product)} fill sizes="48px" className="object-cover" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-950">{getProductTitle(product)}</span>
                <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
                  {product.category || product.brand || "Elara product"}
                </span>
              </span>
              {getProductPrice(product) && (
                <span className="shrink-0 text-sm font-extrabold text-[#fcab35]">{getProductPrice(product)} Tk</span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-4 py-5">
          <p className="text-sm font-semibold text-slate-700">No products found for &quot;{trimmedSearch}&quot;.</p>
          <Link
            href={`/products?search=${encodeURIComponent(trimmedSearch)}`}
            onClick={handleResultClick}
            className="mt-3 inline-flex text-sm font-bold text-[#fcab35]"
          >
            View all matching products
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className=" bg-white shadow-sm">
      <div className="sticky top-0 z-50 bg-white">
        <div className="mx-auto hidden py-3 max-w-7xl items-center gap-8 px-4 lg:flex">
          {/* <Link href="/" className="relative h-14 w-40 shrink-0" aria-label="Elara Bangladesh home">
            
          </Link> */}
          <Link href={'/'} className=" bg-transparent border-0 ml-0 pl-0 md:pl-auto md:text-2xl text-black font-semibold"><span className="text-[#FCAB35]">Elara</span> Bangladesh</Link>

          <form onSubmit={handleSearchSubmit} className="relative mx-auto max-w-[520px] flex-1">
            <label htmlFor="desktop-site-search" className="sr-only">
              Search products
            </label>
            <input
              id="desktop-site-search"
              type="search"
              value={searchTerm}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search in..."
              className="h-14 w-full rounded-lg border-0 bg-[#f5f5f5] px-5 pr-14 text-base font-medium text-slate-950 outline-none placeholder:text-slate-800 transition focus:bg-white focus:ring-2 focus:ring-[#fcab35]/60"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-950 transition hover:bg-white hover:text-[#fcab35]"
              aria-label="Search products"
            >
              <FiSearch size={26} strokeWidth={1.8} />
            </button>
            {shouldShowSuggestions && <SearchSuggestions />}
          </form>

          <div className="flex shrink-0 items-center gap-6">
            {actions.map((item) => (
              <Link
                key={item.label}
                href={item.isAccount && user ? "#" : item.href}
                className="group flex flex-col items-center gap-1 text-slate-950 transition hover:text-[#fcab35]"
                aria-label={item.label}
              >
                <span className="relative">
                  <item.icon size={27} strokeWidth={1.75} />
                  {item.isCart && cartProducts.length > 0 && (
                    <span className="absolute -right-3 -top-2 min-w-5 rounded-full bg-[#fcab35] px-1 text-center text-xs font-bold text-white">
                      {cartProducts.length}
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium leading-none">
                  {item.isAccount && user ? user.name?.split(" ")[0] || "Account" : item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-900"
            aria-label="Open menu"
          >
            <FiMenu size={26} />
          </button>
          <Link href={'/'} className=" bg-transparent border-0 ml-0 pl-0 md:pl-auto md:text-2xl text-black font-semibold"><span className="text-[#FCAB35]">Elara</span> Bangladesh</Link>
          <div className="flex items-center gap-3 text-slate-900">
            <button type="button" onClick={() => setIsDrawerOpen(true)} aria-label="Open search">
              <FiSearch size={27} />
            </button>
            <Link href="/cart" className="relative" aria-label="View cart">
              <FiShoppingCart size={28} />
              {cartProducts.length > 0 && (
                <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#FCAB35] px-1 text-center text-xs font-bold text-white">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>



{/* BottomPath  */}
      <nav
        className="hidden  bg-[#fcab35] transition-all duration-300 lg:block "
      >
        <div className="mx-auto flex h-10 justify-center max-w-7xl items-center gap-7 overflow-x-auto px-4">
          <Link
            href={'/products'}
            className={`inline-flex shrink-0 items-center gap-1.5 text-base  text-white transition hover:text-black ${isActive? "text-blue-600" : ""
              }`}
          >All Products
          </Link>
          {visibleCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`inline-flex shrink-0 items-center gap-1.5 text-base  text-white transition hover:text-black ${act ? "text-[#fcab35]" : ""
                }`}
            >
              {category.name}
              {category.hasDropdown && <FiChevronDown size={17} strokeWidth={2.2} />}
            </Link>
          ))}
        </div>
      </nav>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="relative h-full w-[86vw] max-w-sm overflow-y-auto bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
              <Link href={'/'} className=" bg-transparent border-0 ml-0 pl-0 md:pl-auto md:text-2xl text-black font-semibold"><span className="text-[#FCAB35]">Elara</span> Bangladesh</Link>
              <button type="button" onClick={() => setIsDrawerOpen(false)} aria-label="Close menu">
                <FiX size={28} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative border-b border-gray-100 px-5 py-4">
              <label htmlFor="mobile-drawer-search" className="sr-only">
                Search products
              </label>
              <div className="relative">
                <input
                  id="mobile-drawer-search"
                  type="search"
                  value={searchTerm}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
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
              {shouldShowSuggestions && <SearchSuggestions compact />}
            </form>

            <div className="px-5 py-5">
              <p className="text-sm font-bold uppercase text-gray-400">Browse Categories</p>
              <div className="mt-4 divide-y divide-gray-100">
                {navCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between py-3 text-lg font-medium text-slate-900"
                  >
                    <span className="flex items-center gap-4">
                      <span className="relative h-7 w-7">
                        <Image src={category.image} alt="" fill sizes="28px" className="object-contain" />
                      </span>
                      {category.name}
                    </span>
                    <FiChevronDown size={18} />
                  </Link>
                ))}
              </div>

              <p className="mt-5 text-sm font-bold uppercase text-gray-400">Help Link</p>
              <div className="mt-3 space-y-3">
                <Link href="/products?search=offer" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 text-lg font-medium text-slate-900">
                  <FiGift size={21} />
                  Offer Zone
                </Link>
                <Link href="/cart" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 text-lg font-medium text-slate-900">
                  <FiShoppingCart size={21} />
                  Cart ({cartProducts.length})
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
