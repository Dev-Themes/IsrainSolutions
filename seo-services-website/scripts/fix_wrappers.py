import os

service_mappings = {
    "app/niche-guest-post/page.tsx": "niche-guest-posts",
    "app/general-guest-post/page.tsx": "general-guest-posts",
    "app/niche-edit/page.tsx": "niche-edits",
    "app/casino-guest-posts/page.tsx": "casino-igaming-guest-posts",
    "app/off-page-seo-backlinks-service/page.tsx": "off-page-seo-packages",
    "app/niche-blog-comments/page.tsx": "niche-blog-comments",
    "app/wikipedia-links/page.tsx": "wikipedia-links",
    "app/press-release/page.tsx": "press-releases",
    "app/seo-content-writing-services/page.tsx": "seo-content-writing",
}

for file_path, slug in service_mappings.items():
    content = f'''import ServiceDetailPage, {{ generateMetadata as detailMetadata }} from "../services/[slug]/page";

export async function generateMetadata() {{
  return detailMetadata({{ params: Promise.resolve({{ slug: "{slug}" }}) }});
}}

export default function Page() {{
  return <ServiceDetailPage params={{Promise.resolve({{ slug: "{slug}" }})}} />;
}}
'''
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Fixed {file_path}")

cat_content = '''import CategoryArchivePage, { generateMetadata as catMetadata } from "../../blog/category/[category]/page";

export async function generateMetadata() {
  return catMetadata({ params: Promise.resolve({ category: "link-building" }) });
}

export default function Page() {
  return <CategoryArchivePage params={Promise.resolve({ category: "link-building" })} />;
}
'''
with open("app/category/link-building/page.tsx", "w", encoding="utf-8") as f:
    f.write(cat_content)
print("Fixed app/category/link-building/page.tsx")
