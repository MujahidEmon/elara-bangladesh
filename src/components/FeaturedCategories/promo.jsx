'use client';
import Image from "next/image";

import headsetImg from "../../../public/feature1.jpg";
import mouseImg from "../../../public/feature3.jpg";
import keyboardImg from "../../../public/feature2.jpg";

const PromoSection = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1 */}
          <div className="relative h-[480px] md:h-[520px] lg:h-[420px] rounded-2xl overflow-hidden group">
            <Image
              src={headsetImg}
              alt="Agis Quantum Headset"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <span className="text-sm tracking-widest">PRIMAL</span>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Agis Quantum <br /> Headset
                </h3>
                <button className="bg-orange-500 hover:bg-orange-600 
                  px-5 py-2 rounded-md font-semibold w-fit">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="relative md:h-[420px] h-[280px] rounded-2xl overflow-hidden group md:col-span-1 lg:col-span-2">
            <Image
              src={mouseImg}
              alt="Nighthawk Pro Gaming Mouse"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white text-center">
              <span className="text-sm tracking-widest">PRECISION</span>

              <div className="space-y-4">
                <h3 className="text-3xl font-semibold">
                  Nighthawk Pro <br /> Gaming Mouse
                </h3>
                <button className="bg-orange-500 hover:bg-orange-600 
                  px-6 py-2 rounded-md font-semibold mx-auto">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="relative h-[480px] md:h-[520px] lg:h-[420px] rounded-2xl overflow-hidden group">
            <Image
              src={keyboardImg}
              alt="Hydra Ergomic Keyboard"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white text-right">
              <span className="text-sm tracking-widest">COMFORT</span>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Hydra Ergomic <br /> Keyboard
                </h3>
                <button className="bg-orange-500 hover:bg-orange-600 
                  px-5 py-2 rounded-md font-semibold ml-auto">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PromoSection;
