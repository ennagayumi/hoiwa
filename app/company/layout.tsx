import JsonLd from "@/components/JsonLd";
import { brandWithKana, createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "企業情報";
const description = "帆岩（ほいわ）は、京古斎合同会社の屋号です。千葉県船橋市を拠点に、肥料原料の条件を確認して供給します。";

export const metadata = createPageMetadata(title, description, "/company");

const jsonLd = createPageJsonLd("/company", `${title}｜${brandWithKana}`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
