'use client';

import { type PropsWithChildren, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        root.current,
        { y: 46, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
