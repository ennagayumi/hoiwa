import JsonLd from "@/components/JsonLd";
import { brandWithKana, createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "ニュース・お知らせ";
const description = "帆岩（ほいわ）からのお知らせ、肥料・肥料原料の輸出入事業に関する最新情報をご案内します。";

export const metadata = createPageMetadata(title, description, "/news");

const jsonLd = createPageJsonLd("/news", `${title}｜${brandWithKana}`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
