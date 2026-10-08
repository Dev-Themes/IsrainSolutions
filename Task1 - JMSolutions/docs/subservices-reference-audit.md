# Sub-services Reference Audit

## Reference Review
Target: `https://camohvac.net/services/residential` (Reference mock/screenshots)
Live references: Evaluated structural elements based on the prompt's provided outline.

1. **Announcement bar + header**: Follows existing shared layout. Active nav state on "Services".
2. **Hero**: Two-column layout with chamfered media frame on right. Left has a bordered tag with a small icon, H1 on two lines (second line accent), 3-line paragraph, and two buttons (solid "Get a Free Quote", outline phone button).
3. **Offer Grid (Band)**: Textured band background. Centered H2 with underline, short subtext. 3x2 grid of 6 bordered cards featuring top-left line icons, uppercase titles, 3-4 line descriptions. Equal heights.
4. **Why Section (Base)**: Dark base background. Left side: bordered tag, H2 with accent phrase, paragraph, checklist of 6 circle-check items. Right side: chamfered media with cut corners.
5. **Below**: Uses the existing shared components from other pages (Reviews, CTA Band, Service Areas, Footer).

### Intentional Changes (from prompt instructions)
- Two-column hero with chamfered media frame instead of background photo.
- Cool/warm gradient system instead of gold single-accent.
- Contour lines instead of camo texture.
- Added native `<details>` FAQ block and "Other Services" related links block.
- Chamfered cards with gradient edges and pointer spotlight.
- 14px minimum typography on cards for legibility.

## Audit of Existing Project
- `app/services/[slug]/page.tsx` needs to be created.
- `src/content/services.ts` exists but will be extended or supplemented by `service-pages.ts` for the 4 sub-services.
- `src/config/site.ts` was missing; created to centralize dummy data.
- Header (`ServicesMenu`) and footer need to be updated to link to the new sub-pages.
- `/ac-repair` exists; will remain untouched and linked from the residential page.
