# Service Areas How-To

To build out the programmatic local landing pages:

1. Open `src/config/serviceAreas.ts`.
2. For each real service area (e.g. Richmond, TX), add an entry with its actual `city`, `slug`, `neighborhoods`, and any custom `localNote`.
3. Create the dynamic routes by duplicating the `src/app/ac-repair-[slug]` pattern (e.g. `src/app/ac-repair/[slug]/page.tsx`), and using `generateStaticParams` pointing to `serviceAreas`.
4. Inside these generated routes, use the placeholder data populated in the component to customize the H1, text, and metadata.
5. Once `serviceAreas.ts` contains real cities instead of placeholders, remove any `<meta name="robots" content="noindex" />` directives from those pages and ensure they are added to `sitemap.ts`.
