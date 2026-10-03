import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import { contactEmail, officeBuilding, officeLocality, officePostalCode, officeRegion, officeStreet } from "@/data/site";
import { absoluteUrl, brandTitle, createPageMetadata, operatorName, organizationId, siteAlternateNames, siteDescription, siteUrl, websiteId } from "@/lib/seo";
import "./globals.scss";

const homeTitle = `${brandTitle}｜肥料・肥料原料の輸入販売｜${operatorName}`;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  ...createPageMetadata(homeTitle, siteDescription, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s｜${brandTitle}` },
  applicationName: brandTitle,
  keywords: ["帆岩", "帆岩（HOIWA）", "ほいわ", "京古斎合同会社", "HOIWA", "Hoiwa", "肥料 輸入", "肥料原料", "硫酸マグネシウム", "硫酸アンモニウム", "硫安", "肥料 輸出", "貿易会社", "輸出入", "化学品貿易", "Japan fertilizer trading company", "Magnesium Sulfate", "Ammonium Sulfate Japan"],
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
      name: brandTitle,
      alternateName: siteAlternateNames,
      legalName: operatorName,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", "@id": `${siteUrl}/#logo`, url: `${siteUrl}/icon.svg`, contentUrl: `${siteUrl}/icon.svg`, caption: brandTitle },
      image: { "@id": `${siteUrl}/#logo` },
      description: `${brandTitle}は、${operatorName}が運営する屋号です。`,
      address: {
        "@type": "PostalAddress",
        postalCode: officePostalCode,
        addressRegion: officeRegion,
        addressLocality: officeLocality,
        streetAddress: `${officeStreet} ${officeBuilding}`,
        addressCountry: "JP",
      },
      slogan: "規格と納期を明確にして、肥料原料を供給する。",
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
      name: brandTitle,
      alternateName: siteAlternateNames,
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
