import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "企業情報";
const description = "東京を窓口に、肥料原料の条件を確認して供給する株式会社帆岩（Hoiwa Co., Ltd.）の企業理念と会社概要です。";

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
