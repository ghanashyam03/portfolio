'use client';

import dynamic from 'next/dynamic';

const ResearchVisual = dynamic(
  () => import('./ResearchVisual'),
  { ssr: false }
);

export function ResearchVisualWrapper() {
  return <ResearchVisual />;
}

export default ResearchVisualWrapper;
