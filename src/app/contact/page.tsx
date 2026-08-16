'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare } from 'lucide-react';

/* NOTE: If real backend form submission is desired later, wire this to Resend, Formspree, or a Next.js API route with an email provider */

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:ghanashyamvn@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-[#F5F7FF]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-[rgba(255,255,255,0.12)] pb-8"
      >
        <span className="font-mono text-xs text-[#22D3EE] tracking-[0.25em] uppercase block mb-3 font-semibold">
          SYSTEM://COMMUNICATION_UPLINK
        </span>
        <h1 className="font-space font-bold text-4xl sm:text-6xl text-[#F5F7FF] tracking-tight mb-4">
          Get in touch
        </h1>
        <p className="font-inter text-lg text-[#8B93B0] max-w-2xl">
          Open to AI/ML roles, research collaboration, and conversations about
          astrodynamics or astroinformatics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contact Info List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="hud-card p-8 border-hud">
            <h2 className="font-space font-bold text-xl text-[#F5F7FF] mb-6 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#22D3EE]" />
              Direct Channels
            </h2>

            <div className="space-y-6 font-inter text-sm">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-[2px] bg-[#05060A] border-hud text-[#22D3EE] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#8B93B0] uppercase block mb-1">
                    EMAIL
                  </span>
                  <a
                    href="mailto:ghanashyamvn@gmail.com"
                    className="font-mono text-sm text-[#F5F7FF] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    ghanashyamvn@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-[2px] bg-[#05060A] border-hud text-[#22D3EE] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#8B93B0] uppercase block mb-1">
                    PHONE
                  </span>
                  <a
                    href="tel:7994712221"
                    className="font-mono text-sm text-[#F5F7FF] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    7994712221
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-[2px] bg-[#05060A] border-hud text-[#22D3EE] shrink-0">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#8B93B0] uppercase block mb-1">
                    LINKEDIN
                  </span>
                  <a
                    href="https://www.linkedin.com/in/ghanashyamvn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-[#F5F7FF] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    linkedin.com/in/ghanashyamvn
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-[2px] bg-[#05060A] border-hud text-[#22D3EE] shrink-0">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#8B93B0] uppercase block mb-1">
                    GITHUB
                  </span>
                  <a
                    href="https://github.com/ghanashyam03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-[#F5F7FF] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    github.com/ghanashyam03
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: HUD Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="hud-card p-8 sm:p-10 border-hud space-y-6"
          >
            <h2 className="font-space font-bold text-xl text-[#F5F7FF] uppercase tracking-wider mb-2">
              Send Message
            </h2>
            <p className="font-inter text-xs text-[#8B93B0] mb-6">
              Submitting launches your native mail client pre-filled with your message.
            </p>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block mb-2"
              >
                YOUR NAME
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Dr. Jane Doe"
                className="w-full bg-[#05060A] border-hud text-[#F5F7FF] font-inter text-sm px-4 py-3 rounded-[2px] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] placeholder-[#8B93B0]/40 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block mb-2"
              >
                YOUR EMAIL
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. jane@observatory.org"
                className="w-full bg-[#05060A] border-hud text-[#F5F7FF] font-inter text-sm px-4 py-3 rounded-[2px] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] placeholder-[#8B93B0]/40 transition-colors"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block mb-2"
              >
                SUBJECT
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="e.g. Computational Astrophysics Collaboration"
                className="w-full bg-[#05060A] border-hud text-[#F5F7FF] font-inter text-sm px-4 py-3 rounded-[2px] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] placeholder-[#8B93B0]/40 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block mb-2"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Write your message here..."
                className="w-full bg-[#05060A] border-hud text-[#F5F7FF] font-inter text-sm px-4 py-3 rounded-[2px] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] placeholder-[#8B93B0]/40 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#FB923C] text-[#05060A] font-space font-bold text-xs tracking-widest uppercase rounded-[2px] border-hud hover:bg-[#FB923C]/90 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              <Send className="w-4 h-4" />
              Open Email Client to Send
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
