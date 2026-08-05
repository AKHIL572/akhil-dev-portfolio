// src/pages/Index.tsx
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SectionDivider from "@/components/SectionDivider";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-background relative">
            <ParticleBackground />
            <ScrollProgress />
            <Navbar />
            <HeroSection />
            <SectionDivider label="About Me" />
            <AboutSection />
            <SectionDivider label="Tech Stack" />
            <SkillsSection />
            <SectionDivider label="Selected Work" />
            <ProjectsSection />
            <SectionDivider label="Get In Touch" />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Index;
