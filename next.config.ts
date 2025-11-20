import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ftp.goit.study' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      //   { protocol: "https", hostname: "st2.depositphotos.com" },
    ],
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
