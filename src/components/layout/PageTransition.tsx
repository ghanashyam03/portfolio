'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

interface PageTransitionProps {
  children: React.ReactNode;
}

function WarpStreakCanvas({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();
    const duration = 650; // total streak animation cycle duration

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const cx = width / 2;
    const cy = height / 2;

    // 50 radial streak lines
    const lineCount = 50;
    const lines = Array.from({ length: lineCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      const maxLength = Math.max(width, height) * (0.4 + Math.random() * 0.5);
      const isCyan = Math.random() > 0.3;
      return { angle, speed, maxLength, isCyan };
    });

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);

      ctx.clearRect(0, 0, width, height);

      // Streak intensity curve (peak at 0.5 progress)
      const intensity =
        progress < 0.5 ? progress * 2 : (1.0 - progress) * 2;

      ctx.lineWidth = 1.5;
      lines.forEach((line) => {
        const startDist = 20 + line.speed * progress * 80;
        const currentLength = line.maxLength * intensity;

        const x1 = cx + Math.cos(line.angle) * startDist;
        const y1 = cy + Math.sin(line.angle) * startDist;
        const x2 = cx + Math.cos(line.angle) * (startDist + currentLength);
        const y2 = cy + Math.sin(line.angle) * (startDist + currentLength);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        const color = line.isCyan ? '34, 211, 238' : '245, 247, 255';
        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${color}, ${0.8 * intensity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      if (progress < 1.0) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none w-full h-full"
    />
  );
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const setIsWarping = useUIStore((state) => state.setIsWarping);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
      setIsTransitioning(true);

      setTimeout(() => {
        setIsWarping(false);
        setIsTransitioning(false);
      }, 650);
    }
  };

  return (
    <>
      <WarpStreakCanvas isActive={isTransitioning && !prefersReducedMotion} />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Reset warp after exit completes
        }}
      >
        <motion.div
          key={pathname}
          onAnimationStart={handleStartTransition}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.97 }
          }
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: prefersReducedMotion ? 0.2 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.05,
                  transition: {
                    duration: 0.25,
                    ease: [0.7, 0, 0.84, 0],
                  },
                }
          }
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default PageTransition;
