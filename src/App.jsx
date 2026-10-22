import InitialLoadingScreen from "./components/InitialLoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import ScrollSequence from "./components/ScrollSequence";
import HeroContent from "./components/HeroContent";
import AboutContent from "./components/AboutContent";
import Navbar from "./components/Navbar";
import StatsSection from "./components/StatsSection";
import TechStackLoop from "./components/TechStackLoop";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
// import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Mobile focal tracking for the About sequence:
// In the opening frames, the developer is seated at his workstation on the right (focalX = 0.68),
// which frames his head, face, and upper body naturally while leaving the left side
// for the philosophy text overlay. As the camera zooms toward the laptop screen between
// frames 30 and 85 (progress 0.21 to 0.60), focalX smoothly glides to 0.50 to center the code editor.
const aboutMobileFocalX = (progress) => {
  if (progress <= 0.21) return 0.68;
  if (progress >= 0.60) return 0.50;
  const t = (progress - 0.21) / (0.60 - 0.21);
  const ease = t * t * (3 - 2 * t);
  return 0.68 + (0.50 - 0.68) * ease;
};

export default function App() {
  return (
    <>
      <InitialLoadingScreen />
      <SmoothScroll>
        <div className="relative bg-black text-white selection:bg-cyan-400 selection:text-black">
          {/* Navigation Bar */}
        <Navbar />

        {/* 1. Hero Canvas Sequence */}
        <div id="hero" className="relative">
          <ScrollSequence name="hero" frameCount={144} scrollLength={4000} mobileFocalX={0.435}>
            {(progress) => <HeroContent progress={progress} />}
          </ScrollSequence>
        </div>

        {/* 2. Key Metrics & Impact */}
        <StatsSection />

        {/* Tech Stack LogoLoop Strip */}
        <TechStackLoop />

        {/* 3. Work Experience */}
        <ExperienceSection />

        {/* 4. About Canvas Sequence (Moved after Work Experience) */}
        <div id="about" className="relative">
          <ScrollSequence
            name="about"
            frameCount={144}
            scrollLength={3500}
            mobileFocalX={aboutMobileFocalX}
          >
            {(progress) => <AboutContent progress={progress} />}
          </ScrollSequence>
        </div>

        {/* 5. Technical Stack & Skills */}
        <SkillsSection />

        {/* 6. Featured Projects */}
        <ProjectsSection />

        {/* 7. Solutions & Services (Temporarily Disabled) */}
        {/* <ServicesSection /> */}

        {/* 8. Contact & Inquiry */}
        <ContactSection />

        {/* 9. Footer */}
        <Footer />
      </div>
    </SmoothScroll>
    </>
  );
}