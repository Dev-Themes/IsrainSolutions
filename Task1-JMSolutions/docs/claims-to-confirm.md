# Claims to Confirm

Before launch, the client must confirm the following claims that are currently controlled by feature flags in `src/config/site.ts`:

- **Same-Day Service:** `features.sameDay` (Currently: `true`) -> Do you guarantee or offer same-day service when scheduling allows?
- **24/7 Emergency:** `features.emergency247` (Currently: `true`) -> Is emergency HVAC service genuinely answered 24/7?
- **Free Second Opinion:** `features.freeSecondOpinion` (Currently: `true`) -> Do you offer free second opinions on major repair and replacement recommendations?
- **Financing:** `features.financing` (Currently: `false`) -> Do you offer financing for customers?
- **Diagnostic Fee:** `features.diagnosticFee` (Currently: `null`) -> If you have a set diagnostic fee, please provide the dollar amount.
