# Dummy Data Register

All placeholder information in the project has been centralized in `src/config/site.ts`. The client must update `site.isDummy = false` and replace the following values before launch:

| Field | Current Dummy Value | Where Used |
|---|---|---|
| `phone` | `(555) 010-0142` | Header, Footer, Hero Buttons, CTA Bands |
| `email` | `service@jmcomfort.example` | Contact Forms, Footer |
| `address` | `1200 Industrial Way` | Footer, Contact Pages |
| `city` | `Riverton` | Footer, Service Areas |
| `metroArea` | `Riverton Metro Area` | Header, Service Areas, Prose |
| `state` | `ST` | Footer |
| `zip` | `12345` | Footer |
| `hours` | `24/7 emergency, Mon–Fri 7am–6pm scheduled` | Footer, Contact Page |
| `founded` | `2012` | About Page, Footer |

## JSON-LD Exclusion
When `site.isDummy === true`, the structured data (`LocalBusiness`, `HVACBusiness`, `Service`) will **omit** these fields to prevent polluting search engines with fictional data.
