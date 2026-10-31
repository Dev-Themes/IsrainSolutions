"""Extend the bundled OFL fonts using their own existing breve/comma outlines.

No Latin outlines or metrics are replaced. Composite accents inherit the original
variable outlines. This keeps builds offline and preserves the existing design.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen

for family in ("Geist", "GeistMono"):
    font = TTFont(f"src/fonts/{family}-Latin-Variable.woff2")
    glyf = font["glyf"]
    cmap = font.getBestCmap()
    additions = {}
    for code, base_code, accent in ((0x103, 0x61, "uni0306"),
                                    (0x218, 0x53, "comma"),
                                    (0x219, 0x73, "comma"),
                                    (0x21A, 0x54, "comma"),
                                    (0x21B, 0x74, "comma")):
        base = cmap[base_code]
        name = f"uni{code:04X}"
        b, a = glyf[base], glyf[accent]
        center = (b.xMin + b.xMax) / 2
        pen = TTGlyphPen(font.getGlyphSet())
        pen.addComponent(base, (1, 0, 0, 1, 0, 0))
        if accent == "uni0306":
            dx = round(center - (a.xMin + a.xMax) / 2)
            dy = round(b.yMax + 65 - a.yMin)
            transform = (1, 0, 0, 1, dx, dy)
        else:
            # A comma below (not a cedilla), clearly separated from the stem.
            scale = 0.75
            dx = round(center - (a.xMin + a.xMax) * scale / 2)
            dy = round(-55 - a.yMax * scale)
            transform = (scale, 0, 0, scale, dx, dy)
        pen.addComponent(accent, transform)
        glyf[name] = pen.glyph()
        font["hmtx"].metrics[name] = font["hmtx"].metrics[base]
        font["gvar"].variations[name] = []
        if "HVAR" in font:
            for key in ("AdvWidthMap", "LsbMap", "RsbMap"):
                mapping = getattr(font["HVAR"].table, key, None)
                if mapping and base in mapping.mapping:
                    mapping.mapping[name] = mapping.mapping[base]
        additions[code] = name
    for table in font["cmap"].tables:
        if table.isUnicode():
            table.cmap.update(additions)
    # Give this derived subset a distinct name; retain original OFL notices.
    for record in font["name"].names:
        if record.nameID in (1, 3, 4, 6, 16):
            text = record.toUnicode().replace("Geist", "PopArtGeist")
            record.string = text.encode(record.getEncoding())
    font.flavor = "woff2"
    output = Path(f"src/fonts/{family}-Romanian-Variable.woff2")
    font.save(output)
    check = TTFont(output)
    assert all(c in check.getBestCmap() for c in (0x103, 0xE2, 0xEE, 0x219, 0x21B, 0x102, 0xC2, 0xCE, 0x218, 0x21A))
    print(f"Prepared {output}, Romanian glyph coverage verified")
