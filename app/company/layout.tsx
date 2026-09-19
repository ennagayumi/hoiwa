import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "企業情報";
const description = "肥料・肥料原料を中核に、日本とアジア・アフリカをつなぐ国際貿易会社、株式会社帆岩（Hoiwa Co., Ltd.）の企業理念と会社概要をご紹介します。";

export const metadata = createPageMetadata(title, description, "/company");

const jsonLd = createPageJsonLd("/company", `${title}｜株式会社帆岩`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
