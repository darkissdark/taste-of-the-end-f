import type { NextConfig } from "next";

const backendRewriteTarget =
  process.env.API_BASE_URL ?? "https://taste-of-the-end-b.onrender.com";

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
        destination: `${backendRewriteTarget.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
