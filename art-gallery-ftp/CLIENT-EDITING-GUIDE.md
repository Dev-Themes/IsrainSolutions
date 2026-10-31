# Editing your PopArt website

All editable website content is in **`src/content`**. These are plain UTF-8 JSON files; no React knowledge is needed. Keep a backup or commit before editing. The design, animations and video player remain in the application code.

## Find the right file

| What you want to change | File under `src/content/` |
| --- | --- |
| Agency name, email, address, social links, footer description, website URL | `site.config.json` |
| Header/footer links and their translated labels | `navigation.config.json` |
| Homepage text, capabilities and studio introduction | `pages/home.config.json` |
| Studio text, disciplines and values | `pages/studio.config.json` |
| Work heading, introduction and filter labels | `pages/work.config.json` |
| Products heading and gallery introduction | `pages/products.config.json` |
| Contact text, topics and response-time message | `pages/contact.config.json` |
| Package names, prices, crossed-out prices, descriptions and badges | `offers.config.json` |
| Gallery images, video titles, brands, categories, order and visibility | `media.config.json` |
| Terms & Conditions | `legal/terms.config.json` |
| Privacy Policy | `legal/privacy.config.json` |
| Cookie Policy | `legal/cookies.config.json` |
| Shared buttons, page metadata, player labels and smaller interface text | `pages/interface.config.json` |
| Error-page text and compatibility labels | `pages/shared.config.json` |

Some old package-detail and product-study labels remain for compatibility. The old study pages now redirect to the gallery; editing those retired labels will not change the live gallery.

## Change text and translations

`ro` means Romanian, `fr` French, and `en` English. Edit the **values** inside quotes; keep field names and language keys intact. Page files generally group content by language. Smaller interface strings use stable English lookup keys with translations beneath them. **Do not rename those lookup keys**, even when changing English text.

For example, in `pages/products.config.json`, find the appropriate language and change:

```json
"heroSubtext": "Your new introduction goes here."
```

Update all three languages when changing the meaning. Save files as UTF-8 so Romanian and French accents remain intact. Text is plain text, not HTML. Long text may wrap differently, so preview mobile and desktop.

## Change an offer

Each object in `offers.config.json` describes one card. Keep the three-card structure. For example, change the numbers in the first card:

```json
"count": 2,
"price": 499,
"originalPrice": 599,
"recommended": false
```

Numbers have no quotes. The crossed-out price must be higher than the current price. Savings and price per video are calculated automatically. Edit `name`, `badge` and `description` in all languages. `recommended: true` selects the dark highlighted card. Changing `count` also updates the selected package sent to the contact page. If package counts change, update any descriptive sentences that mention the old counts in `pages/interface.config.json`.

## Change the gallery

`media.config.json` is the shared list for Work videos and Products stills. Each entry corresponds to one client video. Products displays the prepared `-tile.webp` still and a caption; the images are intentionally not clickable. Work opens the original video.

- Edit `title`, `category` and `brandLabel` in all three languages. `brandLabel` controls the displayed brand; `brand` is the original brand reference.
- Move a complete object up or down the list to change the gallery order.
- Set `visible` to `false` to hide the item from both galleries. Keep at least one visible item.
- Set `featured` to `true` to include it among homepage selections. Keep at least three visible featured entries for the current homepage composition.
- The small stills on offer cards use `offerPreviewIds` at the top of `pages/home.config.json`. Reorder those IDs to change their sequence; each ID must match a media entry.
- Keep `id`, `source`, dimensions, duration and frame settings unchanged for existing entries unless you are replacing media deliberately.
- Groups are `beauty`, `lifestyle`, `fashion`, `fragrance` and `motion`; their displayed labels are editable in `pages/work.config.json`.

To replace a still without changing the video, replace **both** matching files in `public/videos/posters`: `<id>.webp` is the player poster and `<id>-tile.webp` is the 4:5 gallery image. Use genuine frames from that entry’s video. Increase the existing `posterTime` and `thumbnailTime` values to the actual new frame times, within the video’s duration, so optimized image caches refresh. Keep the filenames intact.

Adding a completely new video also requires preparing both poster files and accurate duration/dimensions. A developer can run `node scripts/catalog-client-videos.mjs` and `node scripts/prepare-client-posters.mjs <id>` locally after setting up the entry; review those outputs before publication. Simply dropping an MP4 into the folder does not add it to the website.

## Edit legal pages

Each legal file contains an update date and three translations. Each translation has a title, introduction and `sections`. A section has a `heading` and a list of `paragraphs`. Duplicate a complete section object to add another; numbering is automatic.

The supplied wording is an editable **draft**, not a verified statement of the business’s legal arrangements. Before publishing, the owner should confirm the real operator/company details, contact address, hosting/email providers, retention and commercial arrangements, and approve the final wording. The current email and address retain the site’s existing placeholders; replace them in `site.config.json`. Update policy text to match the actual business. No company registration, tax information or statutory obligations have been invented.

## Preview and publish

From this project folder, run:

```sh
npm run validate:content
npm run dev
```

Open `http://localhost:3000/ro` (or the port printed in the terminal). Check `/products`, `/work`, `/terms`, `/privacy` and `/cookies` in each language. Check the package prices and try a video. Stop the preview with Ctrl+C.

Before publishing:

```sh
npm run build
```

The build automatically validates content and stops on invalid entries. On success, commit/push changes to the repository connected to Vercel, or use the project’s existing deployment process. Saving a local file does **not** update the live website. `NEXT_PUBLIC_SITE_URL`, if set in hosting, overrides the URL in the site config.

## JSON editing rules

- Keep commas between entries, with no comma after the final entry.
- Use double quotes for text. Escape a quotation mark inside text as `\"`.
- Use `true` and `false` without quotes.
- Do not add comments inside JSON files.
- Do not delete required keys. Follow the field named in any validation error.
- Never put passwords, API keys or private customer information in these files; website content is public.

For changes to layouts, animation timing, brand artwork, typography or player behavior, ask a developer. A browser-based editing dashboard is not included in this config-based setup.
