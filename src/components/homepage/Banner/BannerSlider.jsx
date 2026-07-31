'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton";

const BannerSlider = ({ banners }) => {
  return (
    <div className="">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {banners.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className=" mx-auto rounded-lg md:h-[500px] h-80 bg-cover bg-center flex flex-col md:items-start items-center justify-center gap-8 md:p-10 p-6 lg:p-16"
              style={{ backgroundImage: `url(${slide.bannerImage})` }}
            >
              <div className="md:w-1/2 w-full flex flex-col md:items-start items-center justify-center gap-8">
                <h1 className="text-3xl md:text-5xl">{slide.heading}</h1>

                <p className="text-lg md:text-neutral text-center md:text-xl">
                  {slide.paragraph}
                </p>

                <DefaultButton
                  text={slide.buttonText}
                  href="/products"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;