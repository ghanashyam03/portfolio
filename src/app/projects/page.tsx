'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Code2, Terminal, Play, Cpu, ChevronRight } from 'lucide-react';
import { playHudClick } from '@/utils/audio';

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
    hasSimulator: true,
    simulatorType: 'ASTRA',
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
    hasSimulator: false,
    simulatorType: null,
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
    hasSimulator: true,
    simulatorType: 'ORION',
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
    hasSimulator: false,
    simulatorType: null,
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
    hasSimulator: false,
    simulatorType: null,
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
    hasSimulator: false,
    simulatorType: null,
  },
];

export default function ProjectsPage() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [astraTargetAu, setAstraTargetAu] = useState(1.8);
  const [orionDistMeters, setOrionDistMeters] = useState(450);

  const toggleSimulator = (id: string) => {
    playHudClick();
    setActiveSim((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-[#F5F7FF]">
      {/* Page Header - Static & 100% Visible */}
      <div className="mb-16 border-b border-[rgba(255,255,255,0.08)] pb-8">
        <span className="font-mono text-xs text-[#22D3EE] tracking-[0.25em] uppercase block mb-3 font-semibold">
          SYSTEM://PROJECT_REPOSITORIES
        </span>
        <h1 className="font-space font-bold text-4xl sm:text-6xl text-[#F5F7FF] tracking-tight mb-4">
          Projects
        </h1>
        <p className="font-inter text-lg text-[#94A3B8] max-w-2xl">
          Selected work across ML engineering, astrodynamics, and applied research.
        </p>
      </div>

      {/* Project Cards List */}
      <div className="space-y-12">
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            id={proj.id}
            className="hud-panel p-8 sm:p-10 border-hud relative overflow-hidden group hover:border-[#22D3EE]/40 transition-colors"
          >
            {/* Background Index watermark */}
            <div className="absolute top-4 right-6 font-mono text-5xl sm:text-7xl font-bold text-[#F5F7FF]/5 select-none pointer-events-none">
              0{idx + 1}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Terminal className="w-4 h-4 text-[#22D3EE]" />
                  <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase font-semibold">
                    REPOSITORY // 0{idx + 1}
                  </span>
                </div>
                <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF] mb-2.5">
                  {proj.name}
                </h2>
                <p className="font-inter font-medium text-sm sm:text-base text-[#FB923C] max-w-3xl">
                  {proj.tagline}
                </p>
              </div>

              {/* Action Buttons: GitHub & Interactive Simulator */}
              <div className="flex flex-wrap items-center gap-3 self-start shrink-0">
                {proj.hasSimulator && (
                  <button
                    type="button"
                    onClick={() => toggleSimulator(proj.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/40 text-[#7C3AED] hover:text-[#F5F7FF] font-space text-xs tracking-wider uppercase font-semibold border border-[#7C3AED]/40 rounded-[2px] transition-all duration-300"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {activeSim === proj.id ? 'Close Demo' : 'Run Interactive Demo'}
                  </button>
                )}

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playHudClick}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#030407] hover:bg-[#22D3EE]/10 text-[#F5F7FF] hover:text-[#22D3EE] font-space text-xs tracking-wider uppercase font-semibold border-hud rounded-[2px] transition-all duration-300"
                >
                  <GithubIcon className="w-4 h-4 text-[#22D3EE]" />
                  GitHub
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* INTERACTIVE DEMO SIMULATOR DRAWER */}
            {activeSim === proj.id && proj.simulatorType === 'ASTRA' && (
              <div className="mb-8 p-6 bg-[#030407] border border-[#22D3EE]/40 rounded-[2px] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE]">
                  <Cpu className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">
                    ASTRA LAMBERT TRAJECTORY DEMO SOLVER
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                    <span>TARGET APHELION DISTANCE (AU):</span>
                    <span className="text-[#22D3EE] font-bold">{astraTargetAu} AU</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.2"
                    step="0.1"
                    value={astraTargetAu}
                    onChange={(e) => setAstraTargetAu(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
                  />
                </div>
                <div className="p-3 bg-[#070913] font-mono text-xs text-[#F5F7FF] flex justify-between items-center border border-hud">
                  <span>ESTIMATED TRAJECTORY COMPUTE SAVINGS:</span>
                  <span className="text-[#FB923C] font-bold">
                    {(38 + (astraTargetAu / 5.2) * 32).toFixed(1)}% COMPUTATION REDUCTION
                  </span>
                </div>
              </div>
            )}

            {activeSim === proj.id && proj.simulatorType === 'ORION' && (
              <div className="mb-8 p-6 bg-[#030407] border border-[#7C3AED]/40 rounded-[2px] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#7C3AED]">
                  <Cpu className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">
                    ORION CONJUNCTION COLLISION PROBABILITY DEMO
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                    <span>CONJUNCTION MISS DISTANCE (meters):</span>
                    <span className="text-[#7C3AED] font-bold">{orionDistMeters}m</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="2000"
                    step="20"
                    value={orionDistMeters}
                    onChange={(e) => setOrionDistMeters(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                  />
                </div>
                <div className="p-3 bg-[#070913] font-mono text-xs text-[#F5F7FF] flex justify-between items-center border border-hud">
                  <span>PREDICTED COLLISION RISK LEVEL:</span>
                  <span className="text-[#22D3EE] font-bold">
                    {orionDistMeters < 150
                      ? 'HIGH RISK (MANEUVER TRIGGERED)'
                      : orionDistMeters < 600
                      ? 'MODERATE MONITORING'
                      : 'NOMINAL PASS'}
                  </span>
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1 bg-[#030407]/90 text-[#94A3B8] border border-[rgba(255,255,255,0.08)] rounded-[2px] flex items-center gap-1.5"
                >
                  <Code2 className="w-3 h-3 text-[#7C3AED]" />
                  {t}
                </span>
              ))}
            </div>

            {/* Detail Bullet List */}
            <ul className="space-y-3.5 font-inter text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-[rgba(255,255,255,0.08)] pt-6">
              {proj.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-[#22D3EE] shrink-0 mt-1" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
