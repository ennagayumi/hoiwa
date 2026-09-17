import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keep development artifacts separate so a production build cannot
  // invalidate a running local preview.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    // Cloudflare Pages serves the exported static files without a Next.js
    // image optimization server.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
