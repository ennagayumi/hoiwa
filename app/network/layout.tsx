import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "確認できる相手がいる地域｜中国・日本";
const description = "工場への確認は中国の提携会社、日本の需要家への条件提示は帆岩が行います。東南アジアとアフリカは、取引先が決まった案件から対応します。";

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
