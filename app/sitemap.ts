import type { MetadataRoute } from "next";
import { absoluteUrl, siteLastModified, siteRoutes } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes
    .filter((route) => !("noIndex" in route && route.noIndex))
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: siteLastModified,
      changeFrequency: route.path === "/news" ? "monthly" : "yearly",
      priority: route.priority,
    }));
}
