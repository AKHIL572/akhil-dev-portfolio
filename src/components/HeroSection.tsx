import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import resumePdf from "@/assets/Resume (2).pdf";

const HeroSection = () => {
    const photoRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <section className="min-h-screen flex items-center relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-3xl lg:max-w-xl">
                        <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold leading-[0.95] mb-4 animate-fade-in">
                            Hi, I'm <span className="gradient-text">Akhil T V</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-primary mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Data Scientist & ML Engineer
                        </p>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Focused on analyzing complex datasets, building predictive models, and uncovering patterns that support better decision-making.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <div className="flex flex-wrap gap-4">
                                <a href="#projects" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                    View Projects
                                </a>
                                <a href={resumePdf} download="Akhil_Resume.pdf" className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors border border-border flex items-center justify-center">
                                    Download Resume
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <a href="https://github.com/AKHIL572" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github size={22} />
                                </a>
                                <a href="https://www.linkedin.com/in/akhil-t-v" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin size={22} />
                                </a>
                                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Mail size={22} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Profile Photo */}
                    <div className="relative animate-fade-in self-end" style={{ animationDelay: '0.4s' }}>
                        <div
                            ref={photoRef}
                            className="relative w-80 md:w-96 lg:w-[500px] lg:-mb-20 lg:-mr-8 will-change-transform"
                            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                        >
                            {/* Gradient glow behind */}
                            <div className="absolute -inset-6 bg-gradient-to-t from-primary/25 via-accent/15 to-transparent rounded-full blur-3xl" />
                            <img
                                src={profileImg}
                                alt="Profile photo"
                                className="relative w-full h-auto object-cover object-top rounded-t-2xl"
                                style={{ maxHeight: '620px' }}
                            />
                            {/* Fade to background at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
                <ArrowDown size={20} />
            </a>
        </section>
    );
};

export default HeroSection;
