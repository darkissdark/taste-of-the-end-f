import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      //   { protocol: "https", hostname: "ftp.goit.study" },
      //   { protocol: "https", hostname: "res.cloudinary.com" },
      //   { protocol: "https", hostname: "st2.depositphotos.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://taste-of-the-end-b.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
