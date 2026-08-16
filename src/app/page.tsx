'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { HeroOrbitWrapper } from '@/components/three/HeroOrbitWrapper';
import { TiltCard } from '@/components/ui/TiltCard';

const FEATURED_PROJECTS = [
  {
    name: 'ASTRA',
    tagline:
      'Physics-constrained orbital trajectory optimization & mission analysis platform',
    href: '/projects#astra',
  },
  {
    name: 'AEGIS',
    tagline:
      'Research framework studying whether early transient classification stays calibrated under spectroscopic selection bias',
    href: '/projects#aegis',
  },
  {
    name: 'ORION',
    tagline:
      'Production ML system for satellite collision risk prediction',
    href: '/projects#orion',
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between pt-24 pb-12">
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Eyebrow */}
            <span className="font-mono text-xs sm:text-sm text-[#22D3EE] tracking-[0.25em] uppercase mb-4 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              AI/ML ENGINEER · COMPUTATIONAL ASTROPHYSICS
            </span>

            {/* Display H1 */}
            <h1 className="font-space font-bold text-[#F5F7FF] tracking-tight leading-[1.05] text-[clamp(2.75rem,7vw,5.5rem)] mb-6">
              Ghanashyam V Narayan
            </h1>

            {/* Subhead */}
            <p className="font-inter text-[#8B93B0] text-base sm:text-lg leading-relaxed max-w-[640px] mb-8">
              I build agentic AI systems and physics-constrained ML pipelines —
              from production backends to spacecraft trajectory optimization.
              Currently exploring the intersection of machine learning and
              astrophysics through independent research.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-[#FB923C] text-[#05060A] font-space font-bold text-sm tracking-wider uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-transparent text-[#F5F7FF] font-space font-semibold text-sm tracking-wider uppercase rounded-[2px] border-hud hover:border-[#22D3EE] hover:text-[#22D3EE] hover:bg-[#0B0E1A]/60 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Hero Right 3D Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center items-center"
          >
            <HeroOrbitWrapper />
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-2 text-[#8B93B0] select-none"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            SCROLL
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#22D3EE]" />
        </motion.div>
      </section>

      {/* SECTION 2: CURRENTLY STRIP */}
      <section className="w-full border-y border-[rgba(255,255,255,0.12)] bg-[#0B0E1A]/40 backdrop-blur-md py-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hud-card p-6 border-hud"
          >
            <span className="font-mono text-[11px] text-[#22D3EE] tracking-widest uppercase block mb-1">
              ROLE // PRESENT
            </span>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              AI/ML Engineer @ KIREAP
            </h3>
            <p className="font-inter text-sm text-[#8B93B0]">
              Building autonomous agentic development platforms since April 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hud-card p-6 border-hud"
          >
            <span className="font-mono text-[11px] text-[#22D3EE] tracking-widest uppercase block mb-1">
              ACADEMICS
            </span>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              B.Tech Information Technology
            </h3>
            <p className="font-inter text-sm text-[#8B93B0]">
              CUSAT · CGPA 9.11/10
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hud-card p-6 border-hud"
          >
            <span className="font-mono text-[11px] text-[#22D3EE] tracking-widest uppercase block mb-1">
              COMPETITION
            </span>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              European Rover Challenge 2023
            </h3>
            <p className="font-inter text-sm text-[#8B93B0]">
              Ranked 11th globally out of 85+ international university teams
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WHY ASTROPHYSICS */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-card p-8 sm:p-12 border-hud relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-space font-bold text-8xl text-[#7C3AED]">
            PHYSICS
          </div>

          <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase mb-2 block">
            MOTIVATION // PERSPECTIVE
          </span>

          <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF] mb-6">
            Why astrophysics
          </h2>

          <div className="font-inter text-[#8B93B0] leading-relaxed space-y-4 max-w-3xl text-sm sm:text-base">
            <p>
              My core engineering background is in applied ML engineering —
              developing production agentic systems, scalable backends, and
              computer vision pipelines. Over time, I found myself drawn to
              problems where physical laws constrain and discipline model
              behavior rather than relying purely on data density.
            </p>
            <p>
              This realization led me directly to orbital mechanics and
              trajectory optimization with ASTRA, and to statistical bias
              analysis in astronomical transient survey data with AEGIS. Exploring
              these domains clarified my long-term direction.
            </p>
            <p>
              I am now applying this combined rigor — production-grade ML
              engineering coupled with physics-constrained algorithms — toward a
              PhD in computational astrophysics.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-space font-semibold text-sm text-[#22D3EE] hover:text-[#FB923C] transition-colors"
            >
              Read the research angle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS PREVIEW */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block mb-2">
              FEATURED WORK
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF]">
              Selected Systems
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 font-space text-sm font-semibold text-[#8B93B0] hover:text-[#22D3EE] transition-colors flex items-center gap-2"
          >
            View all 6 projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard className="p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#7C3AED] tracking-widest uppercase block mb-2">
                    PROJECT // 0{idx + 1}
                  </span>
                  <h3 className="font-space font-bold text-xl text-[#F5F7FF] mb-3">
                    {proj.name}
                  </h3>
                  <p className="font-inter text-sm text-[#8B93B0] leading-relaxed mb-6">
                    {proj.tagline}
                  </p>
                </div>
                <Link
                  href={proj.href}
                  className="font-space font-semibold text-xs text-[#22D3EE] hover:text-[#FB923C] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  View project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
