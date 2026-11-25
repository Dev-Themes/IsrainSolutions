import os

# Remove app/[slug] directory
slug_dir = os.path.join("app", "[slug]")
if os.path.exists(slug_dir):
    for f in os.listdir(slug_dir):
        os.remove(os.path.join(slug_dir, f))
    os.rmdir(slug_dir)
    print("Removed app/[slug] directory")

article_slugs = [
    "anchor-text",
    "what-is-seo",
    "seo-link-building-prices",
    "do-blog-comments-help-seo",
    "is-guest-posting-worth-it",
    "guest-post-vs-niche-edit-vs-pbn",
    "white-label-link-building",
    "how-to-choose-a-link-building-service",
    "how-many-backlinks-do-i-need",
    "how-long-do-backlinks-take-to-work",
    "how-to-judge-a-guest-post-site-before-you-pay",
    "off-page-seo",
    "free-backlinks",
    "is-buying-backlinks-safe"
]

for s in article_slugs:
    p_dir = os.path.join("app", s)
    os.makedirs(p_dir, exist_ok=True)
    page_code = f'''import BlogPostPage, {{ generateMetadata as postMetadata }} from "../blog/[slug]/page";

export async function generateMetadata() {{
  return postMetadata({{ params: Promise.resolve({{ slug: "{s}" }}) }});
}}

export default function Page() {{
  return <BlogPostPage params={{Promise.resolve({{ slug: "{s}" }})}} />;
}}
'''
    with open(os.path.join(p_dir, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(page_code)
    print(f"Created app/{s}/page.tsx")

print("All 14 static article pages created successfully!")
