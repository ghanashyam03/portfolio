'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ResearchVisual() {
  return (
    <div className="w-full max-w-2xl mx-auto h-[200px] sm:h-[240px] relative pointer-events-none select-none my-6 flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12)_0%,rgba(124,58,237,0.08)_50%,transparent_70%)] blur-xl" />

      {/* SVG Astronomical Light-Curve Vector Statement */}
      <svg
        className="w-full h-full overflow-visible relative z-10"
        viewBox="0 0 600 200"
        fill="none"
      >
        {/* Telemetry Grid Lines */}
        <line x1="40" y1="20" x2="560" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="40" y1="60" x2="560" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="40" y1="100" x2="560" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="40" y1="140" x2="560" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="40" y1="180" x2="560" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

        <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="250" y1="10" x2="250" y2="190" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="400" y1="10" x2="400" y2="190" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

        {/* Biased Population Light-Curve (Purple Line) */}
        <motion.path
          d="M 50 150 Q 150 145 200 60 T 350 160 T 550 155"
          stroke="#7C3AED"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* True Population Light-Curve (Cyan Line) */}
        <motion.path
          d="M 50 150 Q 140 135 190 30 T 340 140 T 550 145"
          stroke="#22D3EE"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />

        {/* Peak Transient Trigger Points */}
        <circle cx="190" cy="30" r="5" fill="#22D3EE" className="shadow-[0_0_12px_#22D3EE]" />
        <circle cx="200" cy="60" r="4" fill="#7C3AED" className="shadow-[0_0_12px_#7C3AED]" />

        <text x="205" y="25" fill="#22D3EE" fontSize="10" fontFamily="monospace" letterSpacing="1">
          TRUE PEAK (CALIBRATED)
        </text>
        <text x="215" y="70" fill="#7C3AED" fontSize="10" fontFamily="monospace" letterSpacing="1">
          BIASED SAMPLE (OBSERVED)
        </text>
      </svg>
    </div>
  );
}

export default ResearchVisual;
