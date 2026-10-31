"""Trace the supplied logo into morphable vector contours; no raster is used by the hero."""
from PIL import Image
import numpy as np
from collections import deque, defaultdict
import json, math
im=np.array(Image.open('public/Brand-Asset/final_logo.png').convert('RGBA'))
# Split the original transparent artwork by ink, keeping the white wave above
# the lettering. Alpha, rather than brightness, distinguishes ink from canvas.
rgb=im[761:1564,476:1536,:3]
alpha=im[761:1564,476:1536,3]>127
black=alpha & (rgb.max(axis=2)<80)
blue=alpha & (rgb[:,:,2]>180) & (rgb[:,:,0]<80)
coral=alpha & (rgb[:,:,0]>100) & (rgb[:,:,1]<190) & ~blue
white=alpha & (rgb.min(axis=2)>200)
mask=black|blue|coral|white
labels=np.zeros(mask.shape,dtype=np.uint8)
for ink,layer in enumerate([black,blue,coral,white],1): labels[layer]=ink
seen=np.zeros(mask.shape,dtype=bool)
components=[]
for y,x in zip(*np.where(mask)):
 if seen[y,x]: continue
 q=deque([(int(x),int(y))]);seen[y,x]=True;pixels=[]
 while q:
  px,py=q.popleft();pixels.append((px,py))
  for nx,ny in ((px-1,py),(px+1,py),(px,py-1),(px,py+1)):
   if 0<=nx<mask.shape[1] and 0<=ny<mask.shape[0] and mask[ny,nx] and labels[ny,nx]==labels[y,x] and not seen[ny,nx]:seen[ny,nx]=True;q.append((nx,ny))
 if len(pixels)>18:components.append(pixels)
def sample(points,n=160):
 # Smooth the raster stair steps before sampling the vector silhouette.
 for _ in range(2):
  points=[tuple(sum(points[(i+j)%len(points)][axis] for j in range(-2,3))/5 for axis in (0,1)) for i in range(len(points))]
 lengths=[math.dist(p,points[(i+1)%len(points)]) for i,p in enumerate(points)];total=sum(lengths);out=[];edge=0;offset=0
 for k in range(n):
  d=k*total/n
  while edge<len(points)-1 and offset+lengths[edge]<d:offset+=lengths[edge];edge+=1
  a=points[edge];b=points[(edge+1)%len(points)];t=(d-offset)/(lengths[edge] or 1)
  out.append([round(202+(a[0]+(b[0]-a[0])*t)*.60,2),round(59+(a[1]+(b[1]-a[1])*t)*.60,2)])
 return out
result=[]
for pixels in sorted(components,key=lambda pixels:int(labels[pixels[0][1],pixels[0][0]])):
 region=set(pixels);edges=defaultdict(list)
 for x,y in pixels:
  if (x,y-1) not in region:edges[(x,y)].append((x+1,y))
  if (x+1,y) not in region:edges[(x+1,y)].append((x+1,y+1))
  if (x,y+1) not in region:edges[(x+1,y+1)].append((x,y+1))
  if (x-1,y) not in region:edges[(x,y+1)].append((x,y))
 contours=[]
 while edges:
  start=next(iter(edges));point=start;loop=[]
  while point in edges:
   loop.append(point);nxt=edges[point].pop()
   if not edges[point]:del edges[point]
   point=nxt
   if point==start:break
  if len(loop)>10:contours.append(loop)
 if not contours:continue
 contours.sort(key=lambda p:abs(sum(p[i][0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*p[i][1] for i in range(len(p)))),reverse=True)
 ink=int(labels[pixels[0][1],pixels[0][0]])
 result.append({'letter':'logo-part','color':{1:'#000000',2:'#1440ff',3:'#f87966',4:'#ffffff'}[ink],'gradient':ink==3,'contours':[sample(c,320 if ink==4 else 160) for c in contours]})
with open('src/components/sections/brand-glyphs.json','w') as f:json.dump(result,f,separators=(',',':'))
print('Traced',len(result),'independent logo objects including original lettering, dots and symbol')
