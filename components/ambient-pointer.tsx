'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AmbientPointer() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || !glow.current) return;
    const xTo = gsap.quickTo(glow.current, 'x', { duration: 0.7, ease: 'power3' });
    const yTo = gsap.quickTo(glow.current, 'y', { duration: 0.7, ease: 'power3' });

    const move = (event: PointerEvent) => {
      xTo(event.clientX - 240);
      yTo(event.clientY - 240);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <div ref={glow} className="ambient-pointer" aria-hidden="true" />;
}
