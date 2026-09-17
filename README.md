# 株式会社帆岩 Corporate Website

肥料原料と機械設備を中核に、アジア・アフリカ市場を結ぶ貿易会社の企業サイトです。Next.js 15 / TypeScript / SCSS で構築しています。

## Local development

```bash
npm install
npm run dev
```

## Before production launch

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the official domain.
2. Replace every `【公開前に入力】` field with confirmed corporate information.
3. Replace `2026.XX.XX` news dates with confirmed publication dates.
4. Connect the contact form in `components/ContactForm.tsx` to an approved mail/API service and remove its demo notice.
5. Reconfirm the photo license and source list in `IMAGE_SOURCES.md`.
6. Run `npm run build` before deployment.
