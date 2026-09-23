import JsonLd from "@/components/JsonLd";
import { products } from "@/data/site";
import { absoluteUrl, createPageJsonLd, createPageMetadata, organizationId } from "@/lib/seo";

const title = "肥料原料｜硫酸マグネシウム・硫酸アンモニウム";
const description = "主力は硫酸マグネシウムと硫酸アンモニウムです。硫酸マグネシウムは天津の提携メーカーが製造し、帆岩が日本側の窓口です。規格、粒度、包装は、サンプルとロットのCOAで確認してから契約します。";

export const metadata = createPageMetadata(title, description, "/products");

const jsonLd = createPageJsonLd("/products", title, description, [
  {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/products")}#products`,
    name: "主な取扱商品",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        alternateName: p.en,
        description: p.description,
        category: "肥料・肥料原料",
        ...("image" in p ? { image: absoluteUrl(p.image) } : {}),
        // Price is quoted per project, so no Offer is published; the seller
        // relationship is expressed through the Organization node instead.
        url: absoluteUrl("/products"),
        subjectOf: { "@id": organizationId },
      },
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
