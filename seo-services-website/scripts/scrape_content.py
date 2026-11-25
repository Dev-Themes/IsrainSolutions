import os
import re
import ssl
import json
import urllib.request
from html.parser import HTMLParser

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
            return res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

urls_to_scrape = [
    'https://offpageseoservices.com/',
    'https://offpageseoservices.com/services/',
    'https://offpageseoservices.com/niche-guest-post/',
    'https://offpageseoservices.com/general-guest-post/',
    'https://offpageseoservices.com/niche-edit/',
    'https://offpageseoservices.com/casino-guest-posts/',
    'https://offpageseoservices.com/off-page-seo-backlinks-service/',
    'https://offpageseoservices.com/niche-blog-comments/',
    'https://offpageseoservices.com/pbn/',
    'https://offpageseoservices.com/wikipedia-links/',
    'https://offpageseoservices.com/press-release/',
    'https://offpageseoservices.com/seo-content-writing-services/',
    'https://offpageseoservices.com/da-pa-checker/',
    'https://offpageseoservices.com/guest-post-sites/',
    'https://offpageseoservices.com/link-insertion-sites/',
    'https://offpageseoservices.com/about-us/',
    'https://offpageseoservices.com/contact-us/',
    'https://offpageseoservices.com/shop/',
    'https://offpageseoservices.com/privacy-policy-2/',
    'https://offpageseoservices.com/anchor-text/',
    'https://offpageseoservices.com/what-is-seo/',
    'https://offpageseoservices.com/do-blog-comments-help-seo/'
]

scraped_data = {}

for u in urls_to_scrape:
    html = fetch_url(u)
    if not html:
        scraped_data[u] = {"status": "error"}
        continue
    
    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else ""
    
    # Extract meta description
    desc_match = re.search(r'<meta\s+name=[\'"]description[\'"]\s+content=[\'"](.*?)[\'"]', html, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta\s+content=[\'"](.*?)[\'"]\s+name=[\'"]description[\'"]', html, re.IGNORECASE)
    desc = desc_match.group(1).strip() if desc_match else ""
    
    # Extract H1s
    h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)]
    # Extract H2s
    h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.IGNORECASE | re.DOTALL)]
    
    # Clean text roughly
    body_text = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
    body_text = re.sub(r'<[^>]+>', ' ', body_text)
    body_text = re.sub(r'\s+', ' ', body_text).strip()
    
    # Extract JSON-LD
    json_lds = re.findall(r'<script type=[\'"]application/ld\+json[\'"][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    parsed_schemas = []
    for j in json_lds:
        try:
            parsed_schemas.append(json.loads(j))
        except:
            pass

    scraped_data[u] = {
        "title": title,
        "description": desc,
        "h1s": h1s,
        "h2s": h2s[:15],
        "sample_text": body_text[:1200],
        "schema_count": len(parsed_schemas)
    }
    print(f"Scraped {u}: Title: {title[:50]} | H1: {h1s}")

with open("docs/scraped_content.json", "w", encoding="utf-8") as f:
    json.dump(scraped_data, f, indent=2)

print("\nContent scraping complete!")
