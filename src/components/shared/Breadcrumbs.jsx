"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiHome } from "react-icons/fi";

const formatSegment = (segment) =>
  decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-white">
      <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 font-semibold text-slate-500 transition hover:text-[#FCAB35]">
            <FiHome size={15} />
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex min-w-0 items-center gap-2">
              <FiChevronRight className="shrink-0 text-slate-300" size={15} />
              {isLast ? (
                <span className="truncate font-semibold text-slate-950" aria-current="page">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link href={href} className="truncate font-semibold text-slate-500 transition hover:text-[#FCAB35]">
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
