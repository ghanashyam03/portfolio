'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Wrench, Award, CheckCircle2, Filter } from 'lucide-react';

/* NOTE: Drop your actual resume PDF into /public/resume.pdf before deploying */

const SKILL_GROUPS = [
  {
    category: 'Machine Learning & AI',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'Agentic AI Systems'],
  },
  {
    category: 'Computer Vision',
    skills: ['CNNs', 'Vision Transformers', 'OpenCV'],
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'Django'],
  },
  {
    category: 'Databases & Caching',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'MySQL'],
  },
  {
    category: 'Tools & Cloud',
    skills: ['Docker', 'Git', 'AWS (S3, IAM, SQS)', 'GitHub Actions'],
  },
];

export default function ExperiencePage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredGroups =
    activeFilter === 'ALL'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category.toUpperCase().includes(activeFilter));

  return (
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-[#F5F7FF]">
      {/* Header & Download Resume CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[rgba(255,255,255,0.12)] pb-8"
      >
        <div>
          <span className="font-mono text-xs text-[#22D3EE] tracking-[0.25em] uppercase block mb-3 font-semibold">
            DOSSIER://CAREER_&amp;_CREDENTIALS
          </span>
          <h1 className="font-space font-bold text-4xl sm:text-6xl text-[#F5F7FF] tracking-tight mb-2">
            Experience
          </h1>
          <p className="font-inter text-base text-[#94A3B8]">
            Technical history, academic records, domain skills, and achievements.
          </p>
        </div>

        {/* Download Resume Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#FB923C] text-[#030407] font-space font-bold text-xs tracking-wider uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300 shrink-0 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
      </motion.div>

      {/* SECTION 1: EXPERIENCE */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-[#22D3EE]" />
          <h2 className="font-space font-bold text-2xl text-[#F5F7FF] uppercase tracking-wider">
            1. Professional Experience
          </h2>
        </div>

        <div className="hud-panel p-8 sm:p-10 border-hud">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[rgba(255,255,255,0.08)] pb-4">
            <div>
              <h3 className="font-space font-bold text-xl sm:text-2xl text-[#F5F7FF]">
                AI/ML Engineer
              </h3>
              <span className="font-space text-sm text-[#22D3EE] font-semibold">
                KIREAP
              </span>
            </div>
            <span className="font-mono text-xs text-[#FB923C] bg-[#030407]/90 px-3 py-1 border-hud rounded-[2px] self-start sm:self-auto">
              April 2025 – Present
            </span>
          </div>

          <ul className="space-y-4 font-inter text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
              <span>
                Contributed significantly to an Agentic AI platform, building components of a multi-agent pipeline that autonomously reasons over specifications, orchestrates task execution, and produces reviewed, production-ready code.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
              <span>
                Worked on LLM orchestration and model routing logic, improving reliability and output quality across AI agent stages through structured prompting and evaluation feedback loops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
              <span>
                Integrated ML-driven decision-making into backend microservices, connecting model inference with real-time API workflows to support autonomous task execution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
              <span>
                Designed and shipped scalable FastAPI services powering the system&apos;s core workflows, improving overall performance by 30% while maintaining production reliability.
              </span>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* SECTION 2: EDUCATION */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-5 h-5 text-[#7C3AED]" />
          <h2 className="font-space font-bold text-2xl text-[#F5F7FF] uppercase tracking-wider">
            2. Education
          </h2>
        </div>

        <div className="hud-panel p-8 sm:p-10 border-hud">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-space font-bold text-xl sm:text-2xl text-[#F5F7FF]">
                B.Tech in Information Technology
              </h3>
              <p className="font-inter text-sm text-[#94A3B8]">
                School of Engineering, CUSAT
              </p>
            </div>
            <span className="font-mono text-xs text-[#22D3EE] bg-[#030407]/90 px-3 py-1 border-hud rounded-[2px] self-start sm:self-auto">
              2021 – 2025
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3">
            <span className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
              ACADEMIC SCORE:
            </span>
            <span className="font-mono text-base text-[#FB923C] font-bold">
              CGPA 9.11 / 10
            </span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: SKILLS (WITH INTERACTIVE FILTER TABS) */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-[#22D3EE]" />
            <h2 className="font-space font-bold text-2xl text-[#F5F7FF] uppercase tracking-wider">
              3. Technical Skills
            </h2>
          </div>

          {/* Interactive Skill Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#22D3EE] mr-1" />
            {['ALL', 'MACHINE LEARNING', 'VISION', 'BACKEND', 'CLOUD'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-[2px] border transition-colors ${
                  activeFilter === tab
                    ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]'
                    : 'bg-[#070913] border-hud text-[#94A3B8] hover:text-[#F5F7FF]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.category} className="hud-panel p-6 border-hud">
              <h4 className="font-space font-semibold text-sm text-[#22D3EE] tracking-widest uppercase mb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 bg-[#030407]/90 text-[#F5F7FF] border border-[rgba(255,255,255,0.12)] rounded-[2px] hover:border-[#22D3EE]/50 hover:text-[#22D3EE] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: ACHIEVEMENTS & CERTIFICATIONS */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-5 h-5 text-[#FB923C]" />
          <h2 className="font-space font-bold text-2xl text-[#F5F7FF] uppercase tracking-wider">
            4. Achievements &amp; Certifications
          </h2>
        </div>

        <div className="hud-panel p-8 sm:p-10 border-hud space-y-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#FB923C] shrink-0 mt-1" />
            <div>
              <h4 className="font-space font-bold text-lg text-[#F5F7FF] mb-1">
                European Rover Challenge, 2023
              </h4>
              <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                Rover research, mission planning, and science-task execution as part of Team Horizon CUSAT; team ranked 11th globally out of 85+ international university teams.
              </p>
            </div>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0 mt-1" />
            <div>
              <h4 className="font-space font-bold text-lg text-[#F5F7FF] mb-1">
                Programming and Data Science, IIT Madras (2023)
              </h4>
              <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                Completed the foundational certification under the BS in Data Science and Applications programme; currently pursuing the Diploma level.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
