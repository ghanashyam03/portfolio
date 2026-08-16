'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useUIStore } from '@/store/useUIStore';

const STATUS_STEPS = [
  'CALIBRATING SENSORS',
  'LOCKING ORBIT',
  'ESTABLISHING UPLINK',
  'READY',
];

export function Loader() {
  const hasLoaded = useUIStore((state) => state.hasLoaded);
  const setHasLoaded = useUIStore((state) => state.setHasLoaded);

  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasLoaded) return;

    const progressObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 0.96,
              duration: 0.6,
              ease: 'power2.inOut',
              onComplete: () => {
                setHasLoaded(true);
              },
            });
          } else {
            setHasLoaded(true);
          }
        }, 200);
      },
    });

    tl.to(progressObj, {
      value: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    });

    // Cycle through status messages every ~300ms
    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < STATUS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 350);

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [hasLoaded, setHasLoaded]);

  if (hasLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060A] text-[#F5F7FF] select-none pointer-events-auto"
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        {/* Header Text */}
        <h1 className="font-space font-bold tracking-[0.25em] text-lg sm:text-xl text-center text-[#F5F7FF] mb-6 uppercase">
          ASTRA-CLASS INTERFACE
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.08)] border-hud relative overflow-hidden mb-4 rounded-[2px]">
          <div
            className="h-full bg-[#22D3EE] transition-all ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Messages */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-[#8B93B0] tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            {STATUS_STEPS[statusIndex]}
          </span>
          <span className="text-[#22D3EE] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
