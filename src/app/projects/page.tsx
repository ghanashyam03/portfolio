'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Terminal } from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: 'astra',
    name: 'ASTRA',
    tagline:
      'Physics-constrained orbital trajectory optimization & mission analysis platform',
    tech: ['Python', 'PyTorch', 'Optuna', 'NumPy', 'SPICE'],
    bullets: [
      'Combines Bayesian optimization (Optuna TPE / NSGA-II), neural surrogate models with uncertainty-aware active learning, and Monte Carlo Tree Search to autonomously plan multi-stage spacecraft trajectories, cutting expensive computations by 40-70%.',
      'Hardened astrodynamics core: an Izzo Lambert solver, RK4(5) numerical propagation, a barycenter-safe SPICE ephemeris engine, and a CR3BP propagator for high-fidelity three-body flyby and Lagrange-point analysis.',
      'Validated end-to-end against real historical missions — Cassini, Mars Odyssey, Voyager — across a 500+ trial optimization search space.',
    ],
    github: 'https://github.com/ghanashyam03/ASTRA',
  },
  {
    id: 'aegis',
    name: 'AEGIS',
    tagline:
      'Research framework studying whether early transient classification stays calibrated under spectroscopic selection bias',
    tech: ['Python', 'Pydantic v2', 'HistGradientBoostingClassifier', 'IPW'],
    bullets: [
      'Alert Evaluation for Generalizable, Informed Spectroscopy — investigates whether follow-up triggers combining calibrated class confidence with novelty outperform a fixed confidence threshold on astronomical transient alert streams.',
      'Built a fully re-runnable ingestion pipeline (raw -> schema-validated -> TRUE population -> BIASED population) with SHA-256-checked manifests at every stage, plus an alert-stream truncation harness that guarantees no future-information leakage.',
      'Quantified a 2.11-2.17x Brier score degradation from selection bias and implemented IPW Platt selection-aware recalibration, showing post-hoc recalibration alone cannot fully close the gap — a live, open research problem aimed at strengthening a PhD application in computational astrophysics.',
    ],
    github: 'https://github.com/ghanashyam03/AEGIS',
  },
  {
    id: 'orion',
    name: 'ORION',
    tagline: 'Production ML system for satellite collision risk prediction',
    tech: ['Python', 'LightGBM', 'Optuna', 'FastAPI'],
    bullets: [
      'Screens ~200 million object pairs per run in Low Earth Orbit and trains a calibrated LightGBM classifier achieving 0.93 ROC-AUC on a strict future-time validation split.',
      'Deployed via a real-time FastAPI inference service with automated statistical drift monitoring to flag model degradation in production.',
    ],
    github: 'https://github.com/ghanashyam03',
  },
  {
    id: 'veriface',
    name: 'VeriFace.AI',
    tagline: 'AI-powered missing person detection via identity matching',
    tech: ['Python', 'PyTorch', 'CNNs', 'Vision Transformers'],
    bullets: [
      'End-to-end deep learning pipeline combining CNNs and Vision Transformers for fine-grained identity matching across image and video, reaching 91% verification accuracy on a held-out test set.',
      'Integrated deepfake-detection logic to flag AI-generated identity fabrications in surveillance-assisted search.',
    ],
    github: 'https://github.com/ghanashyam03',
  },
  {
    id: 'nexroute',
    name: 'NexRoute',
    tagline:
      'Simulation-in-the-loop urban traffic optimization and route management',
    tech: ['Python', 'Flask', 'SUMO', 'NetworkX', 'Particle Swarm Optimization'],
    bullets: [
      'Interfaces with the SUMO traffic simulator via TraCI to dynamically adjust signal timing, apply variable speed limits, and reroute vehicles using PSO-based optimization to reduce congestion in real time.',
      'Predicts near-term congestion and proactively reroutes vehicles before bottlenecks form, with simulated driver-assistance alerts for upcoming turns and speed suggestions.',
    ],
    github: 'https://github.com/ghanashyam03/NexRoute',
  },
  {
    id: 'forwhile',
    name: 'ForWhile',
    tagline:
      'An educational programming language that teaches OOP through building a character',
    tech: ['Python'],
    bullets: [
      'A simple language designed for kids: each body part of a character maps to a class, teaching syntax and object-oriented concepts through a fun, visual metaphor instead of abstract examples.',
    ],
    github: 'https://github.com/ghanashyam03/ForWhile',
  },
];

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-[rgba(255,255,255,0.12)] pb-8"
      >
        <span className="font-mono text-xs text-[#22D3EE] tracking-[0.25em] uppercase block mb-3 font-semibold">
          SYSTEM://PORTFOLIO_INDEX
        </span>
        <h1 className="font-space font-bold text-4xl sm:text-6xl text-[#F5F7FF] tracking-tight mb-4">
          Projects
        </h1>
        <p className="font-inter text-lg text-[#8B93B0] max-w-2xl">
          Selected work across ML engineering, astrodynamics, and applied research.
        </p>
      </motion.div>

      {/* Project Cards List */}
      <div className="space-y-12">
        {PROJECTS.map((proj, idx) => (
          <motion.div
            key={proj.id}
            id={proj.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.05 * idx }}
            className="hud-card p-8 sm:p-10 border-hud relative overflow-hidden group hover:border-[#22D3EE]/40 transition-colors"
          >
            {/* Background Index watermark */}
            <div className="absolute top-4 right-6 font-mono text-4xl sm:text-6xl font-bold text-[#F5F7FF]/5 select-none pointer-events-none">
              0{idx + 1}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="w-4 h-4 text-[#22D3EE]" />
                  <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase">
                    REPOSITORY // 0{idx + 1}
                  </span>
                </div>
                <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF] mb-2">
                  {proj.name}
                </h2>
                <p className="font-inter font-medium text-sm sm:text-base text-[#FB923C] max-w-3xl">
                  {proj.tagline}
                </p>
              </div>

              {/* GitHub Link Button */}
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B0E1A] hover:bg-[#22D3EE]/10 text-[#F5F7FF] hover:text-[#22D3EE] font-space text-xs tracking-wider uppercase font-semibold border-hud rounded-[2px] transition-all duration-300 self-start shrink-0"
              >
                <GithubIcon className="w-4 h-4 text-[#22D3EE]" />
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 bg-[#05060A]/80 text-[#8B93B0] border border-[rgba(255,255,255,0.08)] rounded-[2px] flex items-center gap-1.5"
                >
                  <Code2 className="w-3 h-3 text-[#7C3AED]" />
                  {t}
                </span>
              ))}
            </div>

            {/* Detail Bullet List */}
            <ul className="space-y-3 font-inter text-sm sm:text-base text-[#8B93B0] leading-relaxed border-t border-[rgba(255,255,255,0.08)] pt-6">
              {proj.bullets.map((bullet, bIdx) => (
                <motion.li
                  key={bIdx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + bIdx * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
