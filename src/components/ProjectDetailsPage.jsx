import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Sparkles,
  Layers,
  Wrench,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Globe,
  Tag,
  Share2,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { SkillLogo } from "./SkillLogos";
import { Link } from "../context/RouterContext";
import signatureImg from "../assets/signature.png";

export default function ProjectDetailsPage({ project }) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top when mounting project details
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [project?.slug]);

  if (!project) return null;

  // Extract and normalize project data with safe fallbacks
  const title = project.title || "Untitled Project";
  const categoryLabel = project.categoryLabel || project.category || "Project Showcase";
  const projectType = project.projectType || "client-side";
  const status = project.status || "Completed";
  const subtitle = project.subtitle || project.shortDescription || "";
  const fullDescription = project.fullDescription || project.description || subtitle;
  const capabilities = Array.isArray(project.capabilities) ? project.capabilities : [];
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : Array.isArray(project.tech)
    ? project.tech
    : [];
  const liveUrl = project.liveUrl || project.demo || null;
  const rawGithubUrl = project.githubUrl || project.github || null;

  // Client-side project eligibility rule for GitHub repository display
  const isClientSideEligible =
    String(projectType).toLowerCase().includes("client") ||
    String(projectType).toLowerCase().includes("frontend");
  const githubUrl = isClientSideEligible && rawGithubUrl ? rawGithubUrl : null;

  const previewImage = project.previewImg || project.image || null;
  const challenges = Array.isArray(project.challenges) ? project.challenges : [];
  const solutions = Array.isArray(project.solutions) ? project.solutions : [];
  const futureImprovements = Array.isArray(project.futureImprovements)
    ? project.futureImprovements
    : [];

  // Pair challenges and solutions if lengths align, or format gracefully
  const pairedChallenges = challenges.map((challenge, index) => {
    const solution = solutions[index] || null;
    return {
      challenge,
      solution,
    };
  });

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.5,
        delay: shouldReduceMotion ? 0 : custom * 0.08,
        ease: "easeOut",
      },
    }),
  };

  const staggerBadgeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.3,
        delay: shouldReduceMotion ? 0 : 0.2 + index * 0.04,
        ease: "easeOut",
      },
    }),
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Project link copied to clipboard!");
      } catch {
        // clipboard access restricted
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-cyan-400 selection:text-black">
      {/* 1. Sticky Glassmorphic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Home link */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-white decoration-none shrink-0"
            title="Return to Portfolio Home"
            aria-label="Mahbub Alam Abid Portfolio Home"
          >
            <div className="flex items-center bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md group-hover:border-cyan-500/30 transition-colors">
              <img
                src={signatureImg}
                alt="Mahbub Alam Abid"
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Breadcrumb / Project Identifier */}
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <Link to="/#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200 truncate max-w-[260px] font-semibold">
              {title}
            </span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Projects</span>
            </Link>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                title="Open Live Application"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 sm:pt-28 pb-20 relative">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* Section A: Hero & Overview */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="space-y-6 text-left"
          >
            {/* Badges / Metadata Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Tag className="w-3 h-3 text-cyan-400" />
                {categoryLabel}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium">
                <Globe className="w-3 h-3 text-zinc-400" />
                {projectType === "client-side" ? "Client-Side Application" : projectType}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {status}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {title}
            </h1>

            {/* Subtitle / Value Proposition */}
            {subtitle && (
              <p className="text-base sm:text-xl text-cyan-200/90 font-medium leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}

            {/* Action Buttons Toolbar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Live Demo Button */}
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 text-zinc-500 border border-white/5 text-sm font-semibold cursor-not-allowed">
                  <span>Demo Link Coming Soon</span>
                </div>
              )}

              {/* GitHub Repository Button (client-side only per requirement) */}
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 hover:border-cyan-500/30 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  title="View Verified GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              ) : null}

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                title="Copy Project Link"
                aria-label="Copy Project Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Section B: Visual Media / Interactive App Preview Window */}
          {previewImage && (
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariants}
              className="rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl overflow-hidden backdrop-blur-md"
            >
              {/* Window Title Bar */}
              <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-xs text-zinc-400 hidden sm:inline">
                    {liveUrl ? liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "project-preview"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Live Preview Capture
                </div>
              </div>

              {/* Preview Image Container */}
              <div className="p-3 sm:p-5 bg-zinc-950 flex items-center justify-center">
                <img
                  src={previewImage}
                  alt={`${title} Interface Preview`}
                  className="w-full h-auto max-h-[580px] object-contain rounded-xl border border-white/5 shadow-inner"
                  loading="eager"
                />
              </div>
            </motion.div>
          )}

          {/* Section C: Detailed Overview & Capabilities */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left 2 Cols: Project Narrative */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Layers className="w-4 h-4" />
                <span>Project Narrative & Context</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                About the Application
              </h2>
              <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{fullDescription}</p>
              </div>

              {/* Key Capabilities Bullet Points */}
              {capabilities.length > 0 && (
                <div className="pt-4 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400/90">
                    Core Capabilities & Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {capabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 transition-colors"
                      >
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-zinc-300 leading-snug">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Specs Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-zinc-900/60 border border-white/10 backdrop-blur-md space-y-6 h-fit">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Project Metadata</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="text-zinc-500 uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Category
                  </div>
                  <div className="text-zinc-200 font-medium">{categoryLabel}</div>
                </div>

                <div>
                  <div className="text-zinc-500 uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Architecture Type
                  </div>
                  <div className="text-zinc-200 font-medium">
                    {projectType === "client-side" ? "Client-Side Frontend" : projectType}
                  </div>
                </div>

                <div>
                  <div className="text-zinc-500 uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Development Status
                  </div>
                  <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{status}</span>
                  </div>
                </div>

                {liveUrl && (
                  <div>
                    <div className="text-zinc-500 uppercase tracking-wider text-[11px] font-semibold mb-1">
                      Deployment URL
                    </div>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 truncate block font-mono text-xs"
                    >
                      {liveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Section D: Technology Stack Badges */}
          {technologies.length > 0 && (
            <motion.section
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariants}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                    <Wrench className="w-4 h-4" />
                    <span>Applied Technologies</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Technology Stack
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
                  Verified tools, frameworks, and utility libraries integrated directly in this project.
                </p>
              </div>

              {/* Technologies Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {technologies.map((techName, idx) => (
                  <motion.div
                    key={techName}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerBadgeVariants}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-cyan-500/40 hover:bg-zinc-800/80 transition-all duration-300 group shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <SkillLogo name={techName} className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors truncate">
                      {techName}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Section E: Challenges & Solutions */}
          {pairedChallenges.length > 0 && (
            <motion.section
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariants}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Engineering Decisions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Challenges & Solutions
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Key technical hurdles encountered during development and how they were solved.
                </p>
              </div>

              <div className="space-y-5">
                {pairedChallenges.map((pair, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-zinc-900/50 p-5 sm:p-7 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-6 hover:border-white/20 transition-colors"
                  >
                    {/* Challenge Block */}
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>The Challenge</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {pair.challenge?.title || `Challenge #${idx + 1}`}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {pair.challenge?.description || "No challenge details specified."}
                      </p>
                    </div>

                    {/* Solution Block */}
                    <div className="space-y-2.5 md:border-l md:border-white/10 md:pl-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>The Solution</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {pair.solution?.title || `Implemented Resolution`}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {pair.solution?.description || "No solution details specified."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Section F: Future Improvements / What's Next */}
          {futureImprovements.length > 0 && (
            <motion.section
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariants}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Roadmap</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Future Improvements & What&apos;s Next
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Planned enhancements, usability refinements, and architectural extensions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {futureImprovements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold mb-3.5 group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Section G: Bottom Call to Action & Navigation */}
          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 sm:p-12 text-center backdrop-blur-md relative overflow-hidden space-y-6"
          >
            <div className="max-w-xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Interested in Collaboration?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Explore more projects across full-stack engineering, or get in touch directly to discuss opportunities.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Projects Showcase</span>
              </Link>

              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-sm font-medium transition-all cursor-pointer"
              >
                <span>Contact Mahbub</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Mahbub Alam Abid · Full Stack Web Engineer</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link to="/#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <Link to="/#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
