import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "当社の強み｜肥料貿易の調達・品質・物流対応";
const description = "国際ネットワーク、柔軟な調達、仕様・品質確認、貿易・物流調整を通じて、肥料原料の安定した取引を支えます。";

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
