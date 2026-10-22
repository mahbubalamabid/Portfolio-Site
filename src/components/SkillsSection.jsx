import { useState } from "react";
import {
  Cpu,
  Layout,
  Server,
  Database,
  Wrench,
  Terminal,
  Sparkles,
  Users,
  FileText,
  Headphones,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SkillLogo } from "./SkillLogos";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend Development", icon: Layout },
    { id: "backend", label: "Backend Development & Authentication", icon: Server },
    { id: "database", label: "Databases", icon: Database },
    { id: "tools", label: "Developer Tools & Workflow", icon: Wrench },
    { id: "linux", label: "Linux & Command Line", icon: Terminal },
    { id: "animation", label: "Animation & UI Effects", icon: Sparkles },
    { id: "soft-skills", label: "Soft Skills", icon: Users },
    { id: "productivity", label: "Productivity & Office Tools", icon: FileText },
    { id: "audio", label: "Audio Editing", icon: Headphones },
  ];

  const skillGroups = [
    {
      category: "frontend",
      title: "Frontend Development",
      icon: Layout,
      borderColor: "hover:border-cyan-500/40",
      skills: [
        { name: "HTML5", status: "Learning", desc: "Semantic structure and modern web markup." },
        { name: "CSS3", status: "Learning", desc: "Modern styling, flexbox, grid, and animations." },
        { name: "JavaScript", status: "Learning", desc: "Core ES6+, DOM manipulation, and asynchronous programming." },
        { name: "TypeScript", status: "Learning", desc: "Static typing, interfaces, and typed frontend development." },
        { name: "React.js", status: "Practising", desc: "Building interactive user interfaces with components and hooks." },
        { name: "Next.js", status: "Practising", desc: "Developing web applications with React and Next.js." },
        { name: "Tailwind CSS", status: "Learning", desc: "Utility-first styling and responsive interface design." },
        { name: "DaisyUI", status: "Learning", desc: "Tailwind CSS component library for rapid UI development." },
        { name: "Responsive Web Design", status: "Learning", desc: "Mobile-first layouts adaptable across all screen sizes." },
        { name: "Vite", status: "Practising", desc: "Fast frontend development server and bundling tool." },
      ],
    },
    {
      category: "backend",
      title: "Backend Development & Authentication",
      icon: Server,
      borderColor: "hover:border-emerald-500/40",
      skills: [
        { name: "Node.js", status: "Practising", desc: "Running JavaScript on the server for backend services." },
        { name: "Express.js", status: "Practising", desc: "Building web servers, middleware, and route handlers." },
        { name: "REST API Development", status: "Practising", desc: "Creating backend API endpoints for data exchange." },
        { name: "JWT Authentication", status: "Practising", desc: "Implementing token-based user authentication and security." },
      ],
    },
    {
      category: "database",
      title: "Databases",
      icon: Database,
      borderColor: "hover:border-purple-500/40",
      skills: [
        { name: "MongoDB", status: "Learning", desc: "Learning document-oriented NoSQL data storage." },
        { name: "MySQL", status: "Learning", desc: "Learning relational database management and SQL queries." },
      ],
    },
    {
      category: "tools",
      title: "Developer Tools & Workflow",
      icon: Wrench,
      borderColor: "hover:border-amber-500/40",
      skills: [
        { name: "Git", status: "Practising", desc: "Distributed version control, branching, and commits." },
        { name: "GitHub", status: "Practising", desc: "Code repository hosting, project tracking, and collaboration." },
        { name: "Vite", status: "Practising", desc: "Modern project setup, rapid HMR, and build workflow." },
        { name: "Postman", status: "Practising", desc: "Testing, validating, and debugging API endpoints." },
        { name: "VS Code", status: "Practising", desc: "Primary code editor and development environment." },
      ],
    },
    {
      category: "linux",
      title: "Linux & Command Line",
      icon: Terminal,
      borderColor: "hover:border-teal-500/40",
      skills: [
        { name: "Linux", status: "Practising", desc: "Using Linux environments and command-line navigation." },
        { name: "Bash", status: "Practising", desc: "Writing shell commands and running terminal scripts." },
        { name: "Command-Line Tools", status: "Practising", desc: "Navigating filesystems, managing packages, and CLI utilities." },
      ],
    },
    {
      category: "animation",
      title: "Animation & UI Effects",
      icon: Sparkles,
      borderColor: "hover:border-pink-500/40",
      skills: [
        { name: "GSAP", status: "Exploring", desc: "Exploring animation through tutorials and practice." },
        { name: "ScrollTrigger", status: "Exploring", desc: "Learning scroll-linked transitions and scrub effects." },
        { name: "Lenis", status: "Exploring", desc: "Exploring smooth inertial scrolling integration." },
      ],
    },
    {
      category: "soft-skills",
      title: "Soft Skills",
      icon: Users,
      borderColor: "hover:border-blue-500/40",
      skills: [
        { name: "Problem Solving", status: "", desc: "Breaking down programming challenges into workable solutions." },
        { name: "Communication", status: "", desc: "Sharing technical ideas clearly and discussing feedback." },
        { name: "Teamwork", status: "", desc: "Collaborating constructively with others on projects." },
        { name: "Adaptability", status: "", desc: "Embracing new tools, technologies, and evolving requirements." },
        { name: "Continuous Learning", status: "", desc: "Actively studying, building projects, and expanding knowledge." },
      ],
    },
    {
      category: "productivity",
      title: "Productivity & Office Tools",
      icon: FileText,
      borderColor: "hover:border-indigo-500/40",
      skills: [
        { name: "Notion", status: "Practising", desc: "Organizing notes, documentation, and project information." },
        { name: "Microsoft Excel", status: "Practising", desc: "Working with spreadsheets, calculations, and data organization." },
        { name: "Microsoft Word", status: "Practising", desc: "Creating structured documents, notes, and formatted reports." },
        { name: "Microsoft PowerPoint", status: "Practising", desc: "Preparing visual presentations and project overviews." },
      ],
    },
    {
      category: "audio",
      title: "Audio Editing",
      icon: Headphones,
      borderColor: "hover:border-cyan-500/40",
      skills: [
        { name: "Adobe Audition", status: "Projects", desc: "Audio editing, noise cleanup, and project-based practice." },
      ],
    },
  ];

  const displayedGroups =
    activeCategory === "all"
      ? isExpanded
        ? skillGroups
        : skillGroups.slice(0, 2)
      : skillGroups.filter((group) => group.category === activeCategory);

  const handleCategoryChange = (catId) => {
    if (catId !== activeCategory) {
      setIsExpanded(false);
    }
    setActiveCategory(catId);
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      const el = document.getElementById("skills");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 0) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -40, duration: 0.8 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Skills & Tools
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Technologies</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            A hands-on collection of technologies, developer tools, and practical skills developed through projects, dedicated learning, and continuous improvement.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  activeCategory === cat.id
                    ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/25 scale-105"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div
          className={`grid gap-8 ${
            displayedGroups.length === 1
              ? "grid-cols-1 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {displayedGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-zinc-900/60 border border-white/10 p-4 min-[360px]:p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 ${group.borderColor} group`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </div>

                <div
                  className={`grid gap-3.5 ${
                    displayedGroups.length === 1
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {group.skills.map((skill, sIdx) => {
                    const statusBadgeClass =
                      skill.status === "Practising"
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                        : skill.status === "Learning"
                        ? "bg-teal-500/10 text-teal-300 border-teal-500/20"
                        : skill.status === "Exploring"
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                        : skill.status === "Projects"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                        : "";

                    return (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/20 hover:bg-black/60 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-6 h-6 flex items-center justify-center shrink-0">
                              <SkillLogo name={skill.name} className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-sm text-zinc-200 truncate">
                              {skill.name}
                            </span>
                          </div>
                          {skill.status && (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${statusBadgeClass}`}
                            >
                              {skill.status}
                            </span>
                          )}
                        </div>
                        {skill.desc && (
                          <p className="text-xs text-zinc-400 mt-2 leading-snug">
                            {skill.desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Skills / Show Less Button */}
        {activeCategory === "all" && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggleExpand}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-cyan-300 bg-zinc-900/80 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Show Less" : "View All Skills"}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-cyan-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
