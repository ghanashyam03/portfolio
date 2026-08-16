'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Binary, Sliders, RefreshCw, BarChart2 } from 'lucide-react';
import { ResearchVisualWrapper } from '@/components/three/ResearchVisualWrapper';

export default function ResearchPage() {
  const magId = useId();
  const expId = useId();
  const [magThreshold, setMagThreshold] = useState(20.5);
  const [expTime, setExpTime] = useState(1200);
  const [isIPWApplied, setIsIPWApplied] = useState(false);

  // Dynamic Brier score factor calculation based on user selection bias inputs
  const rawDegradation = (1.5 + (24.0 - magThreshold) * 0.15 + (3600 - expTime) * 0.0003).toFixed(2);
  const effectiveDegradation = isIPWApplied
    ? (parseFloat(rawDegradation) * 0.65).toFixed(2)
    : rawDegradation;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-[#F5F7FF]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 border-b border-[rgba(255,255,255,0.12)] pb-8"
      >
        <span className="font-mono text-xs text-[#22D3EE] tracking-[0.25em] uppercase block mb-3 font-semibold">
          STATEMENT://RESEARCH_DIRECTION
        </span>
        <h1 className="font-space font-bold text-4xl sm:text-6xl text-[#F5F7FF] tracking-tight mb-4">
          Research interests
        </h1>
        <p className="font-inter text-lg sm:text-xl text-[#FB923C] font-medium">
          Where machine learning meets physical constraint.
        </p>
      </motion.div>

      {/* Astronomical Light Curve Visual Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12"
      >
        <ResearchVisualWrapper />
      </motion.div>

      {/* 2. CURRENT FOCUS BLOCK (AEGIS) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-panel p-8 sm:p-10 border-hud mb-10 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-[#22D3EE]" />
          <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase font-semibold">
            PRIMARY INVESTIGATION // AEGIS
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl sm:text-3xl text-[#F5F7FF] mb-6">
          Spectroscopic Selection Bias &amp; Transient Calibration
        </h2>

        <div className="font-inter text-[#94A3B8] leading-relaxed space-y-4 text-sm sm:text-base mb-8">
          <p>
            Astronomical transient alert streams (such as supernovae detections)
            are typically labeled for machine learning training based on which
            objects happened to receive spectroscopic confirmation. However, this
            confirmation process is inherently biased — brighter, less crowded,
            and easily accessible targets are far more likely to be selected for
            expensive telescope follow-up.
          </p>
          <p>
            A classifier trained on such a spectroscopically confirmed sample may
            appear well-calibrated on paper standard benchmarks while remaining
            significantly miscalibrated on the true, unobserved population it
            encounters in live time-domain survey streams. This calibration breakdown
            is critical when models trigger automated follow-up requests in next-generation
            astronomical surveys.
          </p>
          <p className="text-[#F5F7FF]">
            Through my research framework <strong className="text-[#22D3EE]">AEGIS</strong>,
            I quantified a <span className="text-[#FB923C] font-semibold">2.11–2.17x Brier score degradation</span> between
            the confirmed-only population and the true underlying population. Furthermore,
            I demonstrated that standard Inverse Propensity Weighting (IPW) recalibration
            only partially closes this gap — proving that selection-induced miscalibration
            is not merely a population reweighting artifact, but a deeper structural problem.
          </p>
          <p>
            This is an active, ongoing investigation that serves as the core foundation
            of my preparation for a PhD program in computational astrophysics.
          </p>
        </div>

        {/* INTERACTIVE AEGIS SELECTION BIAS SIMULATOR */}
        <div className="hud-panel p-6 border border-[#22D3EE]/30 bg-[#030407]/90 rounded-[2px] space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE]">
              <Sliders className="w-4 h-4 text-[#22D3EE]" />
              <span className="font-semibold uppercase tracking-wider">
                AEGIS LIVE SELECTION BIAS SIMULATOR
              </span>
            </div>
            <span className="font-mono text-xs text-[#FB923C] bg-[#FB923C]/10 px-2.5 py-1 border border-[#FB923C]/30 rounded-[2px]">
              BRIER DEGRADATION: {effectiveDegradation}x
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Apparent Magnitude Cutoff */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                <label htmlFor={magId}>MAGNITUDE THRESHOLD (r-band):</label>
                <span className="text-[#22D3EE] font-bold">{magThreshold} mag</span>
              </div>
              <input
                id={magId}
                type="range"
                min="18.0"
                max="24.0"
                step="0.1"
                value={magThreshold}
                onChange={(e) => setMagThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
              />
            </div>

            {/* Slider 2: Spectroscopic Exposure Time */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                <label htmlFor={expId}>EXPOSURE TIME (sec):</label>
                <span className="text-[#22D3EE] font-bold">{expTime}s</span>
              </div>
              <input
                id={expId}
                type="range"
                min="300"
                max="3600"
                step="100"
                value={expTime}
                onChange={(e) => setExpTime(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
              />
            </div>
          </div>

          {/* Interactive Toggle for IPW Recalibration */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2 font-inter text-xs text-[#94A3B8]">
              <BarChart2 className="w-4 h-4 text-[#7C3AED]" />
              <span>
                {isIPWApplied
                  ? 'IPW Platt Recalibration active (Partial gap closure observed)'
                  : 'Raw Selection Bias (Uncalibrated alert stream)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsIPWApplied(!isIPWApplied)}
              className={`px-4 py-2 text-xs font-space font-semibold uppercase tracking-wider rounded-[2px] border transition-all duration-300 flex items-center gap-2 ${
                isIPWApplied
                  ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]'
                  : 'bg-[#070913] border-hud text-[#94A3B8] hover:text-[#F5F7FF]'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isIPWApplied ? 'animate-spin' : ''}`} />
              {isIPWApplied ? 'IPW Applied' : 'Apply IPW Recalibration'}
            </button>
          </div>
        </div>
      </motion.section>

      {/* 3. ALSO DRAWN TO BLOCK (ASTRA) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-panel p-8 sm:p-10 border-hud mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-5 h-5 text-[#7C3AED]" />
          <span className="font-mono text-xs text-[#7C3AED] tracking-widest uppercase font-semibold">
            SECONDARY DOMAIN // ASTRA
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl text-[#F5F7FF] mb-4">
          Orbital Mechanics &amp; Astrodynamics Optimization
        </h2>

        <p className="font-inter text-[#94A3B8] leading-relaxed text-sm sm:text-base">
          I am equally drawn to orbital mechanics and trajectory optimization, as
          explored in my project <strong className="text-[#F5F7FF]">ASTRA</strong>. This work stems
          from the same underlying motivation: embedding machine learning techniques — such as
          Bayesian optimization, neural surrogate models, and Monte Carlo Tree Search — inside
          systems where exact physical laws, rather than purely empirical data, dictate the ground
          truth and governing boundaries.
        </p>
      </motion.section>

      {/* 4. BACKGROUND BLOCK */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-panel p-8 sm:p-10 border-hud mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Binary className="w-5 h-5 text-[#22D3EE]" />
          <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase font-semibold">
            THROUGHLINE // EXPERIENCE TO RESEARCH
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl text-[#F5F7FF] mb-4">
          Engineering Foundation
        </h2>

        <p className="font-inter text-[#94A3B8] leading-relaxed text-sm sm:text-base">
          The throughline of my work connects representing my university at the{' '}
          <strong className="text-[#F5F7FF]">European Rover Challenge 2023</strong> (where our team
          ranked 11th globally out of 85+ international university teams), through building
          production agentic AI platforms at <strong className="text-[#F5F7FF]">KIREAP</strong>, to
          this computational astrophysics research direction — grounding machine learning engineering
          in rigorous scientific domains.
        </p>
      </motion.section>

      {/* 5. CLOSING CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hud-panel p-8 border-hud text-center flex flex-col items-center justify-center bg-[#070913]/90"
      >
        <h3 className="font-space font-bold text-xl sm:text-2xl text-[#F5F7FF] mb-3">
          Interested in this direction? Let&apos;s talk.
        </h3>
        <p className="font-inter text-sm text-[#94A3B8] mb-6 max-w-md">
          Open to research collaborations, PhD opportunities, and computational astrophysics projects.
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#FB923C] text-[#030407] font-space font-bold text-xs tracking-widest uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center gap-2"
        >
          Contact Me
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
