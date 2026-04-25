import { Anek_Bangla, Geist, Geist_Mono, Raleway, Titillium_Web } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";
import Providers from "@/services/providers";



const raleway = Raleway(
  {
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"], 
  }
)

export const metadata = {
  title: {
    default: "Elara Bangladesh",
    template: "%s | Elara BD",
  },
  description: "Trusted online marketplace for buying products in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${raleway.className} antialiased bg-[#fffefe]`}
      >
        <AuthProvider>
          <Providers>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <Toaster></Toaster>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
