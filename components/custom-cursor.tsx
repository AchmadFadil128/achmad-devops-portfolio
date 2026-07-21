'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const moveDot = gsap.quickTo(dot.current, 'x', { duration: 0.16, ease: 'power3' });
    const moveDotY = gsap.quickTo(dot.current, 'y', { duration: 0.16, ease: 'power3' });
    const moveRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const moveRingY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    const onMove = (event: MouseEvent) => {
      moveDot(event.clientX);
      moveDotY(event.clientY);
      moveRing(event.clientX);
      moveRingY(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      gsap.to(ring.current, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.45 : 0.8,
        duration: 0.25,
      });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
