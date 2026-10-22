import { motion, useTransform } from "motion/react";
import { ArrowDown, Code2, Rocket } from "lucide-react";

export default function AboutContent({ progress }) {
  // First slide: Philosophy & Mission - visible on entering the section, stays readable, then transitions out
  const headOpacity = useTransform(progress, [0, 0.22, 0.32], [1, 1, 0]);
  const headY = useTransform(progress, [0, 0.22, 0.32], [0, 0, -30]);

  // Second slide: Experience & Roles - fades in, stays readable through middle progression, then transitions out
  const textOpacity = useTransform(progress, [0.32, 0.42, 0.62, 0.72], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0.32, 0.42, 0.62, 0.72], [30, 0, 0, -30]);

  // Final slide: Quick highlights & CTA - fades in and remains available for smooth transition to next section
  const endOpacity = useTransform(progress, [0.72, 0.82], [0, 1]);
  const endY = useTransform(progress, [0.72, 0.82], [30, 0]);
  const endPointerEvents = useTransform(progress, (v) => (v >= 0.72 ? "auto" : "none"));

  return (
    <>
      {/* Slide 1: Mission Headline */}
      <motion.div
        style={{ opacity: headOpacity, y: headY }}
        className="absolute left-4 sm:left-6 md:left-16 lg:left-24 right-4 sm:right-6 md:right-auto top-[18%] sm:top-1/4 z-10 max-w-2xl pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
          <Code2 className="w-3.5 h-3.5" />
          Philosophy & Vision
        </div>
        <h2 className="text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          I build solutions to real-world problems through code.
        </h2>
        <p className="mt-3 sm:mt-4 text-xs min-[360px]:text-sm sm:text-xl text-zinc-300 font-light leading-relaxed">
          Translating complex business requirements into fluid, accessible, and resilient digital architectures.
        </p>
      </motion.div>

      {/* Slide 2: Engineer & Educator Narrative */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute left-4 sm:left-6 md:left-16 lg:left-24 right-4 sm:right-6 md:right-auto top-[18%] sm:top-1/4 z-10 max-w-2xl pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-3">
          <Rocket className="w-3.5 h-3.5" />
          Engineer & Instructor
        </div>
        <h3 className="text-xl min-[360px]:text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
          Full Stack Developer & Technical Web Instructor.
        </h3>
        <p className="mt-3 sm:mt-4 text-xs min-[360px]:text-sm sm:text-lg text-zinc-300 leading-relaxed">
          Specializing in scalable multi-tenant SaaS platforms, modern web architecture, and performant user interfaces, with a commitment to mentoring the next generation of engineers.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400">
          <span className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-lg">Multi-Tenant SaaS</span>
          <span className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-lg">React & Node.js</span>
          <span className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-lg">Tech Mentorship</span>
        </div>
      </motion.div>

      {/* Slide 3: Transition to Details */}
      <motion.div
        style={{ opacity: endOpacity, y: endY, pointerEvents: endPointerEvents }}
        className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center w-full max-w-md px-4 text-center"
      >
        <div className="text-center mb-4 sm:mb-5">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            Dive Deeper
          </p>
          <h4 className="text-lg sm:text-2xl font-bold text-white">
            Explore Skills, Tech & Featured Projects
          </h4>
        </div>
        <a
          href="#skills"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-6 sm:px-8 py-3.5 font-bold text-xs sm:text-sm text-black shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 min-h-[44px]"
        >
          <span>Explore Skills & Tech</span>
          <ArrowDown className="w-4 h-4 shrink-0" />
        </a>
      </motion.div>
    </>
  );
}