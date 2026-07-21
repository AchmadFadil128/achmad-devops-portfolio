'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TransitionLink } from '@/components/route-transition';

const links = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'Profile' },
  { href: '/projects', label: 'Projects' },
  { href: '/certifications', label: 'Credentials' },
  { href: '/writings', label: 'Writings' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <TransitionLink href="/" className="brand" aria-label="Go to homepage">
          <Image src="/logo-light.png" alt="Logo" width={35} height={35} className="brand__mark" />
          <span className="brand__copy">
            <b>Achmad Fadil</b>
            <small>Cloud systems / 2026</small>
          </span>
        </TransitionLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => {
            const active =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={active ? 'nav-link is-active' : 'nav-link'}
              >
                <span>0{index + 1}</span>
                {link.label}
              </TransitionLink>
            );
          })}
        </nav>

        <a className="availability" href="mailto:me@achmad128.my.id">
          <span aria-hidden="true" />
          Available for systems work
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <div id="mobile-navigation" className={open ? 'mobile-nav is-open' : 'mobile-nav'}>
        {links.map((link, index) => (
          <TransitionLink key={link.href} href={link.href} className="mobile-nav__link">
            <span>0{index + 1}</span>
            {link.label}
          </TransitionLink>
        ))}
        <a href="mailto:me@achmad128.my.id" className="button button--primary">
          Start a conversation
        </a>
      </div>
    </header>
  );
}
