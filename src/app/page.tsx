'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Terminal, Activity, Sliders, Cpu, Play, CheckCircle2 } from 'lucide-react';
import { HeroOrbitWrapper } from '@/components/three/HeroOrbitWrapper';
import { TiltCard } from '@/components/ui/TiltCard';
import { playHudClick } from '@/utils/audio';

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
  const apogeeId = useId();
  const perigeeId = useId();
  const [consoleMode, setConsoleMode] = useState<'ORBIT' | 'TERMINAL' | 'MATRIX'>('ORBIT');

  // Interactive Orbit Solver States
  const [apogee, setApogee] = useState(12000);
  const [perigee, setPerigee] = useState(400);

  // Dynamic Delta-V calculation
  const calculatedDeltaV = (0.85 + (apogee / 10000) * 0.42 - (perigee / 1000) * 0.08).toFixed(2);

  // Interactive Terminal Logs State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYS.INIT // Ghanashyam V Narayan Telemetry Interface',
    'ASTRA.CORE // Izzo Lambert Solver loaded (SPICE ephemeris active)',
    'AEGIS.STREAM // Alert stream truncation harness ready',
    'Type or click a command preset below to execute...',
  ]);
  const [commandInput, setCommandInput] = useState('');

  const handleRunCommand = (cmd: string) => {
    playHudClick();
    const cleanCmd = cmd.trim().toLowerCase();
    let response = '';

    if (cleanCmd === 'run astra' || cleanCmd === 'astra') {
      response = 'EXECUTING ASTRA // Trajectory optimization converged in 48 trials. Δv savings: 34.2%';
    } else if (cleanCmd === 'run aegis' || cleanCmd === 'aegis') {
      response = 'EXECUTING AEGIS // Alert stream ingested. Uncalibrated Brier degradation: 2.14x';
    } else if (cleanCmd === 'status') {
      response = 'SYS.STATUS // All systems operational. Agentic pipeline active @ KIREAP.';
    } else if (cleanCmd === 'clear') {
      setTerminalLogs(['SYS.INIT // Terminal cleared. Ready.']);
      setCommandInput('');
      return;
    } else {
      response = `UNKNOWN COMMAND "${cmd}". Try: "astra", "aegis", "status", "clear"`;
    }

    setTerminalLogs((prev) => [...prev, `> ${cmd}`, response]);
    setCommandInput('');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between pt-32 pb-12">
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow Telemetry Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[2px] bg-[#070913]/90 border border-[#22D3EE]/30 text-[#22D3EE] font-mono text-xs tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              AI/ML ENGINEER · COMPUTATIONAL ASTROPHYSICS
            </div>

            {/* Display H1 - Static & 100% Visible */}
            <h1 className="font-space font-bold tracking-tight leading-[1.05] text-[clamp(2.5rem,5.5vw,5rem)] mb-6 text-[#F5F7FF]">
              Ghanashyam V{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#FB923C] bg-clip-text text-transparent">
                Narayan
              </span>
            </h1>

            {/* Subhead */}
            <p className="font-inter text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-[600px] mb-8 bg-[#020305]/60 backdrop-blur-sm p-3 border border-[rgba(255,255,255,0.08)] rounded-[2px]">
              I build agentic AI systems and physics-constrained ML pipelines —
              from production backends to spacecraft trajectory optimization.
              Currently exploring the intersection of machine learning and
              astrophysics through independent research.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                onClick={playHudClick}
                className="px-6 py-3.5 bg-[#FB923C] text-[#020305] font-space font-bold text-xs tracking-widest uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_25px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                onClick={playHudClick}
                className="px-6 py-3.5 bg-[#070913]/80 text-[#F5F7FF] font-space font-semibold text-xs tracking-widest uppercase rounded-[2px] border border-[rgba(255,255,255,0.12)] hover:border-[#22D3EE] hover:text-[#22D3EE] hover:bg-[#070913] transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Hero Right 3D Orbit Centerpiece */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative overflow-visible">
            <HeroOrbitWrapper />
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="flex flex-col items-center justify-center gap-2 text-[#94A3B8] select-none">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            SCROLL DOWN FOR INTERACTIVE TELEMETRY
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#22D3EE]" />
        </div>
      </section>

      {/* SECTION 1.5: ON-THE-FACE INTERACTIVE TELEMETRY CONSOLE */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="hud-panel p-6 sm:p-8 border-hud bg-[#070913]/95 shadow-2xl relative overflow-hidden">
          {/* Console Header Mode Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6 mb-6">
            <div>
              <span className="font-mono text-[10px] text-[#22D3EE] tracking-widest uppercase block mb-1">
                INTERACTIVE CONSOLE // LIVE WORKSPACE
              </span>
              <h2 className="font-space font-bold text-xl sm:text-2xl text-[#F5F7FF]">
                Mission Control Telemetry Terminal
              </h2>
            </div>

            {/* Mode Toggle Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playHudClick();
                  setConsoleMode('ORBIT');
                }}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-semibold border transition-all flex items-center gap-1.5 ${
                  consoleMode === 'ORBIT'
                    ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]'
                    : 'bg-[#030407] border-hud text-[#94A3B8] hover:text-[#F5F7FF]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                ORBIT SOLVER
              </button>

              <button
                type="button"
                onClick={() => {
                  playHudClick();
                  setConsoleMode('TERMINAL');
                }}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-semibold border transition-all flex items-center gap-1.5 ${
                  consoleMode === 'TERMINAL'
                    ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#7C3AED]'
                    : 'bg-[#030407] border-hud text-[#94A3B8] hover:text-[#F5F7FF]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                LIVE CONSOLE
              </button>

              <button
                type="button"
                onClick={() => {
                  playHudClick();
                  setConsoleMode('MATRIX');
                }}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-semibold border transition-all flex items-center gap-1.5 ${
                  consoleMode === 'MATRIX'
                    ? 'bg-[#FB923C]/20 border-[#FB923C] text-[#FB923C]'
                    : 'bg-[#030407] border-hud text-[#94A3B8] hover:text-[#F5F7FF]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                MISSION MATRIX
              </button>
            </div>
          </div>

          {/* MODE 1: INTERACTIVE ORBIT SOLVER */}
          {consoleMode === 'ORBIT' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                    <label htmlFor={apogeeId}>APOGEE ALTITUDE (km):</label>
                    <span className="text-[#22D3EE] font-bold">{apogee} km</span>
                  </div>
                  <input
                    id={apogeeId}
                    type="range"
                    min="1000"
                    max="36000"
                    step="500"
                    value={apogee}
                    onChange={(e) => setApogee(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#030407] rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8] mb-2">
                    <label htmlFor={perigeeId}>PERIGEE ALTITUDE (km):</label>
                    <span className="text-[#22D3EE] font-bold">{perigee} km</span>
                  </div>
                  <input
                    id={perigeeId}
                    type="range"
                    min="180"
                    max="2000"
                    step="50"
                    value={perigee}
                    onChange={(e) => setPerigee(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#030407] rounded-lg appearance-none cursor-pointer accent-[#22D3EE]"
                  />
                </div>
              </div>

              {/* Calculated Results Box */}
              <div className="p-4 bg-[#030407] border border-[#22D3EE]/30 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#22D3EE] animate-pulse" />
                  <div>
                    <span className="font-mono text-xs text-[#94A3B8] block">
                      OPTIMIZED LAMBERT MANEUVER REQUIREMENT
                    </span>
                    <span className="font-mono text-lg text-[#F5F7FF] font-bold">
                      REQUIRED Δv: <span className="text-[#22D3EE]">{calculatedDeltaV} km/s</span>
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#FB923C] bg-[#FB923C]/10 px-3 py-1 border border-[#FB923C]/30 rounded-[2px]">
                  STATUS: MANEUVER FEASIBLE
                </span>
              </div>
            </div>
          )}

          {/* MODE 2: LIVE INTERACTIVE TERMINAL */}
          {consoleMode === 'TERMINAL' && (
            <div className="space-y-4">
              <div className="bg-[#030407] p-4 rounded-[2px] border border-hud font-mono text-xs text-[#22D3EE] space-y-2 h-48 overflow-y-auto">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>

              {/* Input Command Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (commandInput) handleRunCommand(commandInput);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#22D3EE]">
                    &gt;
                  </span>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Type command (e.g. 'astra', 'aegis', 'status')..."
                    className="w-full bg-[#030407] border-hud text-[#F5F7FF] font-mono text-xs pl-8 pr-4 py-2.5 rounded-[2px] focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#7C3AED] text-white font-mono text-xs uppercase rounded-[2px] hover:bg-[#7C3AED]/80 transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3" />
                  RUN
                </button>
              </form>

              {/* Preset Command Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['astra', 'aegis', 'status', 'clear'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleRunCommand(preset)}
                    className="font-mono text-[11px] px-2.5 py-1 bg-[#030407] text-[#94A3B8] hover:text-[#22D3EE] border border-hud rounded-[2px]"
                  >
                    &gt; {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODE 3: MISSION MATRIX */}
          {consoleMode === 'MATRIX' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#030407] border border-hud rounded-[2px]">
                <span className="font-mono text-xs text-[#94A3B8] uppercase block mb-1">
                  TRAJECTORY SEARCH SPACE
                </span>
                <span className="font-space font-bold text-2xl text-[#22D3EE] block mb-1">
                  500+ TRIALS
                </span>
                <p className="font-inter text-xs text-[#94A3B8]">
                  Validated on Cassini &amp; Mars Odyssey missions
                </p>
              </div>

              <div className="p-4 bg-[#030407] border border-hud rounded-[2px]">
                <span className="font-mono text-xs text-[#94A3B8] uppercase block mb-1">
                  BRIER SELECTION BIAS
                </span>
                <span className="font-space font-bold text-2xl text-[#FB923C] block mb-1">
                  2.14x DEGRADATION
                </span>
                <p className="font-inter text-xs text-[#94A3B8]">
                  Quantified on astronomical transient alert streams
                </p>
              </div>

              <div className="p-4 bg-[#030407] border border-hud rounded-[2px]">
                <span className="font-mono text-xs text-[#94A3B8] uppercase block mb-1">
                  COLLISION RISK MODEL
                </span>
                <span className="font-space font-bold text-2xl text-[#7C3AED] block mb-1">
                  0.93 ROC-AUC
                </span>
                <p className="font-inter text-xs text-[#94A3B8]">
                  LightGBM classifier screening ~200M object pairs
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: CURRENTLY STRIP */}
      <section className="w-full border-y border-[rgba(255,255,255,0.08)] bg-[#070913]/70 backdrop-blur-xl py-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hud-panel p-6 border-hud relative overflow-hidden group hover:border-[#22D3EE]/40 transition-colors">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#22D3EE] tracking-widest uppercase mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>ROLE // PRESENT</span>
            </div>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              AI/ML Engineer @ KIREAP
            </h3>
            <p className="font-inter text-sm text-[#94A3B8]">
              Building autonomous agentic development platforms since April 2025
            </p>
          </div>

          <div className="hud-panel p-6 border-hud relative overflow-hidden group hover:border-[#22D3EE]/40 transition-colors">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#22D3EE] tracking-widest uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>ACADEMICS</span>
            </div>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              B.Tech Information Technology
            </h3>
            <p className="font-inter text-sm text-[#94A3B8]">
              CUSAT · CGPA 9.11/10
            </p>
          </div>

          <div className="hud-panel p-6 border-hud relative overflow-hidden group hover:border-[#FB923C]/40 transition-colors">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#FB923C] tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPETITION</span>
            </div>
            <h3 className="font-space font-bold text-lg text-[#F5F7FF] mb-2">
              European Rover Challenge 2023
            </h3>
            <p className="font-inter text-sm text-[#94A3B8]">
              Ranked 11th globally out of 85+ international university teams
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY ASTROPHYSICS */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24">
        <div className="hud-panel p-8 sm:p-12 border-hud relative overflow-hidden">
          <span className="font-mono text-xs text-[#22D3EE] tracking-[0.2em] uppercase mb-3 block font-semibold">
            MOTIVATION // PERSPECTIVE
          </span>

          <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF] mb-6">
            Why astrophysics
          </h2>

          <div className="font-inter text-[#94A3B8] leading-relaxed space-y-4 max-w-3xl text-sm sm:text-base">
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
              onClick={playHudClick}
              className="inline-flex items-center gap-2 font-space font-semibold text-xs text-[#22D3EE] hover:text-[#FB923C] uppercase tracking-wider transition-colors"
            >
              Read the research angle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS PREVIEW */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-[#22D3EE] tracking-[0.2em] uppercase block mb-2 font-semibold">
              FEATURED WORK
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#F5F7FF]">
              Selected Systems
            </h2>
          </div>
          <Link
            href="/projects"
            onClick={playHudClick}
            className="mt-4 md:mt-0 font-space text-xs font-semibold text-[#94A3B8] hover:text-[#22D3EE] uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            View all 6 projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <div key={proj.name}>
              <TiltCard className="p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#7C3AED] tracking-widest uppercase block mb-2 font-semibold">
                    SYSTEM // 0{idx + 1}
                  </span>
                  <h3 className="font-space font-bold text-xl text-[#F5F7FF] mb-3">
                    {proj.name}
                  </h3>
                  <p className="font-inter text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {proj.tagline}
                  </p>
                </div>
                <Link
                  href={proj.href}
                  onClick={playHudClick}
                  className="font-space font-semibold text-xs text-[#22D3EE] hover:text-[#FB923C] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  View project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
