import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "調達と供給のネットワーク";
const description = "中国で製造し、日本へ供給します。確認できる相手と、確認できる条件で、肥料原料をお届けします。";

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
