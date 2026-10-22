import { motion, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function HeroContent({ progress }) {
  // Title stays visible in initial scroll then fades out
  const titleOpacity = useTransform(progress, [0, 0.18], [1, 0]);
  const titleY = useTransform(progress, [0, 0.18], [0, -80]);
  const titleScale = useTransform(progress, [0, 0.18], [1, 0.92]);

  // Bottom scroll prompt fades out early
  const scrollPromptOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  // CTA appears near the end of hero sequence
  const ctaOpacity = useTransform(progress, [0.75, 0.92], [0, 1]);
  const ctaY = useTransform(progress, [0.75, 0.92], [30, 0]);
  const ctaPointerEvents = useTransform(progress, (v) => (v >= 0.75 ? "auto" : "none"));

  return (
    <>
      {/* Centered Initial Hero Content */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-16 sm:pt-20 pb-12 sm:pb-16 text-center pointer-events-none"
      >
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 min-[360px]:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 border border-cyan-400/30 backdrop-blur-md mb-3.5 sm:mb-6 shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
            Full-Stack Web Engineer
          </span>
        </div>

        {/* Name Title */}
        <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight sm:tracking-wider leading-[1.1] sm:leading-tight text-white max-w-4xl px-2">
          Mahbub Alam <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
            Abid
          </span>
        </h1>

        {/* Roles & Tagline */}
        <p className="mt-3 sm:mt-4 text-sm min-[380px]:text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed px-2">
          <span className="text-white font-bold block sm:inline">Full Stack Web Engineer</span>
          <span className="hidden sm:inline"> — </span>
          <span className="font-extralight text-xs min-[380px]:text-sm sm:text-lg md:text-xl block sm:inline mt-1 sm:mt-0 text-zinc-400 sm:text-zinc-300">
            Building modern web experiences with React and Next.js.
          </span>
        </p>

        {/* Quick Tech Badges */}
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xl font-bold px-2">
          {["React 19", "Node.js", "JavaScript", "Tailwind CSS", "TypeScript"].map((tag) => (
            <span
              key={tag}
              className={`text-[10px] min-[360px]:text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-black/60 border text-zinc-400 ${
                tag === "JavaScript" ? "border-cyan-400" : "border-white/10"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Initial Scroll Down Indicator */}
      <motion.div
        style={{ opacity: scrollPromptOpacity }}
        className="absolute bottom-3 min-[400px]:bottom-5 sm:bottom-10 z-10 flex flex-col items-center justify-center w-full pointer-events-none"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 mb-1.5 font-medium">
          Scroll to explore
        </span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </motion.div>

      {/* End of Hero CTA */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointerEvents }}
        className="absolute bottom-6 min-[400px]:bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none justify-center items-center px-4"
      >
        <a
          href="#experience"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 px-6 sm:px-8 py-3.5 font-bold text-xs sm:text-sm text-black shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 text-center min-h-[44px]"
        >
          <span>Explore Experience</span>
          <ArrowDown className="w-4 h-4 shrink-0" />
        </a>

        <a
          href="#projects"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 sm:px-7 py-3.5 font-medium text-xs sm:text-sm text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 text-center min-h-[44px]"
        >
          View Projects
        </a>
      </motion.div>
    </>
  );
}