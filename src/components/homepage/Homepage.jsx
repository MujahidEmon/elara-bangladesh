'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import PromoSection from "../FeaturedCategories/promo";
import NewProductCard from "../ProductCard/NewProductCard";

// Components


// 🔹 Static products array
const allProducts = [
  {
    _id: "1",
    name: "Smart Watch",
    price: 120,
    image: "https://i.ibb.co/0jZ3QbP/watch.jpg",
  },
  {
    _id: "2",
    name: "Wireless Headphone",
    price: 80,
    image: "https://i.ibb.co/3rGz8bN/headphone.jpg",
  },
  {
    _id: "3",
    name: "Gaming Mouse",
    price: 35,
    image: "https://i.ibb.co/QXnK8Xr/mouse.jpg",
  },
  {
    _id: "4",
    name: "Mechanical Keyboard",
    price: 95,
    image: "https://i.ibb.co/zF1YcK7/keyboard.jpg",
  },
  {
    _id: "5",
    name: "Bluetooth Speaker",
    price: 60,
    image: "https://i.ibb.co/Yk9R4hR/speaker.jpg",
  },
  {
    _id: "6",
    name: "VR Headset",
    price: 250,
    image: "https://i.ibb.co/0M9f0ZP/vr.jpg",
  },
  {
    _id: "7",
    name: "Power Bank",
    price: 40,
    image: "https://i.ibb.co/7kW8z5n/powerbank.jpg",
  },
  {
    _id: "8",
    name: "USB Hub",
    price: 25,
    image: "https://i.ibb.co/Wk2Z8YF/usbhub.jpg",
  },
];

export default function Home() {
  const loading = false; // static data so loading false

  return (
    <div>
      <Banner />

      {/* Featured Categories Section */}
      <section className="my-12">
        <h1 className="text-3xl md:text-4xl text-center font-semibold">Shop By Categories</h1>
        <FeaturedCategories>  </FeaturedCategories>
      </section>

      {/* Promo Section */}
      <section className="my-12">
        <PromoSection></PromoSection>
      </section>

      <section className="my-12 mx-auto">
        <h1 className="text-3xl md:text-4xl text-center font-semibold">Our Products</h1>
        <div className="grid grid-cols-2 md:mt-12 mt-6 justify-items-center md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {
            allProducts.map((product, index) => <NewProductCard product={product} key={index}></NewProductCard>)
          }
        </div>
        <button className="btn bg-[#fcab35] text-center">Show All</button>
      </section>

      {/* Featured Section */}
      <div className="my-14 lg:my-32 px-4 text-center space-y-5 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl lg:text-5xl">Featured Products</h1>
          <p className="max-w-2xl font-extralight">
            Electronics products continue to drive innovation and shape the way
            we live, work, and interact.
          </p>
        </div>

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <HashLoader color="#FCAB35" size={60} />
          </div>
        ) : (
          <div className="md:flex grid grid-cols-2 md:flex-row flex-wrap px-4 md:px-0 gap-4 mt-12">
            {[...allProducts]
              .reverse()
              .slice(0, 8)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        )}

        <Link href="/allProducts">
          <button className="btn btn-outline tracking-wider border-[#FCAB35] hover:bg-[#FCAB35] hover:text-white hover:scale-110 text-[#FCAB35]">
            View All
          </button>
        </Link>
      </div>

      {/* Best Trimmer Section */}
      {/* <div className="my-14 lg:my-32 px-4 max-w-screen-xl mx-auto">
        <AllTrimmers />
      </div>

      <Ratings /> */}

      {/* Carousel Section */}
      <div className="flex flex-col lg:flex-row text-white">
        {[
          "https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp",
          "https://i.ibb.co.com/chZzWbwR/banner-image-5-c7660f9f-ff9c-4284-9885-de48ab56d108.webp",
          "https://i.ibb.co.com/7dCKJPP0/banner-image-6.webp",
        ].map((url, idx) => (
          <div
            key={idx}
            className="w-full lg:w-1/3 h-64 flex flex-col justify-center items-end px-6 py-8 text-right"
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-amber-700">VR Fest</p>
            <h1 className="font-bold text-2xl md:text-3xl">
              Latest QPad {idx === 1 ? "With Keyboard" : ""}
            </h1>
            <button className="mt-2 border-b-2">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
