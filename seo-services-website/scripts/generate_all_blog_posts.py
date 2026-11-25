import json

with open("docs/all_38_scraped_pages.json", "r", encoding="utf-8") as f:
    scraped = json.load(f)

blog_urls = [
    ("anchor-text", "https://offpageseoservices.com/anchor-text/"),
    ("what-is-seo", "https://offpageseoservices.com/what-is-seo/"),
    ("seo-link-building-prices", "https://offpageseoservices.com/seo-link-building-prices/"),
    ("do-blog-comments-help-seo", "https://offpageseoservices.com/do-blog-comments-help-seo/"),
    ("is-guest-posting-worth-it", "https://offpageseoservices.com/is-guest-posting-worth-it/"),
    ("guest-post-vs-niche-edit-vs-pbn", "https://offpageseoservices.com/guest-post-vs-niche-edit-vs-pbn/"),
    ("white-label-link-building", "https://offpageseoservices.com/white-label-link-building/"),
    ("how-to-choose-a-link-building-service", "https://offpageseoservices.com/how-to-choose-a-link-building-service/"),
    ("how-many-backlinks-do-i-need", "https://offpageseoservices.com/how-many-backlinks-do-i-need/"),
    ("how-long-do-backlinks-take-to-work", "https://offpageseoservices.com/how-long-do-backlinks-take-to-work/"),
    ("how-to-judge-a-guest-post-site-before-you-pay", "https://offpageseoservices.com/how-to-judge-a-guest-post-site-before-you-pay/"),
    ("off-page-seo", "https://offpageseoservices.com/off-page-seo/"),
    ("free-backlinks", "https://offpageseoservices.com/free-backlinks/"),
    ("is-buying-backlinks-safe", "https://offpageseoservices.com/is-buying-backlinks-safe/"),
]

posts_output = []

for slug, url in blog_urls:
    item = scraped.get(url, {})
    title = item.get("title", "").replace(" | OffPage SEO Services", "").replace(" | OffPage SEO Service", "").strip()
    if not title:
        title = slug.replace("-", " ").title()
    desc = item.get("description", "")
    h1 = item.get("h1", title)
    h2s = item.get("h2s", [])
    text_sample = item.get("text_sample", "")

    # Clean text sample for typescript string
    clean_sample = text_sample.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")[:2000]

    toc = []
    for i, h in enumerate(h2s[:5]):
        clean_h = h.replace('"', '').strip()
        hid = clean_h.lower().replace(" ", "-").replace("?", "").replace(":", "")[:30]
        if clean_h:
            toc.append({"id": hid or f"sec-{i}", "text": clean_h})

    posts_output.append({
        "slug": slug,
        "title": title,
        "description": desc or f"Comprehensive guide to {title.lower()}.",
        "date": "2026-11-20",
        "updatedDate": "2026-11-24",
        "category": "Link Building",
        "categorySlug": "link-building",
        "readTime": "8 min read",
        "author": {
            "name": "Abdul Qadir",
            "role": "Founder, OffPage SEO Services",
            "avatar": "AQ"
        },
        "tableOfContents": toc,
        "content": f"""
## {h1}

{clean_sample}

---

## Strategic Implementation & Best Practices

When deploying link acquisition campaigns, consistency and manual vetting are essential. Rather than buying low-quality mass packages, focusing on authoritative, topically relevant publications guarantees long-term ranking stability and immunity from automated search engine penalties.

### Key Quality Checks:
- Verified organic search traffic on Ahrefs/Semrush.
- Clean historical backlink profiles without algorithmic suppression.
- Permanent editorial contextual dofollow link placement.
        """.strip()
    })

ts_content = "export interface BlogPost {\n"
ts_content += "  slug: string;\n  title: string;\n  description: string;\n  date: string;\n  updatedDate: string;\n  category: string;\n  categorySlug: string;\n  readTime: string;\n  author: { name: string; role: string; avatar: string };\n  tableOfContents: { id: string; text: string }[];\n  content: string;\n}\n\n"
ts_content += "export const blogPosts: BlogPost[] = " + json.dumps(posts_output, indent=2) + ";\n"

with open("content/blog-posts.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Updated content/blog-posts.ts with all 14 articles!")
