import os
from PIL import Image

ref_dir = "reference"
images = [
    "home page.png",
    "service page.png",
    "guest-post-site.png",
    "link-insertion-site.png",
    "da-pa-checker.png",
    "about-us.png",
    "blog.png",
    "contact.png"
]

print("--- REFERENCE IMAGES ANALYSIS ---")
for img_name in images:
    img_path = os.path.join(ref_dir, img_name)
    if os.path.exists(img_path):
        img = Image.open(img_path)
        print(f"{img_name}: Size {img.size[0]}x{img.size[1]} | Mode: {img.mode}")
    else:
        print(f"Missing: {img_name}")
