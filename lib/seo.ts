import type { Metadata } from "next";
import { operatorName } from "@/data/site";

export { operatorName };

// Canonical origin. Override per environment via NEXT_PUBLIC_SITE_URL
// (e.g. a Cloudflare Pages preview URL) without touching source.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://hoiwajapan.com";
export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const siteName = "帆岩";
export const siteNameEn = "HOIWA";
export const siteNameKana = "ほいわ";
export const brandTitle = `${siteName}（${siteNameEn}）`;
export const brandWithKana = `${siteName}（${siteNameKana}）`;
export const siteAlternateNames = [siteNameKana, siteNameEn, "Hoiwa", operatorName];
export const siteDescription =
  "帆岩は京古斎合同会社が運営する屋号です。中国の提携メーカーと連携し、規格・COA・納期を明確にして肥料原料を日本市場へ供給します。千葉県船橋市。";

// Bump when page content changes so <lastmod> stays truthful.
// Google ignores <lastmod> entirely if it is obviously auto-generated.
export const siteLastModified = "2026-10-03";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

/** Document title suffix. Home is passed in already complete. */
export function withBrandTitle(title: string): string {
  return title.includes(brandTitle) ? title : `${title}｜${brandTitle}`;
}

/**
 * Absolute URL for a route, without a trailing slash. This matches both
 * Next.js' canonical normalisation (trailingSlash: false) and how Cloudflare
 * Pages serves the static export (/business/ and /business.html 301 -> /business).
 */
export function absoluteUrl(path: string): string {
  if (path === "" || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export type SchemaPageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

/**
 * Single registry of public routes. Drives the sitemap, breadcrumbs and
 * per-page structured data so a route cannot be added in one place and
 * forgotten in another.
 */
export const siteRoutes = [
  { path: "/", label: "ホーム", priority: 1, schemaType: "WebPage" },
  { path: "/business", label: "事業案内", priority: 0.9, schemaType: "WebPage" },
  { path: "/products", label: "肥料・肥料原料", priority: 0.9, schemaType: "CollectionPage" },
  { path: "/strengths", label: "当社の強み", priority: 0.7, schemaType: "WebPage" },
  { path: "/trade-flow", label: "お取引の流れ", priority: 0.7, schemaType: "WebPage" },
  { path: "/network", label: "国際貿易ネットワーク", priority: 0.7, schemaType: "WebPage" },
  { path: "/company", label: "企業情報", priority: 0.8, schemaType: "AboutPage" },
  { path: "/news", label: "ニュース", priority: 0.6, schemaType: "CollectionPage" },
  { path: "/contact", label: "お問い合わせ", priority: 0.8, schemaType: "ContactPage" },
  { path: "/privacy", label: "プライバシーポリシー", priority: 0.3, schemaType: "WebPage" },
  { path: "/credits", label: "素材クレジット", priority: 0.1, schemaType: "WebPage", noIndex: true },
] as const satisfies readonly {
  path: string;
  label: string;
  priority: number;
  schemaType: SchemaPageType;
  noIndex?: boolean;
}[];

export type SitePath = (typeof siteRoutes)[number]["path"];

export function getRoute(path: SitePath) {
  const route = siteRoutes.find((r) => r.path === path);
  if (!route) throw new Error(`Unknown route: ${path}`);
  return route;
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  options?: { noIndex?: boolean },
): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = withBrandTitle(title);

  return {
    title,
    description,
    alternates: { canonical },
    robots: options?.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      alternateLocale: ["en_US", "zh_CN"],
      siteName: brandTitle,
      title: fullTitle,
      description,
      url: canonical,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${brandTitle}｜肥料・肥料原料の輸入販売`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

type JsonLd = Record<string, unknown>;

export function createBreadcrumbJsonLd(path: SitePath): JsonLd {
  const items = path === "/" ? [getRoute("/")] : [getRoute("/"), getRoute(path)];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((route, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: route.label,
      item: absoluteUrl(route.path),
    })),
  };
}

export function createWebPageJsonLd(path: SitePath, title: string, description: string): JsonLd {
  const route = getRoute(path);
  const url = absoluteUrl(path);
  return {
    "@type": route.schemaType,
    "@id": `${url}#webpage`,
    url,
    name: withBrandTitle(title),
    description,
    inLanguage: "ja",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image`, width: 1200, height: 630 },
  };
}

/** WebPage + BreadcrumbList graph for a standard subpage. */
export function createPageJsonLd(path: SitePath, title: string, description: string, extra: JsonLd[] = []): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [createWebPageJsonLd(path, title, description), createBreadcrumbJsonLd(path), ...extra],
  };
}
