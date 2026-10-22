import { useState } from "react";
import { FolderGit2, ExternalLink, Check, ArrowUpRight, Eye, FileText } from "lucide-react";
import { GithubIcon } from "./Icons";
import devstackPreviewImg from "../assets/projects/devstack-preview.webp";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [pinnedCardId, setPinnedCardId] = useState(null);

  const projects = [
    {
      id: "devstack",
      title: "DevStack — Technology Stack Explorer",
      category: "frontend",
      categoryLabel: "Frontend · React Practice Project",
      subtitle:
        "Explore development technologies, compare their ratings and popularity, and build a personalized tech stack.",
      description:
        "DevStack is a React-based practice project built to apply and strengthen React development skills through an interactive interface. It allows users to explore technology cards, view ratings and popularity indicators, and create a personalized stack by adding or removing technologies.",
      capabilities: [
        "Browse technologies through interactive technology cards.",
        "View technology ratings and popularity badges.",
        "Add technologies to a personalized stack.",
        "Remove technologies from the selected stack.",
        "Interact with a responsive interface built using modern frontend tools.",
      ],
      tech: ["React", "JavaScript", "Vite", "Tailwind CSS", "DaisyUI"],
      github: "https://github.com/mahbubalamabid/DevStack-Project",
      demo: "https://dev-stack-project-xi.vercel.app/",
      previewImg: devstackPreviewImg,
      accent: "from-cyan-500/20 via-teal-500/10 to-transparent",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      isPlaceholder: false,
    },
    {
      id: "placeholder-project",
      title: "Project details coming soon",
      category: "upcoming",
      accent: "from-white/[0.04] to-transparent",
      isPlaceholder: true,
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend · React" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const togglePreview = (projectId) => {
    setPinnedCardId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section id="projects" className="py-24 bg-black relative border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            Selected Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            A showcase of web applications, interactive interfaces, and practical projects built by Mahbub Alam Abid.
          </p>

          {/* Filter Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filterTabs.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  filter === btn.id
                    ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/25 scale-105"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => {
            const isPreview =
              !project.isPlaceholder &&
              ((hoveredCardId === project.id) || (pinnedCardId === project.id));

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  if (!project.isPlaceholder) setHoveredCardId(project.id);
                }}
                onMouseLeave={() => {
                  if (!project.isPlaceholder) setHoveredCardId(null);
                }}
                className="flex flex-col justify-between rounded-3xl bg-zinc-900/60 border border-white/10 overflow-hidden backdrop-blur-sm hover:border-cyan-500/40 hover:bg-zinc-900/80 transition-all duration-300 group shadow-2xl h-full"
              >
                {project.isPlaceholder ? (
                  /* Card 2: Placeholder Card */
                  <div className="flex flex-col justify-between h-full flex-1">
                    {/* Card Header */}
                    <div className={`p-6 sm:p-8 bg-gradient-to-br ${project.accent} border-b border-white/5`}>
                      <div className="min-h-[28px] mb-4" />
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-400">
                        {project.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center items-center">
                      <div className="w-full flex-1 flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center min-h-[300px]">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4 group-hover:border-cyan-500/20 group-hover:text-cyan-400/60 transition-colors">
                          <FolderGit2 className="w-7 h-7" />
                        </div>
                        <p className="text-base sm:text-lg font-medium text-zinc-400">
                          Project details coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Card 1: Confirmed Project (DevStack) with Interactive Preview */
                  <div className="flex flex-col justify-between h-full flex-1">
                    {/* Card Header & Preview Banner */}
                    <div className={`p-6 sm:p-8 bg-gradient-to-br ${project.accent} border-b border-white/5 relative`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${project.badgeColor}`}>
                          {project.categoryLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Interactive Preview / Details Toggle for Touch & Keyboard */}
                          <button
                            type="button"
                            onClick={() => togglePreview(project.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                              isPreview
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-500/20"
                                : "bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border-white/10"
                            }`}
                            title={isPreview ? "Show project details" : "Show application preview"}
                            aria-label={isPreview ? "Show project details" : "Show application preview"}
                            aria-pressed={isPreview}
                          >
                            {isPreview ? (
                              <>
                                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Details</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Preview</span>
                              </>
                            )}
                          </button>

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-black/40 text-zinc-300 hover:text-white hover:bg-black/80 transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            title="GitHub Repository"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-black/40 text-zinc-300 hover:text-white hover:bg-black/80 transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            title="Live Demo"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-cyan-200/80 font-medium leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Central Content Area: Transitions between Details and Live Preview */}
                    <div className="relative flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[360px]">
                      {/* State A: Detailed Project Information */}
                      <div
                        className={`flex flex-col justify-between h-full space-y-6 motion-safe:transition-all duration-300 ease-in-out ${
                          isPreview
                            ? "opacity-0 pointer-events-none scale-[0.98] invisible"
                            : "opacity-100 pointer-events-auto scale-100 visible"
                        }`}
                        aria-hidden={isPreview}
                      >
                        <div>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Key Capabilities */}
                          <div className="mt-6 space-y-2.5">
                            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400/90">
                              KEY CAPABILITIES
                            </div>
                            {project.capabilities.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* State B: Application Visual Preview */}
                      <div
                        className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-center items-center motion-safe:transition-all duration-300 ease-in-out ${
                          isPreview
                            ? "opacity-100 pointer-events-auto scale-100 visible"
                            : "opacity-0 pointer-events-none scale-[0.98] invisible"
                        }`}
                        aria-hidden={!isPreview}
                      >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/20 bg-zinc-950/90 shadow-2xl flex flex-col justify-between">
                          {/* Top Preview Status Bar */}
                          <div className="px-3.5 py-2 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs text-zinc-400 shrink-0">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                              <span className="ml-2 font-mono text-[11px] text-zinc-400 truncate hidden sm:inline">
                                dev-stack-project-xi.vercel.app
                              </span>
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              App Preview
                            </span>
                          </div>

                          {/* Screenshot Container */}
                          <div className="relative w-full flex-1 overflow-hidden bg-zinc-950 flex items-center justify-center p-2 sm:p-3">
                            <img
                              src={project.previewImg}
                              alt="DevStack Application Interface Preview"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer: repository/details link and live-demo link */}
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-white/5">
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
                        >
                          <span>Explore Repository & Details</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/10 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
