import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com','res.cloudinary.com','avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    unoptimized: true, // Disable Next.js optimization for external images
  },
};

export default nextConfig;
