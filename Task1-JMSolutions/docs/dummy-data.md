# Dummy Data Register

All placeholder information in the project has been centralized in `src/config/site.ts`. The client must update `site.isDummy = false` and replace the following values before launch:

| Field | Current Dummy Value | Where Used |
|---|---|---|
| `phone` | `(555) 010-0142` | Header, Footer, Hero Buttons, CTA Bands, Contact Page emergency line |
| `email` | `service@jmcomfort.example` | Contact Forms, Footer |
| `address` | `1200 Industrial Way` | Footer, Contact Pages |
| `city` | `Riverton` | Footer, Service Areas |
| `metroArea` | `Riverton Metro Area` | Header, Service Areas, Prose |
| `state` | `ST` | Footer |
| `zip` | `12345` | Footer |
| `hours` | `24/7 emergency, Mon-Fri 7am-6pm scheduled` | Footer, Contact Page |
| `founded` | `2012` | About Page, Footer |
| `serviceAreas` | `Riverton North`, `Millbrook`, etc. | Service Areas list, Contact Page Sidebar |

## JSON-LD Exclusion
When `site.isDummy === true`, the structured data (`LocalBusiness`, `HVACBusiness`, `Service`) will **omit** these fields to prevent polluting search engines with fictional data.

## Social Links
The social card in the Contact Page sidebar is explicitly omitted while `site.isDummy` is true. Once real URLs are supplied in `site.socials`, the component will automatically render.

## Before Launch (Delivery Environment Variables)
When `site.isDummy` is set to `false`, the contact form requires the following environment variables to be set for email delivery to work. If these are missing during `next build`, the build will intentionally fail.
- `SMTP_HOST` (e.g., smtp.example.com)
- `SMTP_PORT` (e.g., 587)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (e.g., noreply@jmcomfort.example)
