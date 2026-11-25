# Open Questions & Owner Decisions

**Document Location:** `docs/open-questions.md`  
**Date:** 2026-11-25

The following items are documented for the site owner's confirmation. Reasonable, verified defaults are implemented in the codebase:

1. **Brand Design Tokens Confirmation:**
   - **Default Implemented:** Pure dark theme, `#1FA9E0` cyan-blue primary accent (derived and measured from parent screenshot `reference/screencapture-israinsols-2026-11-25-15_50_47.png`), `#000B27` navy hero, `#000000` / `#121212` backgrounds, Inter font family.
   - **Question for Owner:** Please confirm if any other custom secondary accents or typography preferences apply.

2. **Contact Details & Sub-brand Addressing:**
   - **Default Implemented:** 
     - Email: `contact@israinsols.com` (with fallback to `contact@offpageseoservices.com`)
     - WhatsApp: `+92 331 3646645` (verified parent line) / `+92 321 3060883`
     - Telegram: `t.me/israinsolutions`
     - Physical Address: Office #21 Al-Rahim Heights, Unit #06 Latifabad, Hyderabad, Pakistan.
   - **Question for Owner:** Confirm primary incoming email address for link inquiries.

3. **Founder Attribution & Brand Relationship:**
   - **Default Implemented:** "OffPage SEO Services by Israin Solutions", crediting Abdul Qadir as Founder and link building director.
   - **Question for Owner:** Confirm if Abdul Qadir's photo/avatar should be included or initials badge "AQ".

4. **Real Publisher Inventory (`/guest-post-sites` & `/link-insertion-sites`):**
   - **Default Implemented:** Seeded directory with the verified publisher samples (MSN, Business Insider Africa, Markets Insider, The Independent, 1883 Magazine, The Signal, UrbanMatter, Trending US, etc.) and a clean CSV import script `scripts/import-sites.ts`. Metrics for unconfirmed publishers display "On request".
   - **Question for Owner:** Provide the full CSV inventory if you would like the entire publisher list pre-loaded.

5. **DA/PA Checker API Integration:**
   - **Default Implemented:** Modular metric provider interface in `lib/metrics/provider.ts`. In absence of a paid Moz or DataForSEO API key, it provides simulated development feedback or directs the user to request a live domain audit via WhatsApp.
   - **Question for Owner:** Provide Moz or DataForSEO API credentials when ready for live production queries.

6. **E-commerce / Shop Nature:**
   - **Default Implemented:** `/shop` showcases package tiers and directs users directly to the `/order` customized brief builder (no external payment gateway required initially).
   - **Question for Owner:** Confirm if Stripe, PayPal, or crypto payment checkout is desired in the future.

7. **Refund Policy Guarantee:**
   - **Default Implemented:** "Full refund within 12 to 24 hours before the delivery date" if placement requirements cannot be fulfilled.
