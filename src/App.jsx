import InitialLoadingScreen from "./components/InitialLoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import ScrollSequence from "./components/ScrollSequence";
import HeroContent from "./components/HeroContent";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import StatsSection from "./components/StatsSection";
import TechStackLoop from "./components/TechStackLoop";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
// import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

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

        {/* 4. About Section — Beyond the Code (React Bits-Inspired) */}
        <AboutSection />

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