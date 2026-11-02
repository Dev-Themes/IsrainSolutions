'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Comparison() {
  const [position, setPosition] = useState(50);
  return <figure className="comparison">
    <div className="comparison-images">
      <Image src="/images/after-generated.png" fill sizes="(max-width: 768px) 100vw, 1100px" alt="Illustrated example of a repaired timber floor and dry walls" />
      <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src="/images/before-generated.png" fill sizes="(max-width: 768px) 100vw, 1100px" alt="Illustrated example of water-damaged timber flooring and walls" />
      </div>
      <span className="comparison-label before-label">Before</span><span className="comparison-label after-label">After</span>
      <span aria-hidden="true" className="comparison-line" style={{ left: `${position}%` }} />
    </div>
    <label className="comparison-control">Move to compare the illustrated before and after
      <input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-valuetext={`${position}% before visible`} />
    </label>
    <figcaption>Illustrative images, not photographs of a completed client project.</figcaption>
  </figure>;
}
