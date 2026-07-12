import type { Metadata, Viewport } from 'next';
import { RouteTransitionProvider } from '@/components/route-transition';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AmbientPointer } from '@/components/ambient-pointer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://achmad128.my.id'),
  title: {
    default: 'Achmad Fadil | DevOps & Cloud Engineer',
    template: '%s | Achmad Fadil',
  },
  description:
    'DevOps and cloud engineering portfolio focused on Kubernetes, observability, automation, and reliable infrastructure.',
  openGraph: {
    title: 'Achmad Fadil | DevOps & Cloud Engineer',
    description:
      'Building reliable Kubernetes platforms, observability stacks, and automated infrastructure.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080b0d',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <RouteTransitionProvider>
          <AmbientPointer />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
