# Languages and offer emphasis

Romanian (`ro`) is the default language. French (`fr`) and English (`en`) remain
available at their existing URLs. The header language selector retains the
current page, query parameters (including the selected offer), and URL fragment.
Unknown localized URLs use the corresponding translated 404 page.

Editable copy is in `src/content/pages/*.config.json`; shared navigation is in
`src/content/navigation.config.json`. `src/i18n` now loads these files.
Film titles, categories and shared product stills are in `src/content/media.config.json`.
Products displays static client-video stills; former study URLs redirect to the gallery.
See `CLIENT-EDITING-GUIDE.md` for editing instructions.
Brand identities, video files, poster images, specifications, and package
amounts are preserved. Text already embedded in client videos is unchanged.

The larger crossed-out prices, savings labels, and tier badges are scoped to
the premium offer selectors in `src/app/globals.css`. Romanian uses `ro-RO`
number formatting. The 2/3/5-video packages still cost 499/699/999 lei, reduced
from 599/799/1,199 lei.

Run `node scripts/verify-romanian.mjs` against a running local site to check all
three languages, language switching, Romanian pages and static product stills, video
playback, 404s, metadata, discount sizes, and responsive card boundaries.
Set `REVIEW_BASE_URL` to use another local port. Screenshots go to the ignored
`.animation-review/romanian` directory; development files are excluded from
hosting uploads by `.vercelignore`.
