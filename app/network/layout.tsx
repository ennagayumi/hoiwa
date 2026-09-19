import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "海外ネットワーク｜日本・アジア・アフリカ";
const description = "日本、東南アジア、アフリカを結ぶ肥料・農業資材の取引ネットワーク。供給元、需要家、物流事業者と連携して国際取引を進めます。";

export const metadata = createPageMetadata(title, description, "/network");

const jsonLd = createPageJsonLd("/network", title, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
