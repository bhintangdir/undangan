import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true, // For static export compatibility
  },
};

export default nextConfig;
