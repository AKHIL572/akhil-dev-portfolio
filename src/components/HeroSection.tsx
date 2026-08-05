import { ArrowDown, Github, Linkedin, Mail, Sparkles, TrendingUp, Database, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import resumePdf from "@/assets/Akhil_TV_Resume.pdf";

const statChips = [
    { label: "Records Analyzed", target: 700, decimals: 0, suffix: "K+", icon: Database },
    { label: "R² Accuracy", target: 0.91, decimals: 2, suffix: "", icon: TrendingUp },
    { label: "ML Models Shipped", target: 7, decimals: 0, suffix: "", icon: Brain },
];

const BAR_COUNT = 16;
const BAR_UPDATE_MS = 2000;

const CountUp = ({
    target,
    decimals = 0,
    suffix = "",
    duration = 1600,
    delay = 0,
}: {
    target: number;
    decimals?: number;
    suffix?: string;
    duration?: number;
    delay?: number;
}) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setValue(target);
            return;
        }

        let raf = 0;
        let start: number | null = null;

        const timeout = setTimeout(() => {
            const step = (ts: number) => {
                if (start === null) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                setValue(target * eased);
                if (progress < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
        };
    }, [target, duration, delay]);

    return <>{value.toFixed(decimals)}{suffix}</>;
};

const HeroSection = () => {
    const photoRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [barHeights, setBarHeights] = useState<number[]>(() =>
        Array.from({ length: BAR_COUNT }, () => 15 + Math.random() * 60)
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setBarHeights((prev) =>
                prev.map((h) => {
                    const target = 10 + Math.random() * 75;
                    return h + (target - h) * 0.55;
                })
            );
        }, BAR_UPDATE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden grid-bg-faint">
            {/* Animated gradient orbs */}
            <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute bottom-20 -right-32 w-80 h-80 bg-accent/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

            {/* Live dashboard bars */}
            <div
                className="absolute bottom-0 left-0 w-full h-[18%] flex items-end gap-1 px-4 md:px-12 pointer-events-none opacity-40"
                style={{
                    maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                }}
                aria-hidden="true"
            >
                {barHeights.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary/20 via-primary/8 to-transparent rounded-t-sm"
                        style={{ height: `${h}%`, transition: `height ${BAR_UPDATE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="max-w-2xl lg:max-w-xl order-2 lg:order-1">
                        {/* Label */}
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        >
                            <Sparkles size={14} className="text-primary" />
                            <span className="font-mono text-primary text-xs tracking-wider uppercase">
                                Data Scientist & Analyst
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-5 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            Hi, I'm{" "}
                            <span className="gradient-text relative">
                                Akhil T V
                                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                                    <path d="M0 3C50 0 150 6 200 3" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className={`text-xl md:text-2xl font-semibold text-primary/90 mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            Turning raw data into intelligent decisions
                        </p>

                        {/* Description */}
                        <p
                            className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            I analyze complex datasets, build predictive models, and uncover patterns that drive better decision-making. From SQL pipelines to ML deployments, I bridge the gap between data and strategy.
                        </p>

                        {/* Stats */}
                        <div
                            className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            {statChips.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="glass gradient-border rounded-xl px-5 py-3 flex items-center gap-3 group hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            <Icon size={16} />
                                        </div>
                                        <div>
                                            <span className="font-mono text-primary font-bold text-lg tabular-nums block leading-none">
                                                <CountUp
                                                    target={stat.target}
                                                    decimals={stat.decimals}
                                                    suffix={stat.suffix}
                                                    delay={600 + i * 200}
                                                />
                                            </span>
                                            <span className="font-mono text-muted-foreground text-[10px] uppercase tracking-wider">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTAs */}
                        <div
                            className={`flex flex-wrap items-center gap-5 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            <a
                                href="#projects"
                                className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                            >
                                <span className="relative z-10">View Projects</span>
                                <ArrowDown size={16} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                            <a
                                href={resumePdf}
                                download="Akhil_Resume.pdf"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-border bg-card/50 text-foreground hover:bg-card hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Download Resume
                            </a>

                            <div className="flex items-center gap-3 ml-2">
                                {[
                                    { icon: Github, href: "https://github.com/AKHIL572", label: "GitHub" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/akhil-t-v", label: "LinkedIn" },
                                    { icon: Mail, href: "#contact", label: "Email" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="p-2.5 rounded-xl border border-border bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5"
                                        aria-label={label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Profile Image */}
                    <div className="relative order-1 lg:order-2 flex-shrink-0">
                        <div
                            ref={photoRef}
                            className={`relative w-72 md:w-80 lg:w-[420px] will-change-transform transition-all duration-1000 delay-300 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                            style={{ transform: `translateY(${scrollY * 0.06}px)` }}
                        >
                            {/* Glow rings */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl blur-2xl animate-pulse-glow" />
                            <div className="absolute -inset-8 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />

                            {/* Image container with gradient border */}
                            <div className="relative rounded-3xl overflow-hidden gradient-border">
                                <img
                                    src={profileImg}
                                    alt="Akhil T V - Data Scientist"
                                    className="relative w-full h-auto object-cover object-top"
                                    style={{ maxHeight: "520px" }}
                                />
                                {/* Bottom fade */}
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 glass rounded-xl px-4 py-2.5 flex items-center gap-2 animate-float">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="font-mono text-xs text-foreground">Available for work</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
                <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5 group-hover:border-primary/50 transition-colors">
                    <div className="w-1 h-2 rounded-full bg-muted-foreground/50 group-hover:bg-primary/70 transition-colors animate-bounce-subtle" />
                </div>
            </a>
        </section>
    );
};

export default HeroSection;
