import { useState, useEffect } from "react";
import { Menu, X, Mail, Download } from "lucide-react";
import { GithubIcon } from "./Icons";
import signatureImg from "../assets/signature.png";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  // { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const rawBase = import.meta.env.BASE_URL || "/";
const baseUrl = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
const resumeHref = `${baseUrl}Mahbub_Alam_Abid_Resume.pdf`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash;
    }
    return "";
  });

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When near the very bottom of the page, activate Contact
      if (scrollPosition + windowHeight >= documentHeight - 60) {
        setActiveSection("#contact");
        return;
      }

      // Check if user is at Hero section (above Experience)
      const expEl = document.querySelector("#experience");
      const threshold = 180;

      if (expEl) {
        const expRect = expEl.getBoundingClientRect();
        if (expRect.top > threshold && scrollPosition < 350) {
          setActiveSection("");
          return;
        }
      }

      const activeNavItems = navLinks.map((link) => link.href);

      for (const href of activeNavItems) {
        const el = document.querySelector(href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            setActiveSection(href);
            return;
          }
        }
      }

      // Fallback: check which section has its top above threshold and still visible
      for (let i = activeNavItems.length - 1; i >= 0; i--) {
        const href = activeNavItems[i];
        const el = document.querySelector(href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > 0) {
            setActiveSection(href);
            return;
          }
        }
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);
    if (window.history.pushState) {
      window.history.pushState(null, "", href);
    }
    const element = document.querySelector(href);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -60, duration: 1.4 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 shadow-lg shadow-black/50"
            : "bg-transparent py-3 sm:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("");
                if (window.history.pushState) {
                  window.history.pushState(null, "", " ");
                }
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.4 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 group text-white decoration-none shrink-0"
              title="Mahbub Alam Abid Portfolio"
              aria-label="Mahbub Alam Abid Portfolio Home"
            >
              <div className="flex items-center bg-white/5 border border-white/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
                <img
                  src={signatureImg}
                  alt="Mahbub Alam Abid"
                  className="h-6 sm:h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3.5 py-1.5 text-xs lg:text-sm rounded-full transition-all duration-300 ${isActive
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-md shadow-cyan-500/25"
                        : "font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/mahbubalamabid"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={resumeHref}
                download="Mahbub_Alam_Abid_Resume.pdf"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs lg:text-sm font-semibold px-4 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                title="Download Resume"
                aria-label="Download Resume"
              >
                <span>Resume</span>
                <Download className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Mobile Header Buttons */}
            <div className="md:hidden flex items-center gap-1.5">
              <a
                href="https://github.com/mahbubalamabid"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all cursor-pointer"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden relative z-50 bg-zinc-950/95 border-b border-white/10 backdrop-blur-xl px-5 sm:px-6 py-5 sm:py-6 mt-2 space-y-3 max-h-[calc(100dvh-4.5rem)] overflow-y-auto shadow-2xl">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 text-sm rounded-xl transition-all duration-300 min-h-[44px] flex items-center ${isActive
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-md shadow-cyan-500/25"
                        : "font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full text-center py-3 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 text-black font-bold rounded-xl text-sm hover:brightness-110 active:scale-[0.99] transition-all min-h-[44px] flex items-center justify-center"
              >
                Contact Mahbub
              </a>
              <a
                href="mailto:sawfaasbir.abid@gmail.com"
                className="w-full text-center py-2 text-zinc-400 hover:text-white text-xs flex items-center justify-center gap-1.5 truncate"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" /> sawfaasbir.abid@gmail.com
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
    </>
  );
}
