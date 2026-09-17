import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const paths = ["", "/business", "/products", "/network", "/strengths", "/trade-flow", "/company", "/news", "/contact", "/privacy", "/credits"];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
