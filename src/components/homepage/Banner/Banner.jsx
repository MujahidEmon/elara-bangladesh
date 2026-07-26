"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bannerImg from "../../../../public/t109.png";
import controllerImg from "../../../../public/109.png";
import promoImg from "../../../../public/Untitled design (6).png";

const fallbackSlides = [
  {
    eyebrow: "Elara Essentials",
    title: "Smart home products for everyday comfort",
    subtitle: "Explore useful appliances, lights, bags, and lifestyle picks with trusted local service.",
    buttonText: "Shop Now",
    image: bannerImg,
    href: "/products?search=smart",
    placement: "carousel",
    discount: "Up to 35% off",
  },
  {
    eyebrow: "Desk Setup",
    title: "Premium lamps and gadgets for a cleaner setup",
    subtitle: "Curated accessories that make work, study, and home routines easier.",
    buttonText: "Explore Deals",
    image: controllerImg,
    href: "/products?search=gaming",
    placement: "carousel",
    discount: "New Arrivals",
  },
  {
    eyebrow: "Hot Deal",
    title: "Kitchen helpers at friendly prices",
    subtitle: "Compact products for daily use.",
    buttonText: "View Products",
    image: promoImg,
    href: "/products?search=appliance",
    placement: "side",
    discount: "Save more",
  },
  {
    eyebrow: "Best Pick",
    title: "Desk lamps for study and work",
    subtitle: "Bright, compact, and easy to use.",
    buttonText: "Shop Lamps",
    image: controllerImg,
    href: "/products?search=lamp",
    placement: "side",
    discount: "From 499 Tk",
  },
];

const normalizeBanner = (banner) => ({
  ...banner,
  image: banner.image || banner.imageUrl || banner.photo || banner.bannerImage,
  href: banner.href || banner.link || banner.buttonLink || "/products",
  buttonText: banner.buttonText || banner.buttonLabel || banner.ctaText || "Shop Now",
});

const Banner = () => {
  const { data: adminSlides = [] } = useQuery({
    queryKey: ["homepage-banners"],
    queryFn: async () => {
      const { data } = await axios.get("/api/banners");
      return data;
    },
  });

  const banners = (adminSlides.length ? adminSlides : fallbackSlides)
    .map(normalizeBanner)
    .filter((banner) => banner.image && banner.title);
  const carouselSlides = banners.filter((slide) => slide.placement !== "side");
  const sidePromo =
    banners.find((slide) => slide.placement === "side") ||
    fallbackSlides.find((slide) => slide.placement === "side");
  const slides = carouselSlides.length ? carouselSlides : fallbackSlides.filter((slide) => slide.placement === "carousel");

  return (
    <section className="bg-[#faf8f4] px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_392px]">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="hero-banner-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide._id || slide.title}>
                <Link
                  href={slide.href || "/products"}
                  className="relative block aspect-[2.5/1] min-h-[250px] overflow-hidden bg-[#f3f3f3] lg:min-h-[340px]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1280px) 856px, 100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  {slide.showTextOverlay && (
                    <div className="absolute inset-0 flex items-center bg-black/25 px-8 md:px-14">
                      <div className="max-w-md text-white">
                        {slide.eyebrow && <p className="text-sm font-semibold text-[#fcab35]">{slide.eyebrow}</p>}
                        <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-5xl">{slide.title}</h1>
                        {slide.subtitle && <p className="mt-3 text-base font-medium">{slide.subtitle}</p>}
                      </div>
                    </div>
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {sidePromo && (
          <Link
            href={sidePromo.href || "/products"}
            className="relative hidden min-h-[340px] overflow-hidden rounded-lg bg-[#f3f3f3] shadow-sm lg:block"
          >
              <Image
                src={sidePromo.image}
                alt={sidePromo.title || "Elara product deal"}
                fill
                sizes="392px"
                className="object-cover"
                priority
              />
              {sidePromo.showTextOverlay && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/15 to-transparent px-7 py-7">
                  {sidePromo.eyebrow && <p className="text-xs font-semibold text-[#fcab35]">{sidePromo.eyebrow}</p>}
                  <h2 className="mt-2 max-w-xs text-2xl font-semibold leading-tight text-slate-950">{sidePromo.title}</h2>
                </div>
              )}
          </Link>
        )}

      </div>
    </section>
  );
};

export default Banner;
