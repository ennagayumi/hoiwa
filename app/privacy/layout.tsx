import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("プライバシーポリシー", "株式会社帆岩の個人情報保護方針をご案内します。", "/privacy");

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
