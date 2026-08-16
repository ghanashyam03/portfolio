'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Clock } from 'lucide-react';

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
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      aria-label="Mission Control Navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 select-none max-w-7xl w-[calc(100%-2rem)] md:w-auto"
    >
      {/* Desktop Navigation Dock */}
      <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-[2px] bg-[#070913]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
        {/* System Status & UTC Clock Telemetry Pill */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 border-r border-[rgba(255,255,255,0.1)] text-[10px] font-mono text-[#22D3EE]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse shadow-[0_0_8px_#22D3EE]" />
            <span className="tracking-widest uppercase font-semibold">SYS.ONLINE</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 text-[#8B93B0]">
            <Clock className="w-3 h-3 text-[#22D3EE]" />
            <span>{timeString || '00:00:00 UTC'}</span>
          </span>
        </div>

        {/* Route Navigation Items */}
        <div className="flex items-center gap-1 px-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-[2px] font-space text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                  isActive
                    ? 'text-[#FB923C]'
                    : 'text-[#8B93B0] hover:text-[#F5F7FF] hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#FB923C]/10 border border-[#FB923C]/40 rounded-[2px]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Header Bar & Drawer Toggle */}
      <div className="md:hidden flex items-center justify-between p-3 rounded-[2px] bg-[#070913]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.12)] shadow-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE]">
          <Terminal className="w-4 h-4 text-[#22D3EE]" />
          <span className="font-space font-bold tracking-widest text-[#F5F7FF]">
            G.V.NARAYAN
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-[2px] border-hud text-[#F5F7FF] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-[2px] bg-[#070913]/95 backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] space-y-2 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-[2px] font-space text-xs tracking-widest uppercase font-semibold border-hud transition-colors ${
                    isActive
                      ? 'text-[#FB923C] bg-[#FB923C]/10 border-[#FB923C]/40'
                      : 'text-[#8B93B0] hover:text-[#22D3EE] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default OrbitalNav;
