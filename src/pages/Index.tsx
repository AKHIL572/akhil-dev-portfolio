import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <ParticleBackground />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <footer className="border-t border-border py-8">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-mono">© 2026</p>
                    <p className="text-sm text-muted-foreground">Built with data & coffee</p>
                </div>
            </footer>
        </div>
    );
};

export default Index;
