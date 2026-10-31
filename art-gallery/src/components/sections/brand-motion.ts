import glyphs from './brand-glyphs.json';
type Point = number[];
const TAU = Math.PI * 2;
export const BRAND_DURATION = 16000;
export const smooth = (t:number,a:number,b:number) => { const x=Math.max(0,Math.min(1,(t-a)/(b-a))); return x*x*x*(x*(x*6-15)+10); };
export const toPath = (contours:Point[][]) => contours.map(points => points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('')+'Z').join('');
function align(source:Point[],target:Point[]) {
  let best=target,score=Infinity;
  const winding=(points:Point[])=>Math.sign(points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];},0));
  const order=winding(source)===winding(target)?target:[...target].reverse();
  for(let shift=0;shift<order.length;shift++) {
    const candidate=order.map((_,i)=>order[(i+shift)%order.length]);
    const distance=candidate.reduce((sum,p,i)=>sum+(p[0]-source[i][0])**2+(p[1]-source[i][1])**2,0);
    if(distance<score){score=distance;best=candidate;}
  }
  return best;
}
function polygon(vertices:Point[],count:number) {
  const lengths=vertices.map((p,i)=>Math.hypot(p[0]-vertices[(i+1)%vertices.length][0],p[1]-vertices[(i+1)%vertices.length][1]));
  const total=lengths.reduce((a,b)=>a+b,0);
  return Array.from({length:count},(_,i)=>{let d=i/count*total,edge=0;while(edge<lengths.length-1&&d>lengths[edge]){d-=lengths[edge];edge++;}const a=vertices[edge],b=vertices[(edge+1)%vertices.length],t=d/lengths[edge];return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];});
}
const POSTER_SLOTS = [
    [260,150,80,80], [340,150,140,80], [480,150,80,160], [560,150,160,80],
    [720,150,80,80], [260,230,160,80], [420,230,60,80], [560,230,80,80],
    [640,230,160,80], [260,310,160,160], [420,310,220,160], [640,310,160,160],
 ] as const;

// Expand the finite poster layout to the actual number of traced logo objects.
const POSTER_ASSIGNMENTS = glyphs.map((_, index) => ({
  slot: POSTER_SLOTS[index % POSTER_SLOTS.length],
  cell: Math.floor(index / POSTER_SLOTS.length),
}));

export const BRAND_GLYPHS=glyphs.map((glyph,index)=>{
  const cx=328+(index%4)*128,cy=172+Math.floor(index/4)*128;
  const tile=glyph.contours.map((contour,hole)=>{
    const radius=hole? (index%3===0?24:0):56;
    let points:Point[];
    if(!hole&&index%4===1) points=polygon([[cx,cy-56],[cx+56,cy+56],[cx-56,cy+56]],contour.length);
    else if(!hole&&index%4===2) points=polygon([[cx-56,cy-56],[cx+56,cy-56],[cx+56,cy+56],[cx-56,cy+56]],contour.length);
    else points=contour.map((_,i)=>[cx+Math.cos(i/contour.length*TAU)*radius,cy+Math.sin(i/contour.length*TAU)*radius]);
    return align(contour,points);
  });
  const orbit=glyph.contours.map((contour,hole)=>{
    const start=index/glyphs.length*TAU-Math.PI/2+.006,end=(index+1)/glyphs.length*TAU-Math.PI/2-.006;
    const points=hole?contour.map(()=>[520+Math.cos((start+end)/2)*153,300+Math.sin((start+end)/2)*153]):polygon([
      ...Array.from({length:17},(_,i)=>[520+Math.cos(start+(end-start)*i/16)*218,300+Math.sin(start+(end-start)*i/16)*218]),
      ...Array.from({length:17},(_,i)=>[520+Math.cos(end-(end-start)*i/16)*92,300+Math.sin(end-(end-start)*i/16)*92]),
    ],contour.length);
    return align(tile[hole],points);
  });
  const sourceCenter = [cx, cy];
  // Assign every logo object a valid slot, including objects beyond slot 12.
  const { slot, cell } = POSTER_ASSIGNMENTS[index];
  const [sx, sy, sw, sh] = slot;
  const poster = tile.map(contour => contour.map(p => [
    sx + sw * (.25 + (cell % 2) * .5) + (p[0] - cx) * sw / 250,
    sy + sh * (.25 + Math.floor(cell / 2) * .5) + (p[1] - cy) * sh / 250,
  ]));
  const ribbon = tile.map(contour => contour.map(p => [210+(index%7)*100+(p[0]-sourceCenter[0])*.72,140+Math.floor(index/7)*65+(p[1]-sourceCenter[1])*.40]));
  const angle = index/glyphs.length*TAU;
  const fan = tile.map(contour => contour.map(p => {
    const x=(p[0]-cx)*.28,y=(p[1]-cy)*.28;
    return [520+Math.cos(angle)*178+x*Math.cos(angle)-y*Math.sin(angle),300+Math.sin(angle)*178+x*Math.sin(angle)+y*Math.cos(angle)];
  }));
  const compact = orbit.map(contour => contour.map(p => [520+(p[0]-520)*.18,300+(p[1]-300)*.18]));
  return {...glyph,tile,orbit,poster,ribbon,fan,compact,d:toPath(glyph.contours)};
});

// Each landmark has a short settling interval. Quintic easing gives zero velocity
// and acceleration at both ends, including the boundary of the continuous loop.
const LANDMARKS = [
  {at:0,pose:'contours',texture:0}, {at:.08,pose:'contours',texture:0},
  {at:.19,pose:'ribbon',texture:.35}, {at:.28,pose:'poster',texture:.85},
  {at:.34,pose:'poster',texture:.85}, {at:.46,pose:'orbit',texture:.12},
  {at:.54,pose:'compact',texture:0}, {at:.65,pose:'fan',texture:.65},
  {at:.75,pose:'poster',texture:.85}, {at:.88,pose:'contours',texture:0},
  {at:1,pose:'contours',texture:0},
] as const;

export function brandFrame(t:number) {
  let stage=0;
  while(stage<LANDMARKS.length-2 && t>LANDMARKS[stage+1].at) stage++;
  const from=LANDMARKS[stage],to=LANDMARKS[stage+1];
  const blend=smooth(t,from.at,to.at);
  const centers:Point[]=[];
  const paths=BRAND_GLYPHS.map((glyph,index)=>{
    const delay=(index%4)*.002;
    const amount=from.pose===to.pose?blend:smooth(t,from.at+delay,to.at);
    const a=glyph[from.pose],b=glyph[to.pose];
    let cx=0,cy=0;
    const contours=a.map((contour,h)=>contour.map((p,i)=>{
      const q=b[h][i],x=p[0]+(q[0]-p[0])*amount,y=p[1]+(q[1]-p[1])*amount;
      if(h===0){cx+=x;cy+=y;}
      return [x,y];
    }));
    centers.push([cx/a[0].length,cy/a[0].length]);
    return toPath(contours);
  });
  return {paths,centers,texture:from.texture+(to.texture-from.texture)*blend};
}
