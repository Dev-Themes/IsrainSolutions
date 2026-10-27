import { MORPH_PIECES, path, type Point, type Finish } from "./hero-geometry";

export const HERO_DURATION = 20000;
export const INK = "var(--foreground)";
export const IVORY = "var(--background)";
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export function ramp(t: number, start: number, end: number) {
  const x = Math.max(0, Math.min(1, (t - start) / (end - start)));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

const ROLE_DELAY = { stem: 0, curve: .012, crossbar: .024, terminal: .04 };
const HINGE = { stem: .28, curve: .7, crossbar: .38, terminal: .95 };
const COLORS = {
  yellow: ["var(--brand-coral)", "var(--brand-burgundy)"],
  red: ["var(--brand-burgundy)", "var(--brand-blue)"],
  blue: ["var(--brand-blue)", "var(--brand-coral)"],
} as const;

export function surfaceColor(finish: Finish | undefined, t: number): string | undefined {
  if (!finish || !(finish in COLORS)) return;
  const [base, alternate] = COLORS[finish as keyof typeof COLORS];
  const turn = ramp(t, .32, .41), reset = ramp(t, .66, .73);
  // Use the shared CSS palette while retaining the original color-change timing.
  const blend = (turn * (1 - reset) * 100).toFixed(3);
  return `color-mix(in srgb, ${alternate} ${blend}%, ${base})`;
}

export type HeroFrame = ReturnType<typeof composeFrame>;

// One deterministic scene for geometry, surfaces and camera. Nothing runs through
// React state per frame, and no floating-point path is part of hydration markup.
export function composeFrame(t: number, compact: boolean, still = false) {
  const poster = still ? 0 : ramp(t, .30, .395) * (1 - ramp(t, .625, .725));
  const orbit = still ? 0 : ramp(t, .48, .555) * (1 - ramp(t, .635, .725));
  const merge = still ? 0 : ramp(t, .918, .955) * (1 - ramp(t, .972, 1));
  const monochrome = still ? 0 : ramp(t, .76, .82);
  const texture = still ? 1 : 1 - ramp(t, .815, .875);
  const spin = still ? 0 : Math.sin(ramp(t, .49, .72) * Math.PI) * .42;
  let maxX = 1, maxY = 1;

  const pieces = MORPH_PIECES.map((piece) => {
    const delay = piece.letter * .006 + ROLE_DELAY[piece.role];
    const form = still ? 1 : ramp(t, .055 + delay, .175 + delay) * (1 - ramp(t, .835 + delay * .2, .903 + delay * .2));
    const opening = still ? 0 : ramp(t, .018 + delay * .3, .06 + delay * .3) * (1 - ramp(t, .10 + delay, .19 + delay));
    const direction = piece.index % 2 ? 1 : -1;
    const rotation = opening * HINGE[piece.role] * direction;
    const cos = Math.cos(rotation), sin = Math.sin(rotation);
    const angle = spin * piece.orbitDirection;
    const orbitCos = Math.cos(angle), orbitSin = Math.sin(angle);
    const originX = 79 + piece.letter * 146;
    const dx = Math.cos(piece.angle) * opening * 22 + merge * (2.5 - piece.letter) * 146;
    const dy = Math.sin(piece.angle) * opening * 22;
    // A shallow curved flight path keeps the silhouettes separated during travel.
    const flight = still ? 0 : Math.sin(poster * Math.PI) * (1 - orbit) * 24;
    const landing = still ? 0 : Math.sin(ramp(t, .15 + delay, .23 + delay) * Math.PI) * 3;
    const points: Point[] = piece.seed.map((seed, i) => {
      const target = piece.target[i], tile = piece.poster[i], ring = piece.orbit[i];
      const letterX = mix(seed[0], target[0], form);
      const letterY = mix(seed[1], target[1], form);
      const orbitX = ring[0] + originX - 520;
      const orbitY = ring[1] - 120;
      const ringX = 520 + orbitX * orbitCos - orbitY * orbitSin - originX;
      const ringY = 120 + orbitX * orbitSin + orbitY * orbitCos;
      const x = mix(mix(letterX, tile[0], poster), ringX, orbit) - 76;
      const y = mix(mix(letterY, tile[1], poster), ringY, orbit) - 120;
      const localX = 76 + x * cos - y * sin + dx + flight * direction;
      const localY = 120 + x * sin + y * cos + dy - landing + flight * Math.sin(piece.angle);
      maxX = Math.max(maxX, Math.abs(localX + originX - 520));
      maxY = Math.max(maxY, Math.abs(localY - 120));
      return [localX, localY];
    });
    const finish = poster > .18 ? piece.posterFinish : piece.finish;
    return {
      d: path(points), finish,
      opacity: (still ? 1 : ramp(t, .07 + delay, .17 + delay)) * texture * (1 - monochrome),
    };
  });

  const posterZoom = compact ? 1.72 : 1.48;
  const desired = mix(mix(1.035, posterZoom, poster), 1.25, orbit);
  // Fit the complete moving silhouette, not just the assembled wordmark.
  // The fixed optical center prevents framing drift during the transformations.
  const scale = Math.min(desired, 468 / maxX, 244 / maxY);
  return { pieces, scale, merge };
}
