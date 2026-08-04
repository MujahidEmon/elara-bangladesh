import Link from "next/link";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

const CategoryLinks = ({ categories }) => {
  return (
    <div className="mt-4 divide-y divide-gray-100">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex items-center justify-between py-3 text-lg font-medium text-slate-900"
        >
          <span className="flex items-center gap-4">
            <span className="relative h-7 w-7">
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              )}
            </span>

            {category.name}
          </span>

          <FiChevronDown size={18} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryLinks;