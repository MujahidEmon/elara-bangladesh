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
import DefaultButton from "../shared/DefaultButton/DefaultButton";

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

      <section className="my-12 mx-auto px-4">
        <h1 className="text-3xl md:text-4xl text-center font-semibold">Our Products</h1>
        <div className="grid grid-cols-2 md:mt-12 mt-6 justify-items-center md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {
            allProducts.slice(0, 4).map((product, index) => <NewProductCard product={product} key={index}></NewProductCard>)
          }
        </div>
        <div className="flex justify-center mt-6 ">
          <DefaultButton text="Show All"></DefaultButton>
        </div>
      </section>


      <section className="max-w-7xl my-12 mx-auto px-4  md:px-0 ">
        <div className="flex md:flex-row md:mb-0 mb-12 flex-col gap-3 md:gap-0 justify-between">
          <div className="md:w-1/2">
            <Image src={'https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp'} className="rounded-xl" alt="Banner 1" height={400} width={650}>

            </Image>
          </div>
          <div className="md:w-1/2 flex gap-2 flex-col items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-semibold ">Lorem ipsum dolor sit.</h1>
            <p className="max-w-3xs md:max-w-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consectetur? </p>
            <DefaultButton text="Grab Now"></DefaultButton>
          </div>
        </div>
        
        <div className="flex md:flex-row flex-col-reverse gap-6 md:gap-0 justify-between">
          <div className="md:w-1/2 flex gap-2 flex-col items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-semibold ">Lorem ipsum dolor sit.</h1>
            <p className="max-w-3xs md:max-w-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consectetur? </p>
            <DefaultButton text="Grab Now"></DefaultButton>
          </div>
          <div>
            <Image src={'https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp'} className="rounded-xl" alt="Banner 1" height={400} width={650}>

            </Image>
          </div>
        </div>
      </section>




      {/*<Ratings /> */}

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
