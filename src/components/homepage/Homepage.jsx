'use client';

import Image from "next/image";
import Link from "next/link";
import Banner from "./Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import PromoSection from "../FeaturedCategories/promo";
import NewProductCard from "../ProductCard/ProductCard";
import DefaultButton from "../shared/DefaultButton/DefaultButton";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../../app/swiperStyle.css'



// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Timer from "../Timer/Timer";

//Timer
import { useTimer } from 'react-timer-hook';
import WeeklyDeals from "../WeeklyDeals/WeeklyDeals";




// Components



const getAllProducts = async () => {
  const { data } = await axios.get('http://localhost:3000/products/api/get-all');
  // console.log(data);
  return data;
}

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
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const [products, setProducts] = useState([])


  //timer functionality
  


  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products/api/get-all");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [])
  console.log(products);
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
            products.slice(0,4).map((product, index) => <NewProductCard product={product} key={index}></NewProductCard>)
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
            products.slice(0, 4).map((product, index) => <NewProductCard product={product} key={index}></NewProductCard>)
          }
        </div>
      </section>




      {/* Weekly Deals Section */}
      <WeeklyDeals expiryTimestamp={time}></WeeklyDeals>


      {/*<Ratings /> */}
      {/* <section className="max-w-7xl my-24 mx-auto">
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
      </section> */}



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
