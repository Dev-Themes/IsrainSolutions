# Site Map & Route Mapping: seo.israinsols.com

**Canonical Domain:** `https://seo.israinsols.com`  
**Reference Source:** `https://offpageseoservices.com`

---

## 1. Route Mapping Table

| Final Route | Page Title | Reference URL | Legacy 301 Redirect | Notes |
|---|---|---|---|---|
| `/` | Link Building Services on Real Websites \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/` | - | Complete 11-section home page |
| `/services` | Link Building Packages and Services \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/services/` | `/services/` | Services hub with comparison matrix & tabs |
| `/services/niche-guest-posts` | Niche Guest Post Backlinks \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/niche-guest-post/` | `/niche-guest-post` | From $100, DA 30+, 5k+ traffic |
| `/services/general-guest-posts` | General Guest Posts from $10 \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/general-guest-post/` | `/general-guest-post` | From $10, DA 20+, 700+ words |
| `/services/niche-edits` | Niche Edit Backlinks (Curated Links) \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/niche-edit/` | `/niche-edit` | From $50, existing indexed articles |
| `/services/casino-igaming-guest-posts` | Casino & iGaming Guest Posts \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/casino-guest-posts/` | `/casino-guest-posts` | From $30, specialized gambling niches |
| `/services/off-page-seo-packages` | Off-Page SEO Packages (Tier 1 & Tier 2) \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/off-page-seo-backlinks-service/` | `/off-page-seo-backlinks-service` | From $50 |
| `/services/niche-blog-comments` | Niche Blog Comments \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/niche-blog-comments/` | `/niche-blog-comments` | From $15 |
| `/services/pbn-links` | PBN Backlinks from Aged Domains \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/pbn/` | `/pbn` | From $10, explicit risk framing |
| `/services/wikipedia-links` | Wikipedia Links for Authority & Referral Traffic \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/wikipedia-links/` | `/wikipedia-links` | Brand trust citations |
| `/services/press-releases` | Press Release Distribution \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/press-release/` | `/press-release` | From $100 |
| `/services/seo-content-writing` | SEO Content Writing Services \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/seo-content-writing-services/` | `/seo-content-writing-services` | From $5 per article |
| `/guest-post-sites` | Guest Post Sites List with DA, DR & Traffic \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/guest-post-sites/` | `/guest-post-sites` | Searchable, sortable, filterable table |
| `/link-insertion-sites` | Link Insertion Sites Directory \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/link-insertion-sites/` | `/link-insertion-sites` | Searchable, sortable, filterable table |
| `/da-pa-checker` | Free DA and PA Checker Tool \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/da-pa-checker/` | `/da-pa-checker` | Provider interface (fallback to WhatsApp request) |
| `/about` | About OffPage SEO Services & Israin Solutions \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/about-us/` | `/about-us` | Founder story, parent agency, numbers |
| `/blog` | Link Building & SEO Blog \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/blog/` | `/blog` | MDX blog archive with category filters |
| `/blog/[slug]` | [Post Title] \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/[post-slug]/` | - | Dynamic MDX blog post template |
| `/blog/category/[category]` | [Category Name] Articles \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/category/[cat]/` | `/category/[cat]` | Category archive |
| `/contact` | Contact Us: WhatsApp, Telegram & Brief Form \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/contact-us/` | `/contact-us` | Direct contacts + brief form |
| `/order` | Order Link Building Packages \| OffPage SEO by Israin Solutions | - | - | Package selector + prefilled brief form |
| `/shop` | Link Building Packages Shop \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/shop/` | `/shop` | Product grid connecting directly to `/order` |
| `/privacy-policy` | Privacy Policy \| OffPage SEO by Israin Solutions | `https://offpageseoservices.com/privacy-policy-2/` | `/privacy-policy-2` | Plain English privacy policy |
| `/terms` | Terms of Service & Refund Policy \| OffPage SEO by Israin Solutions | - | - | 12-24h refund guarantee terms |
| `/thank-you` | Brief Received \| OffPage SEO by Israin Solutions | - | - | Confirmation state (noindex) |
| `/not-found` | 404 Page Not Found \| OffPage SEO by Israin Solutions | - | - | Helpful search + top destinations |

---

## 2. Dynamic Next.js Redirects

The following redirects will be configured in `next.config.ts`:
```ts
async redirects() {
  return [
    { source: '/niche-guest-post', destination: '/services/niche-guest-posts', permanent: true },
    { source: '/general-guest-post', destination: '/services/general-guest-posts', permanent: true },
    { source: '/niche-edit', destination: '/services/niche-edits', permanent: true },
    { source: '/casino-guest-posts', destination: '/services/casino-igaming-guest-posts', permanent: true },
    { source: '/off-page-seo-backlinks-service', destination: '/services/off-page-seo-packages', permanent: true },
    { source: '/press-release', destination: '/services/press-releases', permanent: true },
    { source: '/seo-content-writing-services', destination: '/services/seo-content-writing', permanent: true },
    { source: '/about-us', destination: '/about', permanent: true },
    { source: '/contact-us', destination: '/contact', permanent: true },
    { source: '/privacy-policy-2', destination: '/privacy-policy', permanent: true },
  ];
}
```
