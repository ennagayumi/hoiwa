import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep development artifacts separate so a production build cannot
  // invalidate a running local preview.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
