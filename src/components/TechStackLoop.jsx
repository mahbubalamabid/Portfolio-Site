import { useState, useEffect, useMemo } from "react";
import LogoLoop from "./LogoLoop";
import { SkillLogo } from "./SkillLogos";

export default function TechStackLoop() {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined") return { height: 38, gap: 56 };
    if (window.innerWidth < 640) return { height: 28, gap: 36 };
    if (window.innerWidth < 1024) return { height: 32, gap: 44 };
    return { height: 38, gap: 56 };
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const next =
        w < 640
          ? { height: 28, gap: 36 }
          : w < 1024
          ? { height: 32, gap: 44 }
          : { height: 38, gap: 56 };

      setDimensions((prev) =>
        prev.height === next.height && prev.gap === next.gap ? prev : next
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const techLogos = useMemo(
    () => [
      {
        node: <SkillLogo name="HTML5" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "HTML5",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        hoverColor: "#E34F26",
      },
      {
        node: <SkillLogo name="CSS3" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "CSS3",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        hoverColor: "#1572B6",
      },
      {
        node: <SkillLogo name="JavaScript" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        hoverColor: "#F7DF1E",
      },
      {
        node: <SkillLogo name="TypeScript" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
        hoverColor: "#3178C6",
      },
      {
        node: <SkillLogo name="React" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "React",
        href: "https://react.dev",
        hoverColor: "#61DAFB",
      },
      {
        node: <SkillLogo name="Next.js" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Next.js",
        href: "https://nextjs.org",
        hoverColor: "#FFFFFF",
      },
      {
        node: <SkillLogo name="Tailwind CSS" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
        hoverColor: "#38BDF8",
      },
      {
        node: <SkillLogo name="Node.js" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Node.js",
        href: "https://nodejs.org",
        hoverColor: "#5FA04E",
      },
      {
        node: <SkillLogo name="Express.js" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Express.js",
        href: "https://expressjs.com",
        hoverColor: "#68A063",
      },
      {
        node: <SkillLogo name="MongoDB" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "MongoDB",
        href: "https://www.mongodb.com",
        hoverColor: "#47A248",
      },
      {
        node: <SkillLogo name="Git" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Git",
        href: "https://git-scm.com",
        hoverColor: "#F05032",
      },
      {
        node: <SkillLogo name="GitHub" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "GitHub",
        href: "https://github.com",
        hoverColor: "#22D3EE",
      },
      {
        node: <SkillLogo name="Vite" className="w-[var(--logoloop-logoHeight)] h-[var(--logoloop-logoHeight)] shrink-0" />,
        title: "Vite",
        href: "https://vite.dev",
        hoverColor: "#646CFF",
      },
    ],
    []
  );

  return (
    <div className="relative z-10 w-full overflow-hidden py-8 sm:py-12 bg-black">
      <LogoLoop
        logos={techLogos}
        speed={80}
        direction="left"
        logoHeight={dimensions.height}
        gap={dimensions.gap}
        hoverSpeed={0}
        fadeOut
        fadeOutWidth={0.12}
        scaleOnHover
        focus={0.15}
        labels="inline"
        draggable
        intro
        ariaLabel="Technologies used in web development"
      />
    </div>
  );
}
