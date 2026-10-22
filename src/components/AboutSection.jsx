import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Code2,
  Headphones,
  GraduationCap,
  Layers,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Compass,
} from "lucide-react";

// Passive window scroll tracking to suppress expensive mouse tilt/spotlight updates during active window scrolling
let isWindowScrolling = false;
let scrollTimeoutId = null;

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      isWindowScrolling = true;
      document.documentElement.classList.add("is-scrolling");
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(() => {
        isWindowScrolling = false;
        document.documentElement.classList.remove("is-scrolling");
      }, 100);
    },
    { passive: true }
  );
}

/**
 * React Bits-Inspired DepthCard Component (Optimized)
 * Implements mouse-responsive 3D tilt, dynamic radial spotlight glow,
 * and illuminated cursor-following border highlights.
 * Uses requestAnimationFrame and direct DOM updates for 60/120fps performance with zero React re-renders.
 * Gracefully disabled on touch devices and for users who prefer reduced motion.
 */
function DepthCard({ children, className = "", tiltIntensity = 5 }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const borderGlowRef = useRef(null);
  const rafRef = useRef(null);
  const rectRef = useRef(null);
  const isHoveredRef = useRef(false);

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0));
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    isHoveredRef.current = true;
    rectRef.current = cardRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current || isWindowScrolling) return;

    // Use cached card dimensions during hover to eliminate layout reflows on every mousemove
    let rect = rectRef.current;
    if (!rect) {
      rect = cardRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nx = (x / rect.width - 0.5) * 2;
    const ny = (y / rect.height - 0.5) * 2;
    const rotX = -ny * tiltIntensity;
    const rotY = nx * tiltIntensity;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !isHoveredRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      cardRef.current.style.transition = "transform 0.1s ease-out";
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "1";
        // Hardware-accelerated GPU translate3d positioning — avoids CSS string re-parsing and repainting
        spotlightRef.current.style.transform = `translate3d(${(x - 225).toFixed(1)}px, ${(y - 225).toFixed(1)}px, 0)`;
      }
      if (borderGlowRef.current) {
        borderGlowRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    rectRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const cardEl = cardRef.current;
    if (!cardEl) return;
    cardEl.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    cardEl.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
    if (borderGlowRef.current) {
      borderGlowRef.current.style.opacity = "0";
    }
    const cleanupTransform = (e) => {
      if (e.propertyName === "transform" && !isHoveredRef.current) {
        cardEl.style.transform = "";
        cardEl.removeEventListener("transitionend", cleanupTransform);
      }
    };
    cardEl.addEventListener("transitionend", cleanupTransform);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/10 backdrop-blur-xl transition-colors duration-300 group hover:border-cyan-400/40 hover:bg-zinc-900/85 ${className}`}
    >
      {/* React Bits: Dynamic Spotlight Glow following cursor (GPU translate3d accelerated, zero React re-renders) */}
      {!isTouchDevice && !shouldReduceMotion && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full opacity-0 transition-opacity duration-300 z-10"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.14) 0%, transparent 80%)",
            transform: "translate3d(-9999px, -9999px, 0)",
            willChange: "transform",
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle border highlight following cursor */}
      {!isTouchDevice && !shouldReduceMotion && (
        <div
          ref={borderGlowRef}
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 z-10 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]"
          aria-hidden="true"
        />
      )}

      {/* Card Content with subtle 3D translation */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

/**
 * AboutSection — Redesigned using React Bits-inspired animations:
 * - Aurora Blur & Dot Shift atmospheric background
 * - Staggered text reveal with blur-to-sharp highlights
 * - Interactive 3D DepthCards with mouse-responsive tilt & cursor spotlight
 * - Asymmetric, magazine-style layout replacing generic repetitive grids
 * - Preserves all verified personal details, education, DevStack project, and hobbies
 */
export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { rootMargin: "300px 0px" } // Pre-activate 300px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Motion variants for coordinated scroll-triggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
      filter: shouldReduceMotion ? "none" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
      // Release element from offscreen filter framebuffer after entrance animation completes
      transitionEnd: {
        filter: "none",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 lg:py-36 bg-black text-white overflow-hidden border-t border-white/5"
    >
      {/* ========================================================
          REACT BITS BACKGROUND: Aurora Blur + Dot Shift Matrix Grid
          ======================================================== */}
      {/* Dot Shift Matrix Grid (Hardware-isolated static GPU layer) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.18) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 85%)",
          transform: "translateZ(0)",
        }}
        aria-hidden="true"
      />

      {/* Scoped scroll-pause optimization: prevents GPU backdrop filter invalidations during scrolling */}
      <style>{`
        .lenis-scrolling .about-pulse-orb,
        html.is-scrolling .about-pulse-orb {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Aurora Blur: Organic Floating Gradient Orbs (GPU Layer-Isolated) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      >
        {/* Cyan Orb (Top-Left) */}
        <div
          className="about-pulse-orb absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse"
          style={{
            transform: "translateZ(0)",
            willChange: "opacity",
            animationPlayState: isSectionVisible ? "running" : "paused",
          }}
        />
        {/* Teal / Emerald Orb (Bottom-Right) */}
        <div
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[140px]"
          style={{ transform: "translateZ(0)" }}
        />
        {/* Deep Slate Center Accent */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-blue-600/5 blur-[150px]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            A. EDITORIAL SECTION HEADER (Staggered Reveal + Blur Highlight)
            ======================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="mb-14 lg:mb-20"
        >
          {/* Section Kicker Pill */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-cyan-500/5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>About Me · Beyond the Code</span>
            </div>
          </motion.div>

          {/* Heading Row */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.div variants={itemVariants} className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Engineering with purpose,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400">
                  more than just code.
                </span>
              </h2>

              {/* Animated Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                className="h-1 w-28 bg-gradient-to-r from-cyan-400 via-teal-400 to-transparent rounded-full mt-5 origin-left"
              />
            </motion.div>

            {/* Quick Status Pill */}
            <motion.div
              variants={itemVariants}
              className="lg:text-right shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2 text-xs text-zinc-400 font-medium"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>B.Sc. in CSE @ BUBT (Exp. 2027)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/5 border border-cyan-400/20 text-cyan-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Available for Remote Web Roles</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================
            ASYMMETRIC EDITORIAL GRID (4 Distinct Interactive Modules)
            ======================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="space-y-6 lg:space-y-8"
        >
          {/* Top Row: Hero Identity & Journey (7 cols) + Current Focus (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Main Introduction Area & Programming Journey (Span 7 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-7 flex flex-col">
              <DepthCard className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1">
                <div>
                  {/* Card Header & Simulated Terminal Bar */}
                  <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>abid@portfolio: ~/journey</span>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      Who I Am
                    </span>
                  </div>

                  {/* Editorial Lead Paragraph */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight">
                    I am{" "}
                    <span className="text-cyan-300 font-extrabold">Mahbub Alam Abid</span>, a
                    Computer Science & Engineering student at{" "}
                    <span className="text-white border-b border-cyan-400/40 pb-0.5">BUBT</span> and
                    an aspiring{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-extrabold">
                      Full Stack Web Engineer
                    </span>
                    .
                  </h3>

                  {/* Programming Journey Narrative */}
                  <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                    My coding path began with fundamental computer science and programming coursework at BUBT. Driven by curiosity to build real, interactive digital products, I embraced self-directed web development—mastering{" "}
                    <span className="text-white font-medium">JavaScript</span>,{" "}
                    <span className="text-white font-medium">TypeScript</span>,{" "}
                    <span className="text-white font-medium">React</span>, and{" "}
                    <span className="text-white font-medium">Tailwind CSS</span> through hands-on coding.
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                    Rather than passively watching tutorials, I test my understanding by constructing functional applications like{" "}
                    <span className="text-cyan-300 font-medium">DevStack</span> (Developer Technology Stack Explorer), refining state management, reusable component structures, and problem-solving skills toward full-stack mastery.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mr-1">
                    Foundation:
                  </span>
                  {["BUBT CSE (2027)", "React 19", "Next.js", "TypeScript", "Tailwind CSS", "DevStack Project"].map(
                    (tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 font-medium transition-all group-hover:border-cyan-500/30 group-hover:text-cyan-200"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </DepthCard>
            </motion.div>

            {/* Card 2: Current Focus & Career Direction (Span 5 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-5 flex flex-col">
              <DepthCard className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950/90">
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/25 text-teal-300 text-xs font-semibold">
                      <Compass className="w-3.5 h-3.5 text-teal-400" />
                      <span>Career Direction</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">Future Focus</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Striving toward modern full-stack web excellence.
                  </h3>

                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-light">
                    Actively preparing for and pursuing{" "}
                    <span className="text-cyan-300 font-semibold">remote engineering opportunities</span>{" "}
                    where I can contribute clean code, collaborate with experienced engineers, and continuously elevate product quality.
                  </p>

                  {/* 3 Core Commitments */}
                  <div className="mt-6 space-y-3.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Frontend Precision</h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          Responsive, fluid interfaces with modular, maintainable React components.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-teal-500/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Full-Stack Integration</h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          Connecting intuitive frontend views with REST APIs, Node.js, and structured databases.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-purple-500/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Continuous Growth</h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          Consistent daily coding, thorough documentation reading, and building working prototypes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Link Footer */}
                <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Dhaka, Bangladesh</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <span>Connect with me</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </DepthCard>
            </motion.div>
          </div>

          {/* Bottom Row: Work I Enjoy (6 cols) + Beyond Coding & Mindset (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Card 3: Work I Genuinely Enjoy (Span 6 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-6 flex flex-col">
              <DepthCard className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      Craft & Focus
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Work I Genuinely Enjoy
                  </h3>
                  <p className="text-xs text-cyan-300/80 font-medium mt-1">
                    Where I thrive and love spending engineering hours
                  </p>

                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-light">
                    I thrive at the intersection of clean code and responsive user experience. I genuinely enjoy crafting mobile-first interfaces that feel natural across touchscreens and desktop viewports, architecting reusable React component libraries, and implementing smooth interactive micro-interactions.
                  </p>

                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                    I also enjoy integrating REST APIs, testing endpoints with Postman, and assembling end-to-end applications where data flows smoothly from server to client.
                  </p>
                </div>

                {/* Capability Badges */}
                <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                  {[
                    "Responsive Mobile-First UI",
                    "Reusable Component Systems",
                    "Interactive Micro-Interactions",
                    "REST API Integration",
                    "Tailwind & DaisyUI Styling",
                  ].map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-xs px-3 py-1 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-200 font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </DepthCard>
            </motion.div>

            {/* Card 4: Beyond the Code & Engineering Mindset (Span 6 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-6 flex flex-col">
              <DepthCard className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shadow-lg shadow-purple-500/10">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Beyond The Terminal
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Audio Craft & Problem-Solving Mindset
                  </h3>
                  <p className="text-xs text-purple-300/80 font-medium mt-1">
                    Creative balance and disciplined engineering habits
                  </p>

                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-light">
                    Outside programming, I channel creativity into digital audio editing—using{" "}
                    <span className="text-purple-300 font-medium">Adobe Audition</span> for noise cleanup, vocal balance, and project-based audio practice. Outside technology, I enjoy exploring{" "}
                    <span className="text-zinc-200">[Tech & Science Literature]</span>,{" "}
                    <span className="text-zinc-200">[Strategy & Puzzle Games]</span>, and visual design concepts, which help reset my mind.
                  </p>

                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                    My mindset is built on patience and curiosity. When tackling tricky bugs or unfamiliar frameworks, I break them into small testable pieces, read the documentation thoroughly, and build isolated prototypes. I value clean code structure and steady daily growth over rushed shortcuts.
                  </p>
                </div>

                {/* Mindset Pills */}
                <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                  {[
                    "Adobe Audition (Audio)",
                    "Methodical Debugging",
                    "Curious & Adaptable",
                    "Attention to Usability",
                    "Learn by Building",
                  ].map((badge, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-xs px-3 py-1 rounded-lg bg-purple-500/5 border border-purple-500/20 text-purple-200 font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </DepthCard>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
