
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton";

const Banner = () => {

  const { data: adminSlides = [] } = useQuery({
    queryKey: ["homepage-banners"],
    queryFn: async () => {
      const { data } = await axios.get("/api/banners");
      return data;
    },
  });
  console.log(adminSlides[0]);

  const { bannerImage, buttonText, heading, paragraph } = adminSlides[0] || {};


  return (
    <div className="w-full">
      <Swiper
        navigation
        modules={[Navigation]}
        className="hero-banner-swiper "
      >
        {adminSlides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="md:max-w-full rounded-sm max-w-sm mx-auto md:h-[500px] h-90 bg-cover bg-center flex flex-col md:items-start items-center justify-center gap-8 md:p-10 p-6 lg:p-16"
              style={{ backgroundImage: `url(${slide.bannerImage})` }}
            >
              <div className="md:w-1/2 w-full flex flex-col md:items-start items-center justify-center gap-8">
                <h1 className="text-3xl md:text-5xl">{slide.heading}</h1>
                <p className="text-lg md:text-neutral text-center md:text-xl">{slide.paragraph}</p>
                <DefaultButton text={slide.buttonText} href="/products"></DefaultButton>

              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;