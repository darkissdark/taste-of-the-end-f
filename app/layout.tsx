import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Outlet } from "@/components/layout/Outlet/Outlet";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";

import "modern-normalize/modern-normalize.css";
import "./globals.css";

// 400 Regular
// 600 SemiBold
// 700 Bold
const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Базовий заголовок",
  description: "Базовий опис",
  icons: {
    icon: "/favicon.svg",
  },
  // openGraph: {
  //   images: [
  //     {
  //       url: "https://st2.depositphotos.com/3827765/5416/v/600/depositphotos_54165269-stock-illustration-stork-carrying-a-baby.jpg",
  //       width: 600,
  //       height: 446,
  //       alt: "опис зображення",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Header />
        <Outlet children={children} />
        <Footer />
        <Toaster position="top-right" />
        {/* toast.success("Saved successfully!");
        toast.error("Something went wrong!"); */}
      </body>
    </html>
  );
}
