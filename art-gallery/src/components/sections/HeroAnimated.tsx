"use client";

import { useEffect, useId, useRef, useState } from 'react';
import type { Locale } from '@/types/portfolio';
import { BRAND_GLYPHS, BRAND_DURATION, brandFrame } from './brand-motion';
import styles from './HeroAnimated.module.css';

const PALETTE = ['#161616', '#f87966', '#1440ff'];

export function HeroAnimated({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, '');
  const [paused, setPaused] = useState(false);
  const actions = useRef({ pause: () => {}, remix: () => {} });

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const svg = section.querySelector('svg')!;
    const paths = [...section.querySelectorAll<SVGPathElement>('[data-glyph]')];
    const textures = [...section.querySelectorAll<SVGPathElement>('[data-texture]')];
    const groups = [...section.querySelectorAll<SVGGElement>('[data-piece]')];
    const offsets = groups.map(() => ({ x: 0, y: 0, rotation: 0 }));
    let clock: Animation | null = null;
    let raf = 0, visible = true, last = -1, previousTime = 0, manualPause = false, variation = 0;
    let pointer: { x: number; y: number } | null = null;
    let frame = brandFrame(0);
    const ink = (i: number) => BRAND_GLYPHS[i].gradient ? `url(#${id}-coral)` : BRAND_GLYPHS[i].color;

    const draw = (t: number) => {
      frame = brandFrame(t);
      paths.forEach((path, i) => path.setAttribute('d', frame.paths[i]));
      // A remix colors dispersed shapes; the assembled identity always regains
      // its original inks, including the white wave and coral gradient.
      const assembled = t <= .08 || t >= .88;
      paths.forEach((path, i) => {
        path.style.fill = assembled || variation === 0 ? ink(i) : PALETTE[(i + variation) % PALETTE.length];
      });
      textures.forEach((path, i) => {
        path.setAttribute('d', frame.paths[i]);
        path.style.opacity = String(frame.texture);
      });
    };
    const tick = (now: number) => {
      if (!clock || !visible || document.hidden) { raf = 0; return; }
      const dt = previousTime ? Math.min((now - previousTime) / 1000, .05) : 1 / 60;
      previousTime = now;
      const time = (Number(clock.currentTime ?? 0) % BRAND_DURATION) / BRAND_DURATION;
      const t = time < .08 || time > .88 ? 0 : time > .28 && time < .34 ? .30 : time;
      if (t !== last) { draw(t); last = t; }
      // Time-based damping behaves consistently at 30, 60 and 120 Hz.
      const damping = 1 - Math.exp(-dt * 10);
      groups.forEach((group, i) => {
        const [cx, cy] = frame.centers[i];
        const dx = pointer ? cx - pointer.x : 0;
        const dy = pointer ? cy - pointer.y : 0;
        const distance = Math.hypot(dx, dy);
        const influence = pointer ? Math.exp(-distance * distance / (220 * 220)) : 0;
        const targetX = dx / Math.max(distance, 1) * influence * 16;
        const targetY = dy / Math.max(distance, 1) * influence * 16;
        const offset = offsets[i];
        offset.x += (targetX - offset.x) * damping;
        offset.y += (targetY - offset.y) * damping;
        offset.rotation += (influence * (i % 2 ? 2 : -2) - offset.rotation) * damping;
        group.setAttribute('transform', `translate(${offset.x.toFixed(3)} ${offset.y.toFixed(3)}) rotate(${offset.rotation.toFixed(3)} ${cx.toFixed(2)} ${cy.toFixed(2)})`);
      });
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (!clock) return;
      if (!visible || document.hidden) {
        clock.pause(); cancelAnimationFrame(raf); raf = 0; previousTime = 0;
      } else {
        if (manualPause) clock.pause(); else clock.play();
        if (!raf) raf = requestAnimationFrame(tick);
      }
    };
    const remix = () => {
      variation = (variation + 1) % PALETTE.length;
      const t = (Number(clock?.currentTime ?? 0) % BRAND_DURATION) / BRAND_DURATION;
      draw(t);
    };
    actions.current = {
      pause: () => { manualPause = !manualPause; setPaused(manualPause); sync(); },
      remix,
    };
    const setup = () => {
      clock?.cancel(); cancelAnimationFrame(raf); raf = 0; last = -1; previousTime = 0;
      pointer = null;
      offsets.forEach(offset => { offset.x = 0; offset.y = 0; offset.rotation = 0; });
      groups.forEach(group => group.removeAttribute('transform'));
      draw(0);
      if (reduced.matches) { clock = null; return; }
      clock = section.animate([
        { offset: 0, backgroundColor: '#f8fafc' },
        { offset: .08, backgroundColor: '#f8fafc' },
        { offset: .28, backgroundColor: '#e4e9ff' },
        { offset: .46, backgroundColor: '#ffe8df' },
        { offset: .54, backgroundColor: '#f1f3ff' },
        { offset: .65, backgroundColor: '#e4e9ff' },
        { offset: .88, backgroundColor: '#f8fafc' },
        { offset: 1, backgroundColor: '#f8fafc' },
      ], { duration: BRAND_DURATION, iterations: Infinity, easing: 'ease-in-out' });
      sync();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || (event.target as Element).closest('button')) return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      pointer = { x: point.x, y: point.y };
    };
    const leave = () => { pointer = null; };
    const press = (event: PointerEvent) => {
      if ((event.target as Element).closest('button')) return;
      move(event); remix();
    };
    const release = (event: PointerEvent) => { if (event.pointerType !== 'mouse') leave(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(section);
    section.addEventListener('pointermove', move);
    section.addEventListener('pointerleave', leave);
    section.addEventListener('pointerdown', press);
    section.addEventListener('pointerup', release);
    section.addEventListener('pointercancel', leave);
    reduced.addEventListener('change', setup);
    document.addEventListener('visibilitychange', sync);
    setup();
    return () => {
      clock?.cancel(); cancelAnimationFrame(raf); observer.disconnect();
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', leave);
      section.removeEventListener('pointerdown', press);
      section.removeEventListener('pointerup', release);
      section.removeEventListener('pointercancel', leave);
      reduced.removeEventListener('change', setup);
      document.removeEventListener('visibilitychange', sync);
      actions.current = { pause: () => {}, remix: () => {} };
    };
  }, [id]);

  return <section ref={root} className={styles.hero} aria-label={locale === 'fr' ? 'PopArt Agency — Identité en mouvement' : 'PopArt Agency — Brand in motion'}>
    <h1 className="sr-only">PopArt Agency</h1>
    <svg viewBox="0 0 1040 600" className={styles.art} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-coral`} x1="0" y1="80" x2="0" y2="245" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff9b70" />
          <stop offset=".48" stopColor="#f56b64" />
          <stop offset="1" stopColor="#8f2f45" />
        </linearGradient>
        <pattern id={`${id}-lines`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="9" height="9" fill="#fff" /><rect width="4" height="9" fill="#1440ff" /></pattern>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff" /><circle cx="8" cy="8" r="5" fill="#f87966" /></pattern>
        <pattern id={`${id}-rings`} width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="#fff" />{Array.from({ length: 12 }, (_, i) => <circle key={i} cx="50" cy="50" r={i * 5 + 2} stroke="#1440ff" strokeWidth="2.5" fill="none" />)}</pattern>
      </defs>
      {BRAND_GLYPHS.map((glyph, i) => <g key={i} data-piece={i}>
        <path data-glyph={i} d={glyph.d} fill={glyph.gradient ? `url(#${id}-coral)` : glyph.color} fillRule="nonzero" />
        <path d={glyph.d} data-texture={i} fill={`url(#${id}-${['lines', 'dots', 'rings'][i % 3]})`} fillRule="nonzero" opacity="0" />
      </g>)}
    </svg>
    <div className={styles.controls}>
      <span className={styles.hint}>{locale === 'fr' ? 'Explorez les formes · Touchez pour remixer' : 'Explore the shapes · Tap to remix'}</span>
      <div className={styles.buttons}>
        <button type="button" onClick={() => actions.current.remix()}>{locale === 'fr' ? 'Remixer' : 'Remix'} <span aria-hidden="true">↗</span></button>
        <button type="button" aria-pressed={paused} onClick={() => actions.current.pause()}>{paused ? (locale === 'fr' ? 'Reprendre' : 'Resume') : (locale === 'fr' ? 'Pause' : 'Pause')}</button>
      </div>
    </div>
  </section>;
}
