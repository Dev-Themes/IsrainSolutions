from PIL import Image

img = Image.open("reference/home page.png")
w, h = img.size

# Crop top 100px (header)
header_crop = img.crop((0, 0, w, 100))
header_crop.save("reference/header_cropped_sample.png")
print("Saved reference/header_cropped_sample.png")

# Also let's inspect the parent screenshot header
parent_img = Image.open("reference/screencapture-israinsols-2026-11-25-15_50_47.png")
pw, ph = parent_img.size
parent_header = parent_img.crop((0, 0, pw, 100))
parent_header.save("reference/parent_header_sample.png")
print("Saved reference/parent_header_sample.png")
