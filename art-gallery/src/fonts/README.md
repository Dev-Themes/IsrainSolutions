# Self-hosted typefaces

Geist and Geist Mono variable Latin WOFF2 subsets, used unchanged. These are the same Google Fonts files previously used by the project's `next/font/google` setup. Both cover the site's English and French text.

The files are now bundled with the project and loaded through `next/font/local`, removing Google Fonts network requests from builds. Sans is preloaded; Mono loads on demand. Both use `font-display: swap`.

Font sources: https://github.com/vercel/geist-font and https://github.com/google/fonts/tree/main/ofl/geist (Geist Mono: `ofl/geistmono`). Redistribution notices and complete SIL Open Font Licenses are included alongside the fonts.
