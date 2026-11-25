import os
import re
import ssl
import json
import urllib.request
from collections import Counter

# Try importing PIL
try:
    from PIL import Image
    has_pil = True
except ImportError:
    has_pil = False

print(f"PIL available: {has_pil}")

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
        print(f"Error fetching bytes {url}: {e}")
        return None

# 1. Analyze parent site
parent_html = fetch_url('https://israinsols.com/')
css_vars = {}
css_urls = []
if parent_html:
    print(f"Fetched parent HTML: {len(parent_html)} bytes")
    links = re.findall(r'href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', parent_html)
    for link in links:
        css_urls.append(link)
    print(f"Found {len(css_urls)} CSS links on parent site")
    
    # Let's inspect CSS files, particularly post/custom/global/elementor css
    for link in css_urls:
        if any(keyword in link for keyword in ['elementor', 'global', 'custom', 'style', 'post-']):
            css_content = fetch_url(link)
            if css_content:
                # find --e-global-color or other vars
                vars_found = re.findall(r'(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);', css_content)
                for k, v in vars_found:
                    css_vars[k] = v.strip()

print(f"Total CSS variables extracted from parent: {len(css_vars)}")
global_colors = {k: v for k, v in css_vars.items() if 'color' in k.lower()}
print("Sample extracted color vars:")
for k, v in list(global_colors.items())[:20]:
    print(f"  {k}: {v}")

typography_vars = {k: v for k, v in css_vars.items() if 'typography' in k.lower() or 'font' in k.lower()}
print("Sample typography vars:")
for k, v in list(typography_vars.items())[:20]:
    print(f"  {k}: {v}")

# 2. Analyze reference screenshot if PIL is available
screenshot_path = os.path.join("reference", "screencapture-israinsols-2026-11-25-15_50_47.png")
if os.path.exists(screenshot_path) and has_pil:
    print(f"Analyzing {screenshot_path}...")
    img = Image.open(screenshot_path)
    print(f"Image size: {img.size}, mode: {img.mode}")
    # Sample dominant colors
    small_img = img.resize((150, 150))
    colors = small_img.getcolors(maxcolors=30000)
    if colors:
        sorted_colors = sorted(colors, key=lambda x: x[0], reverse=True)
        print("Top 10 dominant colors (count, (R, G, B)):")
        for count, col in sorted_colors[:10]:
            if isinstance(col, tuple):
                hex_col = '#{:02x}{:02x}{:02x}'.format(col[0], col[1], col[2])
                print(f"  {count} pixels: {hex_col} {col}")

# 3. Analyze reference site (offpageseoservices.com)
ref_urls = [
    'https://offpageseoservices.com/',
    'https://offpageseoservices.com/robots.txt',
    'https://offpageseoservices.com/sitemap.xml',
    'https://offpageseoservices.com/sitemap_index.xml',
    'https://offpageseoservices.com/wp-sitemap.xml'
]

ref_results = {}
for u in ref_urls:
    res = fetch_url(u)
    if res:
        print(f"Fetched {u}: {len(res)} bytes")
        ref_results[u] = res
    else:
        print(f"Could not fetch {u}")

# Save discovery data to scripts/discovery_output.json
output_data = {
    "css_vars": css_vars,
    "css_urls": css_urls,
    "ref_keys": list(ref_results.keys()),
}
os.makedirs("docs", exist_ok=True)
with open("docs/discovery_raw.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, indent=2)

print("Discovery script part 1 complete!")
