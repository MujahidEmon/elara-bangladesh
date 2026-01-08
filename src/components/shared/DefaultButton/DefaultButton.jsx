'use client';
import Link from "next/link";

const DefaultButton = ({ text = "Button Text", href = "#" }) => {
  return (
    <Link
      href={href}
      className="relative inline-block px-5 py-2.5 overflow-hidden rounded 
                 bg-[#fcab35] text-white group
                 hover:bg-linear-to-r hover:from-[#fcab35] hover:to-[#ffd27a]
                 hover:ring-2 hover:ring-offset-2 hover:ring-[#fcab35]
                 transition-all ease-out duration-300"
    >
      <span
        className="absolute right-0 w-8 h-32 -mt-12 
                   bg-white opacity-10 rotate-12
                   transform translate-x-12
                   transition-all duration-1000 ease
                   group-hover:-translate-x-40"
      />
      <span className="relative font-semibold">{text}</span>
    </Link>
  );
};

export default DefaultButton;
