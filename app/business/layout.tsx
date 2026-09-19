import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata, organizationId } from "@/lib/seo";

const title = "事業案内｜肥料原料の輸出入・貿易調整";
const description = "肥料・肥料原料の輸出入を中心に、商品選定、仕様・品質確認、船積み、通関、物流、納品まで一貫して調整します。";

export const metadata = createPageMetadata(title, description, "/business");

const services = ["国際貿易", "輸入業務", "輸出業務", "海外調達", "国内販売", "取引先開拓", "貿易コーディネーション", "物流・供給調整"];

const jsonLd = createPageJsonLd("/business", title, description, [
  {
    "@type": "ItemList",
    name: "事業領域",
    itemListElement: services.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name, provider: { "@id": organizationId }, areaServed: ["JP", "Asia", "Africa"] },
    })),
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
