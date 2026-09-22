import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "当社の強み｜肥料貿易の調達・品質・物流対応";
const description = "工場への確認、契約前のサンプルとCOA、日本語での条件提示。株式会社帆岩が肥料原料の取引で行うことです。";

export const metadata = createPageMetadata(title, description, "/strengths");

const jsonLd = createPageJsonLd("/strengths", title, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
