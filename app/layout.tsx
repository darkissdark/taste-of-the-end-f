import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Outlet } from "@/components/layout/Outlet/Outlet";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import IconsSprite from "@/components/ui/icons/IconsSprite";
import { defaultMetadata } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <IconsSprite />
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
