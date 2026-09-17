import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPageMetadata, siteName, siteUrl } from "@/lib/seo";
import "./globals.scss";

export const metadata: Metadata = {
  ...createPageMetadata(
    "株式会社帆岩｜肥料・肥料原料の輸出入・国際貿易",
    "株式会社帆岩は、硫酸アンモニウム、尿素、カリ肥料などの肥料・肥料原料を中心に、日本、東南アジア、アフリカ市場をつなぐ国際貿易会社です。",
    "/",
  ),
  metadataBase: new URL(siteUrl),
  title: { default: "株式会社帆岩｜肥料・肥料原料の輸出入・国際貿易", template: `%s｜${siteName}` },
  keywords: ["株式会社帆岩", "肥料 輸入", "肥料 輸出", "硫酸アンモニウム", "硫安", "尿素", "カリ肥料", "肥料原料", "アフリカ 肥料", "貿易会社", "輸出入", "化学品貿易", "農業資材", "Japan fertilizer trading company", "Ammonium Sulfate Japan", "Urea Japan"],
  category: "肥料・農業資材・国際貿易",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        alternateName: "Hoiwa Co., Ltd.",
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        description: "肥料・肥料原料を中心に、日本、東南アジア、アフリカ市場をつなぐ国際貿易会社です。",
        areaServed: ["JP", "Asia", "Africa"],
        knowsAbout: ["肥料", "肥料原料", "硫酸アンモニウム", "尿素", "カリ肥料", "国際貿易", "輸出入"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: ["ja", "en", "zh"],
      },
    ],
  };

  return <html lang="ja"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><LanguageProvider><Header /><main>{children}</main><Footer /></LanguageProvider></body></html>;
}
