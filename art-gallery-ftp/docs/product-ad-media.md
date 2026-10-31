# Product-ad media

The homepage features FOLDEAT, RICINUS and MOS. The Work gallery contains only
all 27 client-supplied videos. Generated demonstration videos have been removed.
The original footage and sound are preserved.

## Client footage and thumbnails

`src/content/media.config.json` records every supplied filename, measured
duration and dimensions, group, localized title, and manually reviewed poster
timestamp. The original video files and their sound are preserved. Filename
segments are URL-encoded so spaces, accents and Chinese characters work.

Run `node scripts/prepare-client-posters.mjs` with the local server running to
rebuild the WebP posters and archive tiles. Portrait footage is fitted into
4:5 tiles with a soft background extension, preserving product labels rather
than cropping them. The Miu Miu poster removes the original video's embedded
black side bars; the video itself is unchanged. Archive filters cover beauty,
lifestyle, fashion, fragrance and motion; the viewer navigates within the
current filter. The large FOLDEAT homepage preview uses its landscape poster.

`node scripts/catalog-client-videos.mjs` generates review-only contact sheets
and technical measurements inside `.animation-review/client-videos`.

## Add an example

Add local media to `public/videos`, prepare its full poster and 4:5 tile in
`public/videos/posters`, then add an entry in `src/content/media.config.json`.
See `CLIENT-EDITING-GUIDE.md` for required fields. Use actual dimensions and
durations. Only poster images load in the
gallery; movies mount after a visitor opens a card. Movies stop on close or
navigation. Reduced-motion visitors start with a paused player.

## Offers

`src/content/offers.config.json` holds the 2 / 3 / 5 video packages and their launch
prices of 499 / 699 / 999 Romanian lei, reduced from 599 / 799 / 1,199 lei.
No billing frequency, revisions or delivery promises have been inferred.
The premium cobalt offer section uses real film stills, cream outer cards, an
ink signature tier, exact savings and calculated per-video prices. It retains
the same package totals. Offer buttons carry their selection to the existing
contact email workflow.
The old work and subscription detail URLs redirect to the gallery or offers.
The Products gallery displays one non-clickable still per visible client video.
Former product detail pages redirect to the Products gallery.

## Verify

With the site running locally, run `node scripts/review-product-media.mjs`.
Set `REVIEW_BASE_URL` to test another local port. The check exercises actual
video decoding, seeking, portrait playback, modal focus, lazy loading, enquiry
selection, redirects, responsive layouts and the sitemap. Review screenshots
are written inside `.animation-review`.
