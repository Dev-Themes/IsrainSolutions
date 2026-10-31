# Self-hosted typefaces

The original Geist and Geist Mono variable Latin WOFF2 subsets remain preserved. They are the Google Fonts files previously used by the project's `next/font/google` setup, covering English and French but missing several Romanian glyphs.

The active `*-Romanian-Variable.woff2` derivatives add `ă Ș ș Ț ț` using composite glyphs built from each font's existing base letters, breve and comma. Existing outlines and metrics are retained. The derived font families are named PopArtGeist and PopArtGeistMono, with the original SIL Open Font License notices preserved. Reproduce them offline with `python scripts/prepare-romanian-fonts.py` (requires fontTools and Brotli). The script verifies all ten Romanian lowercase/uppercase letters. External font downloads were unavailable in the build environment.

The files are now bundled with the project and loaded through `next/font/local`, removing Google Fonts network requests from builds. Sans is preloaded; Mono loads on demand. Both use `font-display: swap`.

Font sources: https://github.com/vercel/geist-font and https://github.com/google/fonts/tree/main/ofl/geist (Geist Mono: `ofl/geistmono`). Redistribution notices and complete SIL Open Font Licenses are included alongside the fonts.
