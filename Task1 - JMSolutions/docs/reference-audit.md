# Reference Audit: camohvac.net

## Analysis of Site Structure & Visual Language
Based on the provided breakdown of https://camohvac.net/:

1. **Header & Navigation**
   - Full-width, attached top header (no floating pills).
   - Solid announcement bar on top.
   - Dark theme, gradient logo glow.
   - Nav items are uppercase, tracking applied, active item has short gradient underline.
   - Call Now button is a skewed parallelogram.

2. **Hero Section**
   - Dark textured background (contour, faint vertical grids, edge glows), NO hero photo.
   - 2-column grid.
   - Left: Tag, 3-line H1 with gradient middle phrase, text, primary + outline CTA, stats.
   - Right: Interactive chamfered media frame (tab rail for heating/cooling/refrig).

3. **Global Styling & Geometry**
   - **Angular Geometry**: Chamfered corners (cut edges), skewed tags and buttons. No soft radii.
   - **Textures & Layers**: 1px gradient borders. Deep dark background (`#050D1A`), alternate banded sections.
   - **Gradient Text**: Used deliberately for emphasis in headings and stats.
   - **Colors**: Based strictly on JM logo (Navy, Brand Blue, Brand Red-Orange, Violet-Gray blend). No Teal.

4. **Component Details**
   - Buttons: Skewed parallelogram (`transform: skewX(-12deg)`), label counter-skewed.
   - Cards: Chamfered (`clip-path`), `1px` gradient border, pointer spotlight hover effect.
   - Typography: Saira / Saira Condensed for display and buttons, DM Sans for body.

5. **Key Constraints**
   - Dark mode ONLY.
   - "Not vibe coded" - no floating cards, no emoji/sparkles, no blurry aurora blobs.
   - No women or girls in photography (strict client constraint).

## Conclusion
The design feels hand-crafted, tactical, and grounded. It leans heavily on geometric clips, gradient accents for state changes, and structured tabular presentation rather than soft, airy layouts.
