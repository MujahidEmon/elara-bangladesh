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
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { Swiper, SwiperSlide } from 'swiper/react';

import bannerImg from '../../../public/109.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../../app/swiperStyle.css'



// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from "react-icons/fa";

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


export const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://readymadeui.com/team-1.webp",
    rating: 3,
    text: "ReadymadeUI made it so easy to launch my website. The components are clean, fast to use, and saved me hours of development time.",
  },
  {
    id: 2,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 3,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 4,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 5,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 6,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 7,
    name: "Mark Adair",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
];


export default function Home() {
  const loading = false; // static data so loading false

  return (
    <div>
      <Banner />

      {/* Featured Categories Section */}
      <section className="my-24 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-center font-semibold">Shop By Categories</h1>
        <FeaturedCategories>  </FeaturedCategories>
      </section>

      {/* Promo Section */}
      <section className="my-24 max-w-7xl mx-auto">
        <PromoSection></PromoSection>
      </section> 



      {/* Our Products Section */}
      <section className="my-24 mx-auto px-4 md:max-w-7xl max-w-sm">
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




      {/* Ongoing Offer Section */}
      <section className="mx-auto my-24 px-8 md:max-w-7xl max-w-sm">
        <div className="flex lg:flex-row lg:mb-0 mb-18 flex-col gap-8 lg:gap-0 justify-between">
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center" >
            <Image src={'https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp'} className="rounded-xl" alt="Banner 1" height={350} width={700}>

            </Image>
          </div>
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-5xl font-semibold ">Lorem ipsum dolor sit.</h1>
            <p className="max-w-3xs md:max-w-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consectetur? </p>
            <div className="flex justify-center gap-3 items-center">
              <p className="font-bold text-3xl text-amber-600">85$</p>
              <DefaultButton text="Grab Now"></DefaultButton>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col-reverse gap-6 lg:gap-0 justify-between">
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-5xl font-semibold ">Lorem ipsum dolor sit.</h1>
            <p className="max-w-3xs md:max-w-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consectetur? </p>
            <div className="flex justify-center gap-3 items-center">
              <p className="font-bold text-3xl text-amber-600">85$</p>
              <DefaultButton text="Grab Now"></DefaultButton>
            </div>
          </div>
          <div>
            <Image src={'https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp'} className="rounded-xl" alt="Banner 1" height={350} width={700}>

            </Image>
          </div>
        </div>
      </section>


      {/* New Arrival Section */}
      <section className="mx-auto my-24 px-8 md:max-w-7xl max-w-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold md:w-1/3 w-full">New Arrival</h1>
          <div className="hidden md:flex gap-4">
            <Link href="#" className="hover:text-[#fcab35] font-medium">
              Desk Lamp
            </Link>
            <Link href="#" className="hover:text-[#fcab35] font-medium">
              Mini Blender
            </Link>
            <Link href="#" className="hover:text-[#fcab35] font-medium">
              Grinder
            </Link>
            <Link href="#" className="hover:text-[#fcab35] font-medium">
              Electric Cooker
            </Link>
          </div>

          {/* DROPDOWN (Mobile) */}
          <div className="md:hidden w-full">
            <select
              className="dropdown dropdown-end border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-[#fcab35]"
            >
              <option>Desk Lamp</option>
              <option>Mini Blender</option>
              <option>Grinder</option>
              <option>Electric Cooker</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:mt-12 mt-6 justify-items-center md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {
            allProducts.slice(0, 4).map((product, index) => <NewProductCard product={product} key={index}></NewProductCard>)
          }
        </div>
      </section>




      {/* Weekly Deals Section */}
      <section className="bg-[#ecedec] w-full rounded-2xl my-24  drop-shadow-2xl/30">
        <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse items-center justify-between  px-4 md:px-0">
          {/* For TSX uncomment the commented types below */}
          {/* For TSX uncomment the commented types below */}
          <div className="space-y-6 w-1/2 text-center flex flex-col items-center">
            <h1 className="font-semibold text-4xl">Weekly Deals</h1>
            <p>Don't Miss Out - Gear Up for Victory with This Week's Unmissable Deals!</p>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                <span className="countdown font-mono md:text-5xl text-2xl">
                  <span style={{ "--value": 15 } /* as React.CSSProperties */} aria-live="polite" aria-label='15'>15</span>
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 10 } /* as React.CSSProperties */} aria-live="polite" aria-label='15'>10</span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 24 } /* as React.CSSProperties */} aria-live="polite" aria-label='15'>24</span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 59 } /* as React.CSSProperties */} aria-live="polite" aria-label='15'>59</span>
                </span>
                sec
              </div>
            </div>
            <DefaultButton text="Shop Now"></DefaultButton>
          </div>
          <div className="w-1/2  flex flex-col items-center  justify-center">
            <Image src={bannerImg} alt="Banner Image" height={250} width={250} className="hover:scale-110  duration-300" />
          </div>
        </div>
      </section>


      {/*<Ratings /> */}
      <section className="max-w-7xl my-24 mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          // pagination={{ clickable: true }}
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={800}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-16 .custom-swiper"
        >
          {testimonials.map(({ id, name, image, rating, text }) => (
            <SwiperSlide key={id}>
              <div className="flex flex-col max-w-sm items-center text-center px-3">
                <Image
                  src={image}
                  className="w-24 h-24 rounded-full border-2 border-purple-500"
                  alt={name}
                  height={150}
                  width={150}
                />
                <h4 className="text-sm font-semibold mt-6">{name}</h4>
                <div className="flex justify-center space-x-1 mt-2.5">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-300 font-normal mt-6">{text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>



      {/* Carousel Section */}
      {/* <div className="flex flex-col lg:flex-row text-white">
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
      </div> */}
    </div>
  );
}
