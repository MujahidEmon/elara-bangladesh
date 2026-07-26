"use client";

import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiFilter } from "react-icons/fi";

const CategoryDropdown = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data;
    },
  });

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn h-10 min-h-10 rounded-md bg-white text-sm">
        Select Category <FiFilter color="orange" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-10 mt-2 w-64 rounded-md bg-white p-2 shadow-lg"
      >
        <li>
          <Link href="/products" className="rounded bg-[#FCAB35] font-bold text-white">
            All Categories
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id || category.slug || category.name}>
            <Link
              href={category.href || `/products?search=${encodeURIComponent(category.name)}`}
              className="text-slate-800"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
