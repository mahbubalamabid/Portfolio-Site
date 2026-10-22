import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowDown } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      role: "Full Stack Web Development",
      company: "Personal Projects & Continuous Learning",
      period: "2026 – Present",
      location: "Dhaka, Bangladesh",
      badge: "Self-Directed Learning",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      description:
        "Learning modern web development by building small projects and applying programming concepts in practice. Currently developing skills in frontend technologies and exploring full-stack application development.",
      achievements: [
        "Learning and practising HTML, CSS, JavaScript, and TypeScript.",
        "Building small projects using React and Next.js to strengthen practical development skills.",
        "Exploring Tailwind CSS to create responsive and maintainable user interfaces.",
      ],
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      role: "BSc in Computer Science and Engineering",
      company: "Bangladesh University of Business and Technology (BUBT)",
      period: "Expected 2027",
      location: "Bangladesh",
      badge: "Education",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      description:
        "Currently pursuing a Bachelor of Science in Computer Science and Engineering, developing foundational knowledge in computing, programming, and software development.",
      achievements: [
        "Computer science and programming fundamentals.",
        "Software development concepts and practical coding.",
        "Applying academic knowledge through personal programming projects.",
      ],
      skills: [],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-black relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Career & Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Experience</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            My journey in software development, hands-on learning, and computer science education.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-white/10 before:-translate-x-1/2 before:hidden md:before:block">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <div className="rounded-2xl bg-zinc-900/70 border border-white/10 p-4 min-[360px]:p-6 sm:p-8 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-zinc-900/90 transition-all duration-300 group shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${exp.badgeColor}`}
                      >
                        {exp.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 mt-1 flex items-center gap-2">
                      <span>{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 font-normal flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-4 space-y-2">
                      {exp.achievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => {
                          const isHighlighted =
                            exp.role === "Full Stack Web Development" &&
                            ["HTML", "JavaScript", "React", "Tailwind CSS"].includes(skill);

                          return (
                            <span
                              key={skill}
                              className={`text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 transition-all duration-300 ${
                                isHighlighted
                                  ? "group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-300"
                                  : ""
                              }`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Central Node for Timeline */}
                <div className="hidden md:flex items-center justify-center w-16 shrink-0 relative mt-8">
                  <div className="w-5 h-5 rounded-full bg-cyan-400 border-4 border-black shadow-lg shadow-cyan-500/50" />
                </div>

                {/* Empty opposite half for spacing */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>

        {/* Transition prompt to About Canvas */}
        <div className="mt-16 text-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all shadow-lg"
          >
            <span>Discover Vision & Philosophy</span>
            <ArrowDown className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
