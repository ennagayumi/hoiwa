import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import { contactEmail } from "@/data/site";
import { absoluteUrl, createPageMetadata, organizationId, siteDescription, siteName, siteNameEn, siteUrl, websiteId } from "@/lib/seo";
import "./globals.scss";

const homeTitle = "株式会社帆岩｜肥料・肥料原料の輸出入・国際貿易";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  ...createPageMetadata(homeTitle, siteDescription, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s｜${siteName}` },
  applicationName: siteName,
  keywords: ["株式会社帆岩", "Hoiwa", "肥料 輸入", "肥料 輸出", "硫酸アンモニウム", "硫安", "尿素", "カリ肥料", "肥料原料", "アフリカ 肥料", "貿易会社", "輸出入", "化学品貿易", "農業資材", "Japan fertilizer trading company", "Ammonium Sulfate Japan", "Urea Japan"],
  category: "肥料・農業資材・国際貿易",
  formatDetection: { telephone: false, email: false, address: false },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      alternateName: [siteNameEn, "帆岩", "Hoiwa"],
      legalName: siteName,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", "@id": `${siteUrl}/#logo`, url: `${siteUrl}/icon.svg`, contentUrl: `${siteUrl}/icon.svg`, caption: siteName },
      image: { "@id": `${siteUrl}/#logo` },
      description: "肥料・肥料原料を中心に、日本、東南アジア、アフリカ市場をつなぐ国際貿易会社です。",
      slogan: "大地を育てる力を、必要な場所へ。",
      areaServed: ["JP", "VN", "Asia", "Africa"],
      knowsAbout: ["肥料", "肥料原料", "硫酸アンモニウム", "尿素", "カリ肥料", "国際貿易", "輸出入", "Ammonium Sulfate", "Urea", "Potash"],
      knowsLanguage: ["ja", "en", "zh"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        url: `${siteUrl}/contact`,
        availableLanguage: ["Japanese", "English", "Chinese"],
        areaServed: ["JP", "Asia", "Africa"],
      },
      email: contactEmail,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: siteName,
      alternateName: siteNameEn,
      description: siteDescription,
      publisher: { "@id": organizationId },
      inLanguage: ["ja", "en", "zh"],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <JsonLd data={structuredData} />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
