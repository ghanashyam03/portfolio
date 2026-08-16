'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const setIsWarping = useUIStore((state) => state.setIsWarping);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleStartTransition = () => {
    if (!prefersReducedMotion) {
      setIsWarping(true);
      setTimeout(() => {
        setIsWarping(false);
      }, 400);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        onAnimationStart={handleStartTransition}
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.995, filter: 'blur(4px)' }
        }
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: prefersReducedMotion ? 0.15 : 0.35,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                scale: 1.005,
                filter: 'blur(4px)',
                transition: {
                  duration: 0.2,
                  ease: [0.7, 0, 0.84, 0],
                },
              }
        }
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
