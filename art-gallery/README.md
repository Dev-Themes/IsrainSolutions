This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Branding and search metadata

The canonical production origin is `https://israin-solutions.vercel.app`. Override it with `NEXT_PUBLIC_SITE_URL` before building if the domain changes. Canonicals, language alternates, Open Graph URLs, structured data, robots.txt, and the sitemap use this shared setting.

Original artwork lives in `public/Brand Asset/`. Run `node scripts/prepare-brand-assets.mjs` after updating artwork with the same source canvas dimensions to regenerate the transparent display logos, browser icons, and the 1200 × 630 social card. The social card is derived exclusively from `Logo.png` (the plain logo); the header and footer use the transparent artwork.

## Appearance and experience checks

Use the sun/moon button in the header to switch directly between Light and Dark. The initial theme follows the device; clicking the button saves an explicit preference across pages and reloads. The supplied logo images retain their original colours in both themes. Geist variable fonts are self-hosted in `src/fonts`, so builds do not require Google Fonts downloads.

The approved homepage animation is isolated from the site theme and remains unchanged. Product filters, case-study links, image previews, keyboard and swipe navigation work in both themes.

With the development server running, run `node scripts/verify-experience.mjs`. To test another local server, set `TEST_URL` before running it. The check covers themes, saved/device preferences, English/French routes, responsive layouts, filtering, lightbox accessibility, and the protected animation/logo hashes when the local baseline is available.

Original product concept imagery and prompt documentation: `docs/product-imagery.md`. Production assets are in `public/images/products`.

The approved Work photography is also self-hosted in `public/images/work`. Its original source URLs and local mappings are recorded in `src/data/work-image-manifest.json`. Run `node scripts/cache-work-images.mjs` only when adding or updating Work source photos; this requires network access, while normal builds and rendering do not.

The supplied `public/Brand Asset/white-theme-logo.png` is used on light surfaces without a backing container. Run `node scripts/prepare-light-brand-assets.mjs` to regenerate its display assets. Header navigation measures its available space and switches to a hamburger only when the full links do not fit.
