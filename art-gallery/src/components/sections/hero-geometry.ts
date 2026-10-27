// Only literal seed paths are serialized; sampled geometry is used after hydration.
export type Point = readonly [number, number];
export type Finish = "stripe" | "grid" | "rings" | "yellow" | "red" | "blue";
type Piece = { outline: Point[]; finish?: Finish; role: "stem" | "curve" | "crossbar" | "terminal" };
const PI = Math.PI;
const rect = (x: number, y: number, w: number, h: number): Point[] => [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];

function arc(cx: number, cy: number, rx: number, ry: number, innerX: number, innerY: number, start: number, end: number): Point[] {
  const points: Point[] = [];
  for (let i=0;i<=20;i++) {
    const a=start+(end-start)*i/20;
    points.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);
  }
  if (!innerX && !innerY) points.push([cx,cy]);
  else for (let i=20;i>=0;i--) {
    const a=start+(end-start)*i/20;
    points.push([cx+Math.cos(a)*innerX,cy+Math.sin(a)*innerY]);
  }
  return points;
}

const p: Piece[] = [
 {outline:rect(0,0,38,240),role:"stem"},
 {outline:rect(38,0,32,40),finish:"stripe",role:"crossbar"},
 {outline:arc(70,70,58,70,20,30,-PI/2,PI/2),finish:"blue",role:"curve"},
 {outline:rect(38,100,32,40),role:"crossbar"},
];
const LETTER_PIECES: Piece[][] = [
 p,
 [
 {outline:arc(64,150,64,90,28,52,-PI/2,0),finish:"yellow",role:"curve"},
 {outline:arc(64,150,64,90,28,52,0,PI/2),role:"curve"},
 {outline:arc(64,150,64,90,28,52,PI/2,PI),finish:"stripe",role:"curve"},
 {outline:arc(64,150,64,90,28,52,PI,PI*1.5),role:"curve"},
 ],
 p.map(piece=>({...piece,outline:piece.outline.map(([x,y])=>[x,y*.75+60] as Point)})),
 [
 {outline:[[0,240],[44,0],[70,0],[40,240]],role:"stem"},
 {outline:[[58,0],[84,0],[128,240],[88,240]],finish:"red",role:"stem"},
 {outline:rect(35,146,58,36),finish:"grid",role:"crossbar"},
 ],
 [
 {outline:rect(0,60,38,180),role:"stem"},
 {outline:rect(38,60,34,38),finish:"stripe",role:"crossbar"},
 {outline:arc(72,112,52,52,16,16,-PI/2,0),finish:"blue",role:"curve"},
 {outline:rect(88,112,36,24),role:"terminal"},
 ],
 [
 {outline:rect(45,12,38,188),role:"stem"},
 {outline:rect(8,65,112,36),finish:"stripe",role:"crossbar"},
 {outline:arc(85,200,40,40,2,2,PI/2,PI),finish:"yellow",role:"curve"},
 {outline:rect(85,202,35,38),finish:"grid",role:"terminal"},
 ],
];

// Preserve every corner while matching vertex counts for continuous path morphs.
export function sample(outline: Point[], count = 48): Point[] {
  const lengths = outline.map((p,i) => Math.hypot(p[0]-outline[(i+1)%outline.length][0],p[1]-outline[(i+1)%outline.length][1]));
  const perimeter = lengths.reduce((a,b)=>a+b,0);
  const available = count-outline.length;
  const subdivisions = lengths.map(length => 1+Math.floor(length/perimeter*available));
  const fractions = lengths.map((length,i)=>({i,remainder:length/perimeter*available-Math.floor(length/perimeter*available)})).sort((a,b)=>b.remainder-a.remainder || a.i-b.i);
  const remaining = count-subdivisions.reduce((a,b)=>a+b,0);
  for (let i=0;i<remaining;i++) subdivisions[fractions[i].i]++;
  return outline.flatMap((a,edge)=>Array.from({length:subdivisions[edge]},(_,i)=>{
    const b=outline[(edge+1)%outline.length],t=i/subdivisions[edge];
    return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t] as Point;
  }));
}

// Match perimeter start positions so pieces unfold rather than twist through themselves.
function align(reference: Point[], target: Point[]): Point[] {
  let best = 0, bestDistance = Infinity;
  for (let shift=0;shift<target.length;shift++) {
    let distance=0;
    for (let i=0;i<target.length;i++) {
      const point=target[(i+shift)%target.length];
      distance+=(point[0]-reference[i][0])**2+(point[1]-reference[i][1])**2;
    }
    if (distance<bestDistance) { bestDistance=distance; best=shift; }
  }
  return target.map((_,i)=>target[(i+best)%target.length]);
}

// An asymmetric poster built on one 56-unit grid. Larger shapes span cells;
// this is a composed image rather than a repeated table of equal-sized icons.
const POSTER_SLOTS = [
  [0,0,1,1,5], [1,0,1,2,3], [2,0,1.5,2,2], [5,0,1,2,0],
  [6,0,1,2,3], [0,1,1,1,3], [0,2,2,1,6], [2,2,1,1,0],
  [3,2,1,1,1], [4,2,1,1,3], [5,2,1,1,2], [6,2,1,1,4],
  [7,2,1,1,5], [0,3,1,1,5], [1,3,2,2,1], [3,3,2,1,4],
  [5,3,1,2,3], [6,3,2,2,2], [0,4,1,1,0], [3,4,1,1,3],
  [4,4,1,1,5], [3.5,0,1.5,2,7], [7,0,1,2,3],
] as const;
export const POSTER_FINISHES: (Finish | undefined)[] = [
  "red", "rings", undefined, "stripe", "yellow", "blue", "yellow", "grid",
  "rings", "red", undefined, "blue", undefined, "yellow", "stripe", undefined,
  "rings", "stripe", "grid", "red", "blue", "stripe", "red",
];

function posterShape(index: number, letter: number): Point[] {
  const [column,row,width,height,form]=POSTER_SLOTS[index];
  const x=296+column*56-(79+letter*146),y=140+row*56-160;
  const forms = [
    rect(0,0,1,1),
    arc(.5,.5,.5,.5,.24,.24,0,PI*2),
    [[0,1],[.5,0],[1,1]] as Point[],
    arc(0,1,1,1,0,0,-PI/2,0),
    rect(0,.3,1,.4),
    arc(.5,.5,.5,.5,0,0,0,PI*2),
    [[0,0],[1,.5],[0,1]] as Point[],
    [[0,0],[1,1],[0,1]] as Point[],
  ];
  return sample(forms[form].map(p=>[p[0]*width*56+x,p[1]*height*56+y]));
}

function orbitShape(index: number, letter: number): Point[] {
  const inner=index<8,count=inner ? 8 : 15,slot=inner ? index : index-8;
  const gap=.035,start=slot/count*PI*2-PI/2+gap,end=(slot+1)/count*PI*2-PI/2-gap;
  return sample(arc(520-(79+letter*146),120,inner ? 96 : 174,inner ? 96 : 174,inner ? 48 : 118,inner ? 48 : 118,start,end));
}

export function path(points: Point[]): string {
  let d = "";
  for (let i = 0; i < points.length; i++) {
    d += `${i ? "L" : "M"}${points[i][0].toFixed(2)},${points[i][1].toFixed(2)}`;
  }
  return d+"Z";
}

export const INITIAL_DISC = "M32 120a44 44 0 1 0 88 0a44 44 0 1 0-88 0Z";
export const EMPTY_PATH = "M76 120Z";
export const MORPH_PIECES = LETTER_PIECES.flatMap((pieces,letter)=>pieces.map((piece,index)=>{
  const seed=sample(arc(76,120,44,44,0,0,-PI/2+index/pieces.length*PI*2,-PI/2+(index+1)/pieces.length*PI*2));
  const target=align(seed,sample(piece.outline));
  return {letter,index,finish:piece.finish,role:piece.role,seed,target,angle:-PI/2+(index+.5)/pieces.length*PI*2};
})).map((piece,index)=>({
  ...piece,
  posterFinish: POSTER_FINISHES[index],
  orbitDirection: index < 8 ? 1 : -1,
  poster: align(piece.target,posterShape(index,piece.letter)),
  orbit: align(piece.target,orbitShape(index,piece.letter)),
}));
