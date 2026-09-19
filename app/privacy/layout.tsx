import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "プライバシーポリシー";
const description = "株式会社帆岩の個人情報保護方針をご案内します。";

export const metadata = createPageMetadata(title, description, "/privacy");

const jsonLd = createPageJsonLd("/privacy", `${title}｜株式会社帆岩`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
