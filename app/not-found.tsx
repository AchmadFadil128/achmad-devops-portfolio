import { ArrowLeft, Orbit } from 'lucide-react';
import { TransitionLink } from '@/components/route-transition';

export default function NotFound() {
  return (
    <section className="not-found container">
      <Orbit className="not-found__icon" aria-hidden="true" />
      <p className="eyebrow">ROUTING ERROR / RESOURCE MISSING</p>
      <h1>4<span>0</span>4</h1>
      <p>The requested route drifted outside this cluster. Return to a known service endpoint.</p>
      <TransitionLink href="/" className="button button--primary"><ArrowLeft size={16} /> Return to index</TransitionLink>
    </section>
  );
}
