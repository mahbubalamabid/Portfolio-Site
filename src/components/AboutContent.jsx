import { useState } from "react";
import { motion, useTransform, useReducedMotion } from "motion/react";
import {
  Rocket,
  Code2,
  Headphones,
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";

/**
 * Redesigned About Section — “Beyond the Code”
 *
 * Fulfills all 4 core assignment requirements:
 * 1. Programming Journey — Learning path, technologies, practical projects (DevStack), long-term goals.
 * 2. Work I Enjoy — Responsive interfaces, reusable components, interactive UX, API integration, full-stack apps.
 * 3. Beyond Coding — Documented interest in Audio Editing (Adobe Audition) + easy-to-customize hobby placeholders.
 * 4. Personality & Mindset — Curiosity, disciplined problem-solving, learning by building, attention to detail.
 *
 * Structure & Visual Identity:
 * - Desktop: Clean 2×2 card grid flanked by editorial header and closing statement.
 * - Mobile: Responsive single-column layout organized into two scroll-synced phases
 *   to ensure zero viewport clipping and preserve mobile video framing.
 * - Dark theme with cyan/teal accents, restrained borders, and accessible contrast.
 */
export default function AboutContent({ progress }) {
  const shouldReduceMotion = useReducedMotion();
  const [mobileActiveTab, setMobileActiveTab] = useState(null); // null = driven by scroll; 0 or 1 = forced by tap

  // --- Scroll-linked animations for Desktop ---
  // Stays readable and stable throughout the camera zoom, gently fading near the end
  const desktopOpacity = useTransform(progress, [0, 0.08, 0.85, 0.95], [1, 1, 1, 0]);
  const desktopY = useTransform(progress, [0, 0.08, 0.85, 0.95], [0, 0, 0, -25]);

  // --- Scroll-linked animations for Mobile (2 distinct phases in single column) ---
  // Phase 1: Intro + Programming Journey + Work I Enjoy (Progress 0.00 -> 0.45)
  const mobileP1Opacity = useTransform(progress, [0, 0.38, 0.46], [1, 1, 0]);
  const mobileP1Y = useTransform(progress, [0, 0.38, 0.46], [0, 0, -20]);

  // Phase 2: Beyond Coding + Personality & Mindset + Closing Statement (Progress 0.46 -> 0.92)
  const mobileP2Opacity = useTransform(progress, [0.46, 0.54, 0.86, 0.96], [0, 1, 1, 0]);
  const mobileP2Y = useTransform(progress, [0.46, 0.54, 0.86, 0.96], [20, 0, 0, -20]);

  // Active phase tracking for mobile pill indicator
  const scrollPhase = useTransform(progress, (v) => (v < 0.46 ? 0 : 1));

  // Data for the 4 core topics
  const topics = [
    {
      id: "journey",
      requirement: "Requirement 1 · Journey",
      title: "Programming Journey",
      subtitle: "Academic roots & practical self-direction",
      icon: Rocket,
      accentBorder: "hover:border-cyan-400/50",
      iconColor: "text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      narrative:
        "My programming journey started with computer science fundamentals and software engineering coursework at BUBT. Driven by curiosity to build real web products, I turned to self-directed learning—mastering JavaScript, TypeScript, React, and Tailwind CSS through dedicated hands-on practice. Rather than just watching tutorials, I solidify my skills by building practical projects like DevStack, steadily growing toward full-stack engineering.",
      tags: ["BUBT CSE (Exp. 2027)", "React & TypeScript", "Project-Driven Learning"],
    },
    {
      id: "work",
      requirement: "Requirement 2 · Work I Enjoy",
      title: "Work I Enjoy",
      subtitle: "Crafting fluid & responsive web systems",
      icon: Code2,
      accentBorder: "hover:border-teal-400/50",
      iconColor: "text-teal-300",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      narrative:
        "I genuinely enjoy crafting responsive, mobile-first interfaces that feel natural across screen sizes, architecting clean, reusable React component systems, and polishing interactive UI details. I also enjoy connecting frontend views with REST APIs and backend services, creating cohesive full-stack web applications that solve practical everyday problems.",
      tags: ["Responsive UI/UX", "Reusable Components", "REST API & Full-Stack"],
    },
    {
      id: "hobbies",
      requirement: "Requirement 3 · Beyond Coding",
      title: "Beyond the Code",
      subtitle: "Audio production & creative exploration",
      icon: Headphones,
      accentBorder: "hover:border-purple-400/50",
      iconColor: "text-purple-300",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      // NOTE ON HOBBIES:
      // Audio editing with Adobe Audition is verified from your portfolio skills.
      // The bracketed items below are easily editable placeholders for your personal hobbies:
      narrative:
        "Outside the code editor, I channel creativity into digital audio editing—using Adobe Audition for project noise cleanup, vocal balancing, and sound design. Outside technology, I enjoy [Personal Hobby: e.g. Reading Tech & Science Articles], [Personal Hobby: e.g. Strategic & Logic Games], and exploring [Personal Hobby: e.g. Visual Media & Design], which keep my creativity sharp.",
      tags: [
        "Adobe Audition (Audio)",
        "Tech Articles [Placeholder]",
        "Strategy Games [Placeholder]",
      ],
    },
    {
      id: "mindset",
      requirement: "Requirement 4 · Mindset",
      title: "Personality & Mindset",
      subtitle: "How I learn, experiment, and solve challenges",
      icon: Sparkles,
      accentBorder: "hover:border-amber-400/50",
      iconColor: "text-amber-300",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      narrative:
        "I approach software engineering with genuine curiosity, patience, and a builder's discipline. When tackling unfamiliar tools or tricky bugs, I break problems down into testable pieces, read documentation thoroughly, and build small isolated prototypes. I value clean structure, attention to usability, and steady daily progress over rushed shortcuts.",
      tags: ["Methodical Problem Solver", "Curious & Adaptable", "Attention to Detail"],
    },
  ];

  return (
    <>
      {/* ========================================================
          DESKTOP & TABLET LAYOUT: Unified 2×2 Grid View (>= 768px)
          ======================================================== */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : desktopOpacity,
          y: shouldReduceMotion ? 0 : desktopY,
        }}
        className="hidden md:flex absolute inset-0 z-10 flex-col justify-center items-center px-6 lg:px-12 pointer-events-none"
      >
        <div className="w-full max-w-5xl pointer-events-auto">
          {/* A. Personal Introduction Header */}
          <div className="mb-4 lg:mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>About Me · Beyond the Code</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-1">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white tracking-tight">
                More than just code.
              </h2>
              <p className="text-xs lg:text-sm text-cyan-300/90 font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mahbub Alam Abid — CSE Student at BUBT & Aspiring Full Stack Web Engineer</span>
              </p>
            </div>
            <p className="mt-1 text-xs lg:text-sm text-zinc-300 leading-relaxed max-w-3xl font-light">
              Bridging academic computer science foundations with modern, project-based web development to build clean, accessible, and user-centric digital experiences.
            </p>
          </div>

          {/* C, D, E, F: The 4 Core Topics in a Clean 2×2 Grid */}
          <div className="grid grid-cols-2 gap-3.5 lg:gap-4">
            {topics.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.id}
                  className={`rounded-2xl bg-zinc-950/75 border border-white/10 p-4 lg:p-5 backdrop-blur-md transition-all duration-300 ${t.accentBorder} hover:bg-zinc-900/80 group shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className={`w-4 h-4 ${t.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-sm lg:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {t.title}
                          </h3>
                          <p className="text-[11px] text-zinc-400 font-medium">
                            {t.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 hidden sm:inline-block ${t.badgeColor}`}>
                        {t.requirement.split("·")[1]?.trim() || t.requirement}
                      </span>
                    </div>

                    {/* Card Body Narrative */}
                    <p className="text-xs lg:text-[13px] text-zinc-300 leading-relaxed font-light">
                      {t.narrative}
                    </p>
                  </div>

                  {/* Card Tags / Badges */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap gap-1.5">
                    {t.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] lg:text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400 group-hover:text-zinc-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* G. Closing Statement & CTA Bar */}
          <div className="mt-4 p-3.5 lg:p-4 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5 min-w-0 text-left">
              <Briefcase className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
              <p className="text-xs text-zinc-300 leading-snug">
                <span className="font-semibold text-white">Current Focus & Goal:</span> Deepening full-stack web proficiencies across React, Next.js, and backend architecture, while actively pursuing{" "}
                <span className="text-cyan-300 font-medium">remote engineering opportunities</span>.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
              <a
                href="#skills"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-transform"
              >
                <span>Explore Skills & Tech</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          MOBILE LAYOUT: Responsive Single-Column Presentation (< 768px)
          Organized into two clean phases to prevent overflow and
          preserve the developer video composition on mobile.
          ======================================================== */}
      <div className="md:hidden absolute inset-0 z-10 flex flex-col justify-center px-3.5 min-[380px]:px-4 pointer-events-none">
        {/* Mobile Phase Pill Switcher / Indicator */}
        <div className="absolute top-16 left-0 right-0 flex justify-center z-20 pointer-events-auto">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setMobileActiveTab(0)}
              className={`px-3 py-1 rounded-full transition-all ${
                (mobileActiveTab === 0 || (mobileActiveTab === null && scrollPhase.get() === 0))
                  ? "bg-cyan-400 text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              1. Journey & Craft
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveTab(1)}
              className={`px-3 py-1 rounded-full transition-all ${
                (mobileActiveTab === 1 || (mobileActiveTab === null && scrollPhase.get() === 1))
                  ? "bg-cyan-400 text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              2. Interests & Mindset
            </button>
          </div>
        </div>

        {/* Phase 1: Intro + Journey (Req 1) + Work I Enjoy (Req 2) */}
        <motion.div
          style={{
            opacity:
              mobileActiveTab === 1
                ? 0
                : mobileActiveTab === 0
                ? 1
                : shouldReduceMotion
                ? 1
                : mobileP1Opacity,
            y: mobileActiveTab !== null || shouldReduceMotion ? 0 : mobileP1Y,
            pointerEvents:
              mobileActiveTab === 0 || (mobileActiveTab === null && scrollPhase.get() === 0)
                ? "auto"
                : "none",
          }}
          className={`w-full max-w-sm mx-auto flex flex-col gap-2.5 transition-opacity duration-300 ${
            mobileActiveTab === 1 ? "hidden" : "flex"
          }`}
        >
          {/* Mobile Header */}
          <div className="text-left mb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold mb-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>About Me · Beyond the Code</span>
            </div>
            <h2 className="text-xl min-[360px]:text-2xl font-extrabold text-white leading-tight">
              More than just code.
            </h2>
            <p className="text-[11px] text-zinc-300 mt-1 leading-snug">
              Mahbub Alam Abid · BUBT CSE student & aspiring Full Stack Web Engineer.
            </p>
          </div>

          {/* Card 1: Programming Journey (Req 1) */}
          <div className="rounded-xl bg-zinc-950/85 border border-white/10 p-3.5 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <h3 className="text-xs min-[360px]:text-sm font-bold text-white">
                Programming Journey
              </h3>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
              Started with computer science foundations at BUBT. Driven by curiosity, I self-study modern web engineering with JavaScript, TypeScript, React, and Tailwind CSS, building practical projects like DevStack to apply skills hands-on.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-cyan-300">
                BUBT CSE (2027)
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                React & TypeScript
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                DevStack Project
              </span>
            </div>
          </div>

          {/* Card 2: Work I Enjoy (Req 2) */}
          <div className="rounded-xl bg-zinc-950/85 border border-white/10 p-3.5 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                <Code2 className="w-3.5 h-3.5 text-teal-300" />
              </div>
              <h3 className="text-xs min-[360px]:text-sm font-bold text-white">
                Work I Enjoy
              </h3>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
              Crafting responsive mobile-first interfaces, developing reusable React components, and integrating REST APIs into end-to-end applications that solve real-world problems.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-teal-300">
                Responsive UI/UX
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                Reusable Components
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                API Integration
              </span>
            </div>
          </div>

          <div className="text-center mt-1">
            <span className="text-[10px] text-zinc-400">
              Scroll down to view hobbies & mindset →
            </span>
          </div>
        </motion.div>

        {/* Phase 2: Beyond Coding (Req 3) + Mindset (Req 4) + Closing Statement */}
        <motion.div
          style={{
            opacity:
              mobileActiveTab === 0
                ? 0
                : mobileActiveTab === 1
                ? 1
                : shouldReduceMotion
                ? 1
                : mobileP2Opacity,
            y: mobileActiveTab !== null || shouldReduceMotion ? 0 : mobileP2Y,
            pointerEvents:
              mobileActiveTab === 1 || (mobileActiveTab === null && scrollPhase.get() === 1)
                ? "auto"
                : "none",
          }}
          className={`w-full max-w-sm mx-auto flex flex-col gap-2.5 transition-opacity duration-300 ${
            mobileActiveTab === 0 ? "hidden" : "flex"
          }`}
        >
          {/* Card 3: Beyond Coding (Req 3) */}
          <div className="rounded-xl bg-zinc-950/85 border border-white/10 p-3.5 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Headphones className="w-3.5 h-3.5 text-purple-300" />
              </div>
              <h3 className="text-xs min-[360px]:text-sm font-bold text-white">
                Beyond Coding (Hobbies)
              </h3>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
              Outside code, I edit audio using Adobe Audition (noise cleanup and sound practice). I also enjoy [Tech Articles], [Strategy Games], and [Visual Design], keeping creativity high.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-purple-300">
                Adobe Audition
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                Tech Reading [Custom]
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                Strategy Games [Custom]
              </span>
            </div>
          </div>

          {/* Card 4: Personality & Mindset (Req 4) */}
          <div className="rounded-xl bg-zinc-950/85 border border-white/10 p-3.5 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <h3 className="text-xs min-[360px]:text-sm font-bold text-white">
                Personality & Mindset
              </h3>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
              Curious, methodical, and patient. When encountering bugs or new tools, I break them into small testable pieces and build prototypes, valuing clean structure and continuous improvement.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-amber-300">
                Methodical
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                Learn by Building
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                Continuous Growth
              </span>
            </div>
          </div>

          {/* Mobile Closing Statement & CTA */}
          <div className="rounded-xl bg-zinc-950/90 border border-white/10 p-3 backdrop-blur-md shadow-lg text-center">
            <p className="text-[10px] text-zinc-300 leading-snug mb-2">
              <span className="text-white font-semibold">Goal:</span> Becoming a Full Stack Web Engineer & pursuing remote opportunities.
            </p>
            <div className="flex items-center justify-center gap-2">
              <a
                href="#skills"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold text-xs shadow-md"
              >
                <span>Explore Skills</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300"
              >
                <span>Contact</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}