# JM Comfort Solutions - Rebuild Notes

## Migration Completed

The site has been completely re-architected based on the provided reference site (camohvac.net) while adapting it uniquely for **JM Comfort Solutions**' branding.

### Changes Made:
- **Strict Dark Theme Enforced**: Removed all floating pills and light SaaS elements. Replaced with dark texture layouts, 1px gradient borders, and chamfered edges.
- **Header & Navigation**: Attached non-floating top nav with announcement bar. Introduced `LogoGlow` to handle the dark navy logo text over the dark background.
- **Component Geometry**: Custom CSS `clip-path` for chamfered cards with `.jm-card` and an interactive `.btn` parallelogram class with deep sweeps.
- **Typography**: Replaced standard fonts with `Saira Condensed`, `Saira` for navigation/UI, and `DM Sans` for body copy, echoing the heavy geometric presence of the logo.
- **Pages Added/Rebuilt**:
  - `page.tsx` (Home) matching the specific visual rhythm.
  - `about-us/page.tsx`
  - `ac-repair/page.tsx`
  - `services/page.tsx`
  - `contact/page.tsx`
  - `api/contact/route.ts` built and passing Zod validation.
- **Docs Setup**: 
  - `reference-audit.md` (Design breakdown)
  - `dark-purge-report.md` (Strict styling validation)
  - `migration-plan.md` (Task sequence)
  - `placeholders.md` (Data needed from client)
  - `image-manifest.json` (Validation of stock imagery against human/female presence constraints).
  - `seo-checklist.md`
  - `service-areas-howto.md`

### Next Steps (For the Client):
1. Review `docs/placeholders.md` and replace strings in the components and configs.
2. Edit `src/config/serviceAreas.ts` to include real service towns and uncomment dynamic generation functions in `[slug]` routes when ready.
3. Replace `/public/images` with real job site photography.
4. Deploy the Next.js app to Vercel/Netlify.
