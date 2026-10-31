from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.basePen import BasePen
import math,json
font=instantiateVariableFont(TTFont('src/fonts/Geist-Latin-Variable.woff2'),{'wght':800},inplace=True)
glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); upm=font['head'].unitsPerEm
class Pen(BasePen):
 def __init__(self): super().__init__(glyphs); self.contours=[];self.points=[]
 def _moveTo(self,p): self.points=[p]
 def _lineTo(self,p): self.points.append(p)
 def _qCurveToOne(self,p1,p2):
  p0=self.points[-1]
  for i in range(1,17):
   t=i/16;self.points.append(((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0],(1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]))
 def _curveToOne(self,p1,p2,p3):
  p0=self.points[-1]
  for i in range(1,17):
   t=i/16;self.points.append(tuple((1-t)**3*p0[j]+3*(1-t)**2*t*p1[j]+3*(1-t)*t*t*p2[j]+t**3*p3[j] for j in [0,1]))
 def _closePath(self): self.contours.append(self.points);self.points=[]
 def _endPath(self): self._closePath()
def sample(points,n=160):
 lengths=[math.dist(p,points[(i+1)%len(points)]) for i,p in enumerate(points)]; total=sum(lengths);result=[];edge=0;offset=0
 for k in range(n):
  d=k*total/n
  while edge<len(points)-1 and offset+lengths[edge]<d: offset+=lengths[edge];edge+=1
  a=points[edge];b=points[(edge+1)%len(points)];t=(d-offset)/(lengths[edge] or 1);result.append([round(a[0]+(b[0]-a[0])*t,2),round(a[1]+(b[1]-a[1])*t,2)])
 return result
def area(p): return abs(sum(p[i][0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*p[i][1] for i in range(len(p))))
data=[]
for word,size,baseline,spacing in [('PopArt',210,280,-9),('Agency',126,450,13)]:
 advances=[glyphs[cmap[ord(c)]].width/upm*size+spacing for c in word]; x=(1040-sum(advances)+spacing)/2
 for c,advance in zip(word,advances):
  pen=Pen();glyphs[cmap[ord(c)]].draw(pen);contours=sorted(pen.contours,key=area,reverse=True)
  data.append({'letter':c,'contours':[sample([[x+p[0]/upm*size,baseline-p[1]/upm*size] for p in points]) for points in contours]});x+=advance
with open('src/components/sections/brand-glyphs.json','w') as f: json.dump(data,f,separators=(',',':'))
print('Prepared',len(data),'actual Geist glyph outlines')
