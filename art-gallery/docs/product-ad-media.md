# Product-ad media

The homepage and Work gallery share three original, silent, ten-second concept
advertisements for the existing AURA SKIN, SONIQ LAB and NOIR ÉDITION concepts.
These are motion-design compositions made from the product imagery already in
`public/images/products`, with custom typography, animated framing, transitions,
graphic accents and end cards. No online videos are embedded or downloaded.
They are examples, not claims of completed client commissions.

## Rebuild

Run `node scripts/render-product-ads.mjs` from the project root. It uses the installed
Playwright Chromium and local Geist font, blocks network requests, and writes
H.264 MP4s plus JPEG posters to `public/videos`. Portrait films also get a separate
landscape gallery thumbnail, so their lettering stays readable. Pass a concept
slug (for example, `soniq-lab`) to rebuild only that film. Its browser profile is kept in
the ignored `.animation-review` directory. The committed media files are ready
to serve; rendering does not run during a website build.

## Add an example

Add local media and its poster to `public/videos`, then add a `WorkSample` entry
in `src/data/work-samples.ts`. The shared viewer accepts video, GIF and image
entries. Use actual dimensions and durations. Only poster images load in the
gallery; movies mount after a visitor opens a card. Movies stop on close or
navigation. Reduced-motion visitors start with a paused player.

## Offers

`src/data/video-offers.ts` holds the 2 / 3 / 5 video packages and their launch
prices of 499 / 699 / 999 Romanian lei, reduced from 599 / 799 / 1,199 lei.
No billing frequency, revisions or delivery promises have been inferred.
Offer buttons carry their selection to the existing contact email workflow.
The old work and subscription detail URLs redirect to the gallery or offers.
The Products gallery and its detail pages retain their existing behavior.

## Verify

With the site running locally, run `node scripts/review-product-media.mjs`.
Set `REVIEW_BASE_URL` to test another local port. The check exercises actual
video decoding, seeking, portrait playback, modal focus, lazy loading, enquiry
selection, redirects, responsive layouts and the sitemap. Review screenshots
are written inside `.animation-review`.
