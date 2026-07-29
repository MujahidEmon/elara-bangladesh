'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../SectionHeading/SectionHeading";



const FeaturedCategories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data;
    },
  });
  console.log(categories);
  
  return (
    <div className="py-3 px-6">
      <SectionHeading title="Top Categories" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 sm:gap-8 gap-4 gap-y-8">
        {categories.map((item, index) => (
          <Link href={`/products?category=${item.slug}`} key={index} className="cursor-pointer relative">
            <div className="overflow-hidden aspect-square relative rounded-xl">
              <Image
                src={item.image || "https://i.ibb.co/0j1Z2kD/category-placeholder.png"}
                alt={item.name}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>

            <div className="mt-2 text-center">
              <h6 className="text-slate-900 text-sm ">
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
