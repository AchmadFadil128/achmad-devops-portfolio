'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        root.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' },
      );
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
