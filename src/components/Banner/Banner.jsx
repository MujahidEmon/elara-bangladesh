'use client';
import Image from "next/image";
import bannerImg from '../../../public/t109.png'

const Banner = () => {
  return (
    <section className="md:w-full w-sm mx-auto lg:h-[calc(100vh-69px)]  md:h-[60vh] h-[40vh] bg-white">
      <div className="max-w-7xl mx-auto h-full flex items-center">

        {/* LEFT CONTENT */}
        <div className="w-1/2 space-y-3 lg:space-y-6 md:space-y-4">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-tight">
            The Rise Of Specialized <br />
            Gaming Controllers
          </h1>

          <p className="text-gray-600 md:max-w-md max-w-sm">
            Exploring the Diverse Ecosystem of Specialized Gaming Controllers
          </p>

          <button className="bg-[#fcab35] hover:bg-orange-600 text-black hover:text-white btn font-semibold transition">
            Purchase Now →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-1/2 h-full">
          <Image
            src={bannerImg}
            alt="Gaming Controller"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;
