'use client';

import dynamic from 'next/dynamic';

const HeroOrbit = dynamic(
  () => import('./HeroOrbit'),
  { ssr: false }
);

export function HeroOrbitWrapper() {
  return <HeroOrbit />;
}

export default HeroOrbitWrapper;
