'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Binary } from 'lucide-react';
import { ResearchVisualWrapper } from '@/components/three/ResearchVisualWrapper';

export default function ResearchPage() {
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

      {/* Restrained 3D Visual Statement */}
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
        className="hud-card p-8 sm:p-10 border-hud mb-10 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-[#22D3EE]" />
          <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase">
            PRIMARY INVESTIGATION // AEGIS
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl sm:text-3xl text-[#F5F7FF] mb-6">
          Spectroscopic Selection Bias &amp; Transient Calibration
        </h2>

        <div className="font-inter text-[#8B93B0] leading-relaxed space-y-4 text-sm sm:text-base">
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
      </motion.section>

      {/* 3. ALSO DRAWN TO BLOCK (ASTRA) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-card p-8 sm:p-10 border-hud mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-5 h-5 text-[#7C3AED]" />
          <span className="font-mono text-xs text-[#7C3AED] tracking-widest uppercase">
            SECONDARY DOMAIN // ASTRA
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl text-[#F5F7FF] mb-4">
          Orbital Mechanics &amp; Astrodynamics Optimization
        </h2>

        <p className="font-inter text-[#8B93B0] leading-relaxed text-sm sm:text-base">
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
        className="hud-card p-8 sm:p-10 border-hud mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Binary className="w-5 h-5 text-[#22D3EE]" />
          <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase">
            THROUGHLINE // EXPERIENCE TO RESEARCH
          </span>
        </div>

        <h2 className="font-space font-bold text-2xl text-[#F5F7FF] mb-4">
          Engineering Foundation
        </h2>

        <p className="font-inter text-[#8B93B0] leading-relaxed text-sm sm:text-base">
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
        className="hud-card p-8 border-hud text-center flex flex-col items-center justify-center bg-[#0B0E1A]/80"
      >
        <h3 className="font-space font-bold text-xl sm:text-2xl text-[#F5F7FF] mb-3">
          Interested in this direction? Let&apos;s talk.
        </h3>
        <p className="font-inter text-sm text-[#8B93B0] mb-6 max-w-md">
          Open to research collaborations, PhD opportunities, and computational astrophysics projects.
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#FB923C] text-[#05060A] font-space font-bold text-xs tracking-widest uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center gap-2"
        >
          Contact Me
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
