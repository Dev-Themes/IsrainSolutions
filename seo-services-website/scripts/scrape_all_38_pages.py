import urllib.request
import ssl
import json
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

all_urls = [
    # 23 Pages
    "https://offpageseoservices.com/",
    "https://offpageseoservices.com/link-insertion-sites/",
    "https://offpageseoservices.com/guest-post-sites/",
    "https://offpageseoservices.com/da-pa-checker/",
    "https://offpageseoservices.com/off-page-seo-backlinks-service/",
    "https://offpageseoservices.com/niche-blog-comments/",
    "https://offpageseoservices.com/wikipedia-links/",
    "https://offpageseoservices.com/privacy-policy-2/",
    "https://offpageseoservices.com/contact-us/",
    "https://offpageseoservices.com/general-guest-post/",
    "https://offpageseoservices.com/niche-guest-post/",
    "https://offpageseoservices.com/guest-posts/",
    "https://offpageseoservices.com/services/",
    "https://offpageseoservices.com/about-us/",
    "https://offpageseoservices.com/shop/",
    "https://offpageseoservices.com/press-release/",
    "https://offpageseoservices.com/pbn/high-dr-da-backlinks/",
    "https://offpageseoservices.com/pbn/casino-igaming-backlinks/",
    "https://offpageseoservices.com/pbn/sidebar-blogroll-backlinks/",
    "https://offpageseoservices.com/pbn/",
    "https://offpageseoservices.com/casino-guest-posts/",
    "https://offpageseoservices.com/seo-content-writing-services/",
    "https://offpageseoservices.com/niche-edit/",

    # 15 Posts
    "https://offpageseoservices.com/blog/",
    "https://offpageseoservices.com/anchor-text/",
    "https://offpageseoservices.com/what-is-seo/",
    "https://offpageseoservices.com/seo-link-building-prices/",
    "https://offpageseoservices.com/do-blog-comments-help-seo/",
    "https://offpageseoservices.com/is-guest-posting-worth-it/",
    "https://offpageseoservices.com/guest-post-vs-niche-edit-vs-pbn/",
    "https://offpageseoservices.com/white-label-link-building/",
    "https://offpageseoservices.com/how-to-choose-a-link-building-service/",
    "https://offpageseoservices.com/how-many-backlinks-do-i-need/",
    "https://offpageseoservices.com/how-long-do-backlinks-take-to-work/",
    "https://offpageseoservices.com/how-to-judge-a-guest-post-site-before-you-pay/",
    "https://offpageseoservices.com/off-page-seo/",
    "https://offpageseoservices.com/free-backlinks/",
    "https://offpageseoservices.com/is-buying-backlinks-safe/"
]

scraped_inventory = {}

for u in all_urls:
    req = urllib.request.Request(u, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as res:
            html = res.read().decode('utf-8', errors='ignore')
            # title
            title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
            title = title_m.group(1).strip() if title_m else ""
            
            # desc
            desc_m = re.search(r'<meta\s+name=[\'"]description[\'"]\s+content=[\'"](.*?)[\'"]', html, re.IGNORECASE)
            if not desc_m:
                desc_m = re.search(r'<meta\s+content=[\'"](.*?)[\'"]\s+name=[\'"]description[\'"]', html, re.IGNORECASE)
            desc = desc_m.group(1).strip() if desc_m else ""

            # h1
            h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)]
            
            # h2s
            h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.IGNORECASE | re.DOTALL)]

            # text
            clean_html = re.sub(r'<(script|style|header|footer|nav)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
            clean_text = re.sub(r'<[^>]+>', ' ', clean_html)
            clean_text = re.sub(r'\s+', ' ', clean_text).strip()

            scraped_inventory[u] = {
                "title": title,
                "description": desc,
                "h1": h1s[0] if h1s else title,
                "h2s": h2s[:10],
                "text_sample": clean_text[:2500],
                "char_length": len(clean_text)
            }
            print(f"Scraped: {u} | H1: {h1s[0] if h1s else 'None'} | Chars: {len(clean_text)}")
    except Exception as e:
        print(f"Failed {u}: {e}")
        scraped_inventory[u] = {"error": str(e)}

with open("docs/all_38_scraped_pages.json", "w", encoding="utf-8") as f:
    json.dump(scraped_inventory, f, indent=2)

print("\nAll 38 pages scraped and stored in docs/all_38_scraped_pages.json!")
