import JsonLd from "@/components/JsonLd";
import { products } from "@/data/site";
import { absoluteUrl, createPageJsonLd, createPageMetadata, organizationId } from "@/lib/seo";

const title = "肥料・肥料原料｜硫酸アンモニウム・尿素・カリ肥料";
const description = "硫酸アンモニウム（硫安）、尿素、カリ肥料など、用途・規格・包装・仕向地に応じた肥料原料の調達と輸出入を支援します。";

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
