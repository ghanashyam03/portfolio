'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/', label: 'HOME' },
  { href: '/research', label: 'RESEARCH' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/contact', label: 'CONTACT' },
];

export function OrbitalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);

  const collapsedRadius = 32;
  const expandedRadius = 75;
  const currentRadius = isOpen ? expandedRadius : collapsedRadius;

  return (
    <nav
      aria-label="Orbital Navigation"
      className="fixed z-40 select-none md:top-6 md:right-8 md:bottom-auto bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0"
    >
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* SVG Orbital Rays / Connecting Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="-100 -100 200 200"
        >
          {/* Outer Orbit Track Circle */}
          <circle
            cx="0"
            cy="0"
            r={currentRadius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="2 4"
            className="transition-all duration-500 ease-out"
          />

          {/* Radial Spokes to each orbital node */}
          {NAV_ITEMS.map((_, i) => {
            const angle = (i * 2 * Math.PI) / NAV_ITEMS.length - Math.PI / 2;
            const x2 = Math.cos(angle) * currentRadius;
            const y2 = Math.sin(angle) * currentRadius;

            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={x2}
                y2={y2}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>

        {/* Central Core Node (Toggle Button) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle orbital navigation menu"
          className="relative z-10 w-8 h-8 rounded-full bg-[#0B0E1A] border-hud flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] transition-all duration-300 hover:scale-110 shadow-[0_0_12px_rgba(5,6,10,0.8)]"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isOpen
                ? 'bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]'
                : 'bg-[#FB923C] shadow-[0_0_8px_#FB923C] animate-pulse'
            }`}
          />
        </button>

        {/* Orbital Nodes */}
        {NAV_ITEMS.map((item, i) => {
          const isActive = pathname === item.href;
          const angle = (i * 2 * Math.PI) / NAV_ITEMS.length - Math.PI / 2;
          const targetX = Math.cos(angle) * currentRadius;
          const targetY = Math.sin(angle) * currentRadius;

          // Alignment helper for text placement
          const isLeft = Math.cos(angle) < -0.1;

          return (
            <motion.div
              key={item.href}
              initial={false}
              animate={{
                x: targetX,
                y: targetY,
                scale: isOpen ? 1 : 0.85,
              }}
              transition={{
                duration: 0.4,
                delay: isOpen ? i * 0.04 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute pointer-events-auto"
            >
              <div className="relative group flex items-center">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-label={item.label}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-full p-0.5"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-3.5 h-3.5 bg-[#FB923C] shadow-[0_0_12px_#FB923C] animate-pulse'
                        : 'w-2.5 h-2.5 bg-[#8B93B0] group-hover:bg-[#F5F7FF] group-hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] group-hover:scale-125'
                    }`}
                  />
                </Link>

                {/* Text Label on Open or Hover */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 + 0.1 }}
                      className={`absolute whitespace-nowrap top-1/2 -translate-y-1/2 ${
                        isLeft ? 'right-full mr-2' : 'left-full ml-2'
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-space text-[10px] tracking-[0.2em] font-semibold uppercase px-2 py-0.5 rounded-[2px] border-hud transition-colors ${
                          isActive
                            ? 'text-[#FB923C] bg-[rgba(11,14,26,0.9)] border-[#FB923C]/40'
                            : 'text-[#8B93B0] bg-[rgba(11,14,26,0.85)] hover:text-[#22D3EE] hover:border-[#22D3EE]/50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}

export default OrbitalNav;
