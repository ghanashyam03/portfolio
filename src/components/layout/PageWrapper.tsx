'use client';

import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="relative z-10 min-h-screen w-full text-[#F5F7FF]">
      {children}
    </main>
  );
}

export default PageWrapper;
