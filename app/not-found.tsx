import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description: "お探しのページは移動または削除された可能性があります。",
  // Override what the root layout would otherwise pass down: a 404 must not
  // be indexed and must not declare the home page as its canonical URL.
  robots: { index: false, follow: true },
  alternates: {},
  openGraph: { type: "website", locale: "ja_JP", siteName: "株式会社帆岩", title: "ページが見つかりません" },
};

export default function NotFound() {
  return (
    <>
      <PageHero en="404 Not Found" title="ページが見つかりません" lead="お探しのページは移動または削除された可能性があります。" />
      <section className="section shell not-found">
        <p>URL をご確認いただくか、以下のリンクからお進みください。</p>
        <nav aria-label="主要ページ" className="not-found__links">
          <Link className="button-link" href="/">ホームへ戻る</Link>
          <Link className="text-link" href="/products">肥料・肥料原料<span>›</span></Link>
          <Link className="text-link" href="/business">事業案内<span>›</span></Link>
          <Link className="text-link" href="/contact">お問い合わせ<span>›</span></Link>
        </nav>
      </section>
    </>
  );
}
