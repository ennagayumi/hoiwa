import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("メディアクレジット", "株式会社帆岩コーポレートサイトで使用しているメディア素材の出典とライセンス情報です。", "/credits", { noIndex: true });

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
