import Link from "next/link";
import { Suspense } from "react";

import { getCategories } from "@/actions/server/categories";

import CartButton from "./Navbar/CartButton";
import SearchBox from "./Navbar/SearchBox";
import MobileMenu from "./Navbar/MobileMenu";
import DesktopNav from "./Navbar/DesktopNav";

const Navbar = async () => {
  const dbCategories = await getCategories();

  const navCategories = dbCategories.map((category) => ({
    name: category.name,
    href:
      category.href ||
      `/products?search=${encodeURIComponent(category.name)}`,
    image: category.image || category.imageUrl,
    hasDropdown: category.hasDropdown,
  }));

  return (
    <header className="bg-white shadow-sm">
      {/* ================= DESKTOP TOP BAR ================= */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="mx-auto hidden max-w-7xl items-center gap-8 px-4 py-3 lg:flex">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 bg-transparent font-semibold text-black md:text-2xl"
          >
            <span className="text-[#FCAB35]">
              Elara
            </span>{" "}
            Bangladesh
          </Link>

          {/* Search */}
          <Suspense fallback={null}>
            <SearchBox />
          </Suspense>

          {/* Cart / Actions */}
          <div className="flex shrink-0 items-center gap-6">
            <Link
              href="/track/order"
              className="group flex flex-col items-center gap-1 text-slate-950 transition hover:text-[#fcab35]"
            >
              <span className="text-sm font-medium">
                Track Order
              </span>
            </Link>

            <CartButton />
          </div>
        </div>

        {/* ================= MOBILE HEADER ================= */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:hidden">

          <Suspense fallback={null}>
            <MobileMenu categories={navCategories} />
          </Suspense>

          <Link
            href="/"
            className="bg-transparent font-semibold text-black md:text-2xl"
          >
            <span className="text-[#FCAB35]">
              Elara
            </span>{" "}
            Bangladesh
          </Link>

          <div className="flex items-center gap-3 text-slate-900">
            <Link
              href="/cart"
              aria-label="View cart"
            >
              <CartButton compact />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP NAVIGATION ================= */}
      <Suspense fallback={null}>
        <DesktopNav categories={navCategories} />
      </Suspense>
    </header>
  );
};

export default Navbar;