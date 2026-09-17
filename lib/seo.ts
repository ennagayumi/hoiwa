import type { Metadata } from "next";

export const siteUrl = "https://hoiwajapan.com";
export const siteName = "株式会社帆岩";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  options?: { noIndex?: boolean },
): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: options?.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName,
      title,
      description,
      url: canonical,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteName}｜肥料・肥料原料の国際貿易`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
