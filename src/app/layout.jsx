import {
  Jost,
  Poppins,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

import AuthProvider from "@/services/AuthProvider";
import Providers from "@/services/providers";

import CartAnimationProvider from "@/components/cart/CartAnimationProvider";

import { Toaster } from "react-hot-toast";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
// });

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
})

export const metadata = {
  title: {
    default: "Elara Bangladesh",
    template: "%s | Elara BD",
  },
  description:
    "Trusted online marketplace for buying products in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${jost.className} antialiased bg-[#fffefe]`}
      >
        <AuthProvider>
          <Providers>
            <CartAnimationProvider>
              <Navbar />
              <Breadcrumbs />

              <div className="mx-auto max-w-sm md:max-w-full lg:max-w-7xl">
                {children}
              </div>

              <Footer />

              <Toaster />
            </CartAnimationProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
