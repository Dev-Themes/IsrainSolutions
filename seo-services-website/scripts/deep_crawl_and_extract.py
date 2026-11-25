import os
import re
import ssl
import json
import urllib.request
from PIL import Image

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

def fetch_bytes(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
            return res.read()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

# 1. Download logos
brand_dir = os.path.join("public", "brand")
os.makedirs(brand_dir, exist_ok=True)
logos = {
    "israin-wordmark-1024x244.webp": "https://israinsols.com/wp-content/uploads/2025/01/Israin-Solutions-1024x244.webp",
    "israin-wordmark.webp": "https://israinsols.com/wp-content/uploads/2025/01/Israin-Solutions.webp",
    "israin-icon.png": "https://israinsols.com/wp-content/uploads/2024/10/ISonly-Orig.png",
    "israin-logo-cropped.png": "https://israinsols.com/wp-content/uploads/2024/10/cropped-cropped-Israin-Solutions-logo2.png"
}
for fname, lurl in logos.items():
    dest = os.path.join(brand_dir, fname)
    if not os.path.exists(dest):
        data = fetch_bytes(lurl)
        if data:
            with open(dest, "wb") as f:
                f.write(data)
            print(f"Downloaded logo: {dest} ({len(data)} bytes)")
        else:
            print(f"Failed to download logo: {lurl}")

# 2. Detailed color sampling of the accent blue from screenshot
screenshot_path = os.path.join("reference", "screencapture-israinsols-2026-11-25-15_50_47.png")
if os.path.exists(screenshot_path):
    img = Image.open(screenshot_path)
    w, h = img.size
    print(f"Screenshot dimensions: {w} x {h}")
    # We want to find pixels that are bright cyan/blue (R in 10-60, G in 140-200, B in 200-255)
    accent_samples = []
    # Sample every 5th row in first 3000px (header & hero & stats & services)
    for y in range(0, min(h, 4000), 4):
        for x in range(0, w, 4):
            r, g, b, *rest = img.getpixel((x, y))
            # look for cyan/blue accent
            if b > 180 and g > 140 and r < 80:
                accent_samples.append((r, g, b))
    
    from collections import Counter
    if accent_samples:
        acc_counter = Counter(accent_samples)
        print("Dominant cyan/blue accent samples:")
        for col, cnt in acc_counter.most_common(15):
            hex_c = '#{:02x}{:02x}{:02x}'.format(col[0], col[1], col[2])
            print(f"  {hex_c} (rgb{col}): {cnt} times")

# 3. Analyze offpageseoservices.com in depth
home_html = fetch_url('https://offpageseoservices.com/')
robots_txt = fetch_url('https://offpageseoservices.com/robots.txt')
sitemap_xml = fetch_url('https://offpageseoservices.com/sitemap.xml')

print("\n--- Robots.txt ---")
print(robots_txt)

print("\n--- Sitemap.xml ---")
print(sitemap_xml)

# Check if sitemap references sub-sitemaps
sub_sitemaps = re.findall(r'<loc>([^<]+)</loc>', sitemap_xml or "")
print(f"Found {len(sub_sitemaps)} locs in sitemap")
all_discovered_urls = set()
for sm in sub_sitemaps:
    print(f"Checking sub-sitemap: {sm}")
    sm_content = fetch_url(sm)
    if sm_content:
        urls_in_sm = re.findall(r'<loc>([^<]+)</loc>', sm_content)
        print(f"  {len(urls_in_sm)} urls in {sm}")
        for u in urls_in_sm:
            all_discovered_urls.add(u)
    else:
        all_discovered_urls.add(sm)

# Also extract all links from home page
if home_html:
    links = re.findall(r'href=[\'"](https?://offpageseoservices\.com[^\'"#\s]*)[\'"]', home_html)
    for l in links:
        all_discovered_urls.add(l)
    
    rel_links = re.findall(r'href=[\'"](/[^/][^\'"#\s]*)[\'"]', home_html)
    for rl in rel_links:
        all_discovered_urls.add('https://offpageseoservices.com' + rl)

print(f"\nTotal unique URLs discovered on offpageseoservices.com: {len(all_discovered_urls)}")
for u in sorted(all_discovered_urls):
    print(f"  {u}")

# Save detailed report
crawl_data = {
    "all_urls": sorted(list(all_discovered_urls)),
    "robots": robots_txt,
    "sitemap_raw": sitemap_xml
}

with open("docs/crawl_inventory.json", "w", encoding="utf-8") as f:
    json.dump(crawl_data, f, indent=2)

print("\nDeep crawl completed successfully!")
