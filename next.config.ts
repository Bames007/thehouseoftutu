import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "http", // Note: the error shows http://, not https
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https", // Also add https variant
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
