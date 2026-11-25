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

# Let's inspect the top 1000px and middle sections of each image to see colors and layout
print("Inspecting reference screenshot layout heights and bands...")
for img_name in images:
    img_path = os.path.join(ref_dir, img_name)
    if os.path.exists(img_path):
        img = Image.open(img_path)
        w, h = img.size
        # Sample header color at (w//2, 30)
        hdr_pixel = img.getpixel((w // 2, 30))
        # Sample hero color at (w//2, 200)
        hero_pixel = img.getpixel((w // 2, 200))
        print(f"\n[{img_name}] Total Height: {h}px")
        print(f"  Header area sample: {hdr_pixel}")
        print(f"  Hero area sample: {hero_pixel}")
