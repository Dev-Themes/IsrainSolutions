# Migration Plan

1. **Purge Light Colors:** Enforce 100% dark mode logic across all variables and classes.
2. **Setup Global Tokens:** Inject JM Brand identity colors in `globals.css` and set base Tailwind typography configurations.
3. **Build Core Primitive Components:**
   - Develop `Section` wrapper enforcing max-width grid and background logic.
   - Recreate `Button` with parallelogram skew layout and deep gradient hovers.
   - Build `Card` using `clip-path` chamfered corners, gradient hairlines, and pointer spotlights.
   - Refactor Typography components (tags, H1/H2 with 2-tone coloring, stats, quotes).
4. **Layout Setup:**
   - Replace Header with full-width, non-floating container including the glow `LogoGlow`.
   - Update Footer logic.
5. **Page Implementations:**
   - Build `app/page.tsx` directly aligning with camohvac's observed block rhythm.
   - Implement `/services`, `/about-us`, `/ac-repair`, `/contact` sequentially.
   - Enable local programmatic routes in `app/[ac-repair-slug]`.
6. **Imagery Management:**
   - Harvest stock images, verifying no persons strictly via manifest checks.
7. **Quality Check:** Validate layout integrity and dark theme guard rails.
