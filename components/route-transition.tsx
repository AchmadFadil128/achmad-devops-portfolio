'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  type MouseEvent,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { gsap } from 'gsap';

const TransitionContext = createContext<{
  navigate: (href: string) => void;
}>({ navigate: () => undefined });

export function RouteTransitionProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const locked = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || locked.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }

      locked.current = true;
      gsap.set(panel.current, { transformOrigin: 'bottom', scaleY: 0, display: 'block' });
      gsap.to(panel.current, {
        scaleY: 1,
        duration: 0.52,
        ease: 'power4.inOut',
        onComplete: () => router.push(href),
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!locked.current || !panel.current) return;
    gsap.set(panel.current, { transformOrigin: 'top' });
    gsap.to(panel.current, {
      scaleY: 0,
      duration: 0.58,
      delay: 0.08,
      ease: 'power4.inOut',
      onComplete: () => {
        locked.current = false;
        gsap.set(panel.current, { display: 'none' });
      },
    });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div className="route-wipe" ref={panel} aria-hidden="true">
        <div className="route-wipe__inner">
          <span>AF</span>
          <small>REDEPLOYING INTERFACE</small>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useContext(TransitionContext);
  const target = typeof href === 'string' ? href : href.pathname ?? '/';

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank' ||
      typeof target !== 'string' ||
      target.startsWith('http') ||
      target.startsWith('mailto:')
    ) {
      return;
    }

    event.preventDefault();
    navigate(target);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
