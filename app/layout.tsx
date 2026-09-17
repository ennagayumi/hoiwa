import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "株式会社帆岩｜肥料・肥料原料の輸出入・国際貿易", template: "%s｜株式会社帆岩" },
  description: "株式会社帆岩は、肥料・肥料原料を中心に、日本、東南アジア、アフリカ市場をつなぐ国際貿易会社です。商品選定から仕様確認、物流、納品まで一貫して調整します。",
  keywords: ["株式会社帆岩", "肥料 輸入", "肥料 輸出", "硫酸アンモニウム", "硫安", "尿素", "カリ肥料", "肥料原料", "アフリカ 肥料", "貿易会社", "輸出入", "化学品貿易", "農業資材", "Japan fertilizer trading company", "Ammonium Sulfate Japan", "Urea Japan"],
  openGraph: {
    type: "website", locale: "ja_JP", siteName: "株式会社帆岩", title: "株式会社帆岩｜大地を育てる力を、必要な場所へ。",
    description: "肥料・肥料原料を中心に、アジアとアフリカの市場をつなぐ国際貿易会社です。",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "株式会社帆岩" }],
  },
  twitter: { card: "summary_large_image" },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><LanguageProvider><Header /><main>{children}</main><Footer /></LanguageProvider></body></html>;
}
