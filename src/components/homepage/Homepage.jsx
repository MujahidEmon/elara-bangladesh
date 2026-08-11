
import Image from "next/image";
import Banner from "./Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import PromoSection from "../FeaturedCategories/promo";
import NewProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductSekeleton";
import DefaultButton from "../shared/DefaultButton/DefaultButton";
import offer2 from '../../../public/offer2.png'




// import required modules
import axios from "axios";
import WeeklyDeals from "../WeeklyDeals/WeeklyDeals";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getProducts } from "@/actions/server/products";
import NewArrivalSection from "./NewArrivalSection/NewArrivalSection";
import CartSlider from "../cart/CartSlider";




// Components



// export const testimonials = [
//   {
//     id: 1,
//     name: "John Doe",
//     image: "https://readymadeui.com/team-1.webp",
//     rating: 3,
//     text: "ReadymadeUI made it so easy to launch my website. The components are clean, fast to use, and saved me hours of development time.",
//   },
//   {
//     id: 2,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
//   {
//     id: 3,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
//   {
//     id: 4,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
//   {
//     id: 5,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
//   {
//     id: 6,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
//   {
//     id: 7,
//     name: "Mark Adair",
//     image: "https://readymadeui.com/team-2.webp",
//     rating: 5,
//     text: "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
//   },
// ];





export default async function Home() {
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 600); 

  const products = await getProducts();


  return (
    <div>
      <Banner />

      {/* Featured Categories Section */}
      <section className="lg:lg:my-16 md:my-12 my-10   ">
        {/* <h1 className="text-3xl md:text-4xl text-center font-semibold">Shop By Categories</h1> */}
        <FeaturedCategories>  </FeaturedCategories>
      </section>


      {/* Our Products Section */}
      <section className="lg:lg:my-16 md:my-12 my-10">
        <SectionHeading title="Our Products" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6 md:mt-12">
          {products.slice(0, 4).map((product) => (
            <NewProductCard product={product} key={product._id}></NewProductCard>
          ))}
        </div>
        <div className="flex justify-center mt-6 ">
          <DefaultButton text="Show All" href="/products"></DefaultButton>
        </div>
      </section>

      {/* Promo Section */}
      <section className="lg:lg:my-16 md:my-12 my-10   ">
        <PromoSection></PromoSection>
      </section>




      {/* Ongoing Offer Section */}
      {/* <section className=" lg:lg:my-16 md:my-12 my-10  px-8 md: max-w-sm">
        <div className="flex lg:flex-row lg:mb-0 mb-18 flex-col gap-10 lg:gap-4 justify-between">
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center" >
            <Image src={offer2} className="rounded-xl" alt="Banner 1" height={350} width={700}>
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
        <div className="flex lg:flex-row-reverse lg:mb-0 mb-18 flex-col gap-10 lg:gap-4 justify-between">
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center" >
            <Image src={'https://i.ibb.co.com/sJW0vqdQ/banner-image-4.webp'} className="rounded-xl" alt="Banner 1" height={350} width={700}>
            </Image>
          </div>
          <div className="lg:w-1/2 w-full flex gap-2 flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-5xl font-semibold ">Lorem ipsum dolor sit.</h1>
            <p className="max-w-3xs md:max-w-lg text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consectetur? </p>
            <div className="flex justify-center gap-3 items-center">
              <p className="font-bold text-3xl text-amber-600">BDT 1500</p>
              <DefaultButton text="Grab Now"></DefaultButton>
            </div>
          </div>
        </div>

        
      </section> */}

      {/* New Arrival Section */}
      <NewArrivalSection products={products}></NewArrivalSection>





      {/* Weekly Deals Section */}
      {/* <WeeklyDeals expiryTimestamp={time}></WeeklyDeals> */}


      {/*<Ratings /> */}
      {/* <section className=" lg:lg:my-16 md:my-12 my-10  ">
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


      <CartSlider></CartSlider>
      {/* Carousel Section */}
      <div className="flex flex-col lg:flex-row text-white lg:lg:my-16 md:my-12 my-10">
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
