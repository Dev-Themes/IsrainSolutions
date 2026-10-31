"""Replace only the final year digit in the traced hero, retaining all other objects."""
import json
import math
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.basePen import BasePen

path = Path("src/components/sections/brand-glyphs.json")
data = json.loads(path.read_text())
font = instantiateVariableFont(TTFont("src/fonts/Geist-Latin-Variable.woff2"), {"wght": 400}, inplace=True)
glyphs = font.getGlyphSet()

class Outline(BasePen):
    def __init__(self):
        super().__init__(glyphs)
        self.contours = []
        self.points = []
    def _moveTo(self, point):
        self.points = [point]
    def _lineTo(self, point):
        self.points.append(point)
    def _curveToOne(self, p1, p2, p3):
        p0 = self.points[-1]
        for i in range(1, 25):
            t = i / 24
            self.points.append(tuple((1-t)**3*p0[j]+3*(1-t)**2*t*p1[j]+3*(1-t)*t*t*p2[j]+t**3*p3[j] for j in (0, 1)))
    def _qCurveToOne(self, p1, p2):
        p0 = self.points[-1]
        for i in range(1, 25):
            t = i / 24
            self.points.append(tuple((1-t)**2*p0[j]+2*(1-t)*t*p1[j]+t*t*p2[j] for j in (0, 1)))
    def _closePath(self):
        self.contours.append(self.points)
    def _endPath(self):
        self._closePath()

pen = Outline()
glyphs[font.getBestCmap()[ord("6")]].draw(pen)
all_points = [p for c in pen.contours for p in c]
xmin, xmax = min(p[0] for p in all_points), max(p[0] for p in all_points)
ymin, ymax = min(p[1] for p in all_points), max(p[1] for p in all_points)
old = [p for c in data[12]["contours"] for p in c]
left, right = min(p[0] for p in old), max(p[0] for p in old)
top, bottom = min(p[1] for p in old), max(p[1] for p in old)
contours = []
for contour in pen.contours:
    points = [(left + (x-xmin)/(xmax-xmin)*(right-left), bottom-(y-ymin)/(ymax-ymin)*(bottom-top)) for x, y in contour]
    lengths = [math.dist(p, points[(i+1) % len(points)]) for i, p in enumerate(points)]
    total, edge, offset = sum(lengths), 0, 0
    sampled = []
    for i in range(160):
        distance = total * i / 160
        while edge < len(points)-1 and offset+lengths[edge] < distance:
            offset += lengths[edge]
            edge += 1
        a, b = points[edge], points[(edge+1) % len(points)]
        t = (distance-offset)/(lengths[edge] or 1)
        sampled.append([round(a[j]+(b[j]-a[j])*t, 2) for j in (0, 1)])
    contours.append(sampled)
data[12]["contours"] = contours
path.write_text(json.dumps(data, separators=(",", ":")))
print("Changed only hero object 12: final year digit 5 to 6")
