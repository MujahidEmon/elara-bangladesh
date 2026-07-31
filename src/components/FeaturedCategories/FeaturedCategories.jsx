import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getCategories } from "@/actions/server/categories";

const FeaturedCategories = async () => {
const categories = await getCategories();

console.log("Categories:", categories);

return ( 
<div> <SectionHeading title="Top Categories" />


  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 sm:gap-8 gap-4 gap-y-8">
    {categories.map((item) => (
      <Link
        href={`/products?category=${item.slug}`}
        key={item._id.toString()}
        className="cursor-pointer relative"
      >
        <div className="overflow-hidden aspect-square relative rounded-xl">
          <Image
            src={
              item.image ||
              "https://i.ibb.co/0j1Z2kD/category-placeholder.png"
            }
            alt={item.name}
            fill
            className="object-cover object-top rounded-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="mt-2 text-center">
          <h6 className="text-slate-900 text-sm">
            {item.name}
          </h6>
        </div>
      </Link>
    ))}
  </div>
</div>

);
};

export default FeaturedCategories;
