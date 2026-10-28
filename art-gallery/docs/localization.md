# Languages and offer emphasis

Romanian (`ro`) is the default language. French (`fr`) and English (`en`) remain
available at their existing URLs. The header language selector retains the
current page, query parameters (including the selected offer), and URL fragment.
Unknown localized URLs use the corresponding translated 404 page.

Shared dictionary copy is in `src/i18n/ro.ts`. Inline interface translations are
in `src/i18n/ui.ts`. Product studies are translated in `src/data/product-ro.ts`;
the supplied film titles and categories are in `client-video-manifest.json`.
Brand identities, video files, poster images, specifications, and package
amounts are preserved. Text already embedded in client videos is unchanged.

The larger crossed-out prices, savings labels, and tier badges are scoped to
the premium offer selectors in `src/app/globals.css`. Romanian uses `ro-RO`
number formatting. The 2/3/5-video packages still cost 499/699/999 lei, reduced
from 599/799/1,199 lei.

Run `node scripts/verify-romanian.mjs` against a running local site to check all
three languages, language switching, Romanian pages and product studies, video
playback, 404s, metadata, discount sizes, and responsive card boundaries.
Set `REVIEW_BASE_URL` to use another local port. Screenshots go to the ignored
`.animation-review/romanian` directory; development files are excluded from
hosting uploads by `.vercelignore`.
