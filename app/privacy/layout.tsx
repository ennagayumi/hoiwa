import JsonLd from "@/components/JsonLd";
import { brandTitle, createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "プライバシーポリシー";
const description = "京古斎合同会社（帆岩）の個人情報保護方針をご案内します。";

export const metadata = createPageMetadata(title, description, "/privacy");

const jsonLd = createPageJsonLd("/privacy", `${title}｜${brandTitle}`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
