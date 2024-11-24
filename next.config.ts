import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com'],  // Combine both domains in a single array
  },
};

export default nextConfig;
