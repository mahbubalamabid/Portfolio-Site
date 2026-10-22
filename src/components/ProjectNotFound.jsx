import { motion, useReducedMotion } from "motion/react";
import { FolderX, ArrowLeft, Home } from "lucide-react";
import { Link } from "../context/RouterContext";

export default function ProjectNotFound({ slug }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-xl shadow-cyan-500/10">
          <FolderX className="w-10 h-10" />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
          <span>404 · Project Not Found</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Project Not Found
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
          We couldn&apos;t find a project matching{" "}
          {slug ? (
            <code className="text-cyan-300 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
              /projects/{slug}
            </code>
          ) : (
            "the requested URL"
          )}
          . It may have been updated, renamed, or is currently in development.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-sm font-medium transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Portfolio Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
