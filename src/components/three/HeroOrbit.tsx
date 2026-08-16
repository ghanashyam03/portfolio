'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroOrbit() {
  return (
    <div className="w-full max-w-[460px] aspect-square relative select-none pointer-events-none flex items-center justify-center mx-auto">
      {/* Background Ambient Glow (100% Transparent Container) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.15)_0%,rgba(124,58,237,0.1)_40%,transparent_70%)] blur-2xl" />

      {/* Main SVG Vector 3D Orbital Telemetry System */}
      <svg
        className="w-full h-full overflow-visible relative z-10"
        viewBox="-200 -200 400 400"
        fill="none"
      >
        {/* Outer Orbit Ring 1 - Solar Amber (Tilted Ellipse) */}
        <g className="origin-center">
          <motion.ellipse
            cx="0"
            cy="0"
            rx="160"
            ry="65"
            transform="rotate(-28)"
            stroke="#FB923C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
            fill="none"
          />
          {/* Orbiting Planet 1 */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="origin-center"
          >
            <circle
              cx="141"
              cy="-75"
              r="7"
              fill="#FB923C"
              className="shadow-[0_0_12px_#FB923C]"
            />
            <circle cx="141" cy="-75" r="12" stroke="#FB923C" strokeOpacity="0.5" strokeWidth="1" fill="none" />
          </motion.g>
        </g>

        {/* Orbit Ring 2 - Nebula Purple (Tilted Ellipse) */}
        <g className="origin-center">
          <ellipse
            cx="0"
            cy="0"
            rx="135"
            ry="55"
            transform="rotate(38)"
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />
          {/* Orbiting Planet 2 */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="origin-center"
          >
            <circle
              cx="-106"
              cy="83"
              r="8"
              fill="#7C3AED"
              className="shadow-[0_0_12px_#7C3AED]"
            />
          </motion.g>
        </g>

        {/* Orbit Ring 3 - Plasma Cyan (Horizontal Ellipse) */}
        <g className="origin-center">
          <ellipse
            cx="0"
            cy="0"
            rx="105"
            ry="40"
            transform="rotate(-5)"
            stroke="#22D3EE"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            fill="none"
          />
          {/* Orbiting Planet 3 */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="origin-center"
          >
            <circle
              cx="104"
              cy="-9"
              r="6"
              fill="#22D3EE"
              className="shadow-[0_0_12px_#22D3EE]"
            />
          </motion.g>
        </g>

        {/* Central Core Sphere - Wireframe Geodesic & Core */}
        <g className="origin-center">
          {/* Pulsing Core Glow */}
          <circle cx="0" cy="0" r="32" fill="#22D3EE" fillOpacity="0.15" />
          <circle cx="0" cy="0" r="24" fill="#22D3EE" fillOpacity="0.4" />
          <circle cx="0" cy="0" r="16" fill="#F5F7FF" className="shadow-[0_0_20px_#22D3EE]" />

          {/* Central Geodesic Lines */}
          <motion.circle
            cx="0"
            cy="0"
            r="38"
            stroke="#22D3EE"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.7"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="origin-center"
          />

          <motion.circle
            cx="0"
            cy="0"
            r="46"
            stroke="#7C3AED"
            strokeWidth="1"
            strokeDasharray="2 6"
            strokeOpacity="0.5"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="origin-center"
          />
        </g>
      </svg>
    </div>
  );
}

export default HeroOrbit;
