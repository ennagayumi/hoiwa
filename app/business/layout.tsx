import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata, organizationId } from "@/lib/seo";

const title = "事業案内｜肥料原料の輸出入・貿易調整";
const description = "肥料原料の日本向け供給、規格の確認、船積みと通関。海外向けは、取引先が決まってから調整します。";

export const metadata = createPageMetadata(title, description, "/business");

const services = ["日本向け供給", "規格の確認", "船積みと通関", "海外向け"];

const jsonLd = createPageJsonLd("/business", title, description, [
  {
    "@type": "ItemList",
    name: "行うこと",
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
