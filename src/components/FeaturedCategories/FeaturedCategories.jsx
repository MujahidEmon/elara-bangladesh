import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Sunscreen",
    img: "https://readymadeui.com/images/sunscreen-img-1.webp",
  },
  {
    name: "Face Wash",
    img: "https://readymadeui.com/images/sunscreen-img-2.webp",
  },
  {
    name: "Skin Glow",
    img: "https://readymadeui.com/images/sunscreen-img-3.webp",
  },
  {
    name: "Dry Shampoo",
    img: "https://readymadeui.com/images/sunscreen-img-4.webp",
  },
  {
    name: "Body Butter",
    img: "https://readymadeui.com/images/sunscreen-img-5.webp",
  },
  {
    name: "Face Primer",
    img: "https://readymadeui.com/images/sunscreen-img-6.webp",
  },
  {
    name: "Body Lotion",
    img: "https://readymadeui.com/images/body-motion-category.webp",
  },
];

const FeaturedCategories = () => {
  return (
    <div className="py-3 px-6">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Top Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 sm:gap-8 gap-4 gap-y-8">
        {categories.map((item, index) => (
          <Link href={`/${item.name}`} key={index} className="cursor-pointer relative">
            <div className="overflow-hidden aspect-square relative rounded-xl">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>

            <div className="mt-2 text-center">
              <h6 className="text-slate-900 text-sm font-semibold">
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
