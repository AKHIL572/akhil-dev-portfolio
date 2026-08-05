import { Brain, Database, BarChart3, Code2, Cloud, GitBranch, Layers, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

interface SkillGroup {
    icon: React.ReactNode;
    category: string;
    items: { name: string; level: number }[];
}

const getProficiencyColor = (level: number): string => {
    if (level >= 85) return "hsl(var(--primary))";
    if (level >= 75) return "hsl(var(--accent))";
    return "hsl(var(--muted-foreground))";
};

const getProficiencyLabel = (level: number): string => {
    if (level >= 85) return "Expert";
    if (level >= 75) return "Intermediate";
    return "Beginner";
};

const skillGroups: SkillGroup[] = [
    {
        icon: <Code2 size={18} />,
        category: "Programming",
        items: [
            { name: "Python", level: 95 },
            { name: "SQL", level: 90 },
            { name: "C", level: 70 },
            { name: "HTML/CSS", level: 80 },
        ],
    },
    {
        icon: <BarChart3 size={18} />,
        category: "Analytics & Visualization",
        items: [
            { name: "Pandas / NumPy", level: 92 },
            { name: "Power BI", level: 88 },
            { name: "Matplotlib / Seaborn", level: 85 },
            { name: "Excel / Sheets", level: 90 },
        ],
    },
    {
        icon: <Brain size={18} />,
        category: "Machine Learning",
        items: [
            { name: "Scikit-learn", level: 90 },
            { name: "XGBoost", level: 85 },
            { name: "Random Forest", level: 88 },
            { name: "Feature Engineering", level: 87 },
        ],
    },
    {
        icon: <Database size={18} />,
        category: "Database & Query",
        items: [
            { name: "MySQL", level: 88 },
            { name: "SQLite", level: 82 },
            { name: "MongoDB", level: 75 },
            { name: "Power Query", level: 85 },
        ],
    },
    {
        icon: <Cloud size={18} />,
        category: "Deployment",
        items: [
            { name: "Streamlit", level: 90 },
            { name: "Streamlit Cloud", level: 85 },
            { name: "API Design", level: 70 },
        ],
    },
    {
        icon: <GitBranch size={18} />,
        category: "Dev Tools",
        items: [
            { name: "Git / GitHub", level: 88 },
            { name: "Jupyter Notebook", level: 92 },
            { name: "VS Code", level: 90 },
            { name: "Google Colab", level: 85 },
        ],
    },
];

const SkillBar = ({ name, level, delay, isVisible }: { name: string; level: number; delay: number; isVisible: boolean }) => {
    const [width, setWidth] = useState(0);
    const color = getProficiencyColor(level);
    const label = getProficiencyLabel(level);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setWidth(level), delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, level, delay]);

    return (
        <div className="group">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground font-medium">{name}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
                    <span className="text-xs font-mono text-muted-foreground tabular-nums w-8 text-right">{level}%</span>
                </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${width}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}40`,
                    }}
                />
            </div>
        </div>
    );
};

const SkillsSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <section id="skills" className="py-24 relative">
            {/* Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div ref={ref} className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className={`mb-14 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <p className="section-label">// Skills</p>
                    <h2 className="section-title mb-4">Tech Stack</h2>
                    <p className="text-muted-foreground max-w-lg">
                        A curated set of tools and technologies I use to transform data into actionable intelligence.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Category Tabs - Left Side */}
                    <div className={`lg:col-span-4 space-y-2 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                        {skillGroups.map((group, i) => (
                            <button
                                key={group.category}
                                onClick={() => setActiveCategory(i)}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-300 ${
                                    activeCategory === i
                                        ? "bg-primary/10 border border-primary/30 text-primary"
                                        : "bg-card/30 border border-border/40 text-muted-foreground hover:bg-card/50 hover:text-foreground"
                                }`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${activeCategory === i ? "bg-primary/20" : "bg-muted/50"}`}>
                                    {group.icon}
                                </div>
                                <span className="font-semibold text-sm">{group.category}</span>
                                {activeCategory === i && (
                                    <Sparkles size={14} className="ml-auto text-primary animate-pulse" />
                                )}
                            </button>
                        ))}

                        {/* All Skills Cloud */}
                        <div className="mt-6 p-5 rounded-xl border border-border/40 bg-card/20">
                            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">All Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroups.flatMap(g => g.items.map(i => i.name)).slice(0, 18).map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-muted/40 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-primary/10 text-primary border border-primary/20">
                                    +more
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Skill Detail - Right Side */}
                    <div className={`lg:col-span-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                        <div className="glass-strong rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{skillGroups[activeCategory].category}</h3>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {skillGroups[activeCategory].items.length} technologies
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {skillGroups[activeCategory].items.map((item, i) => (
                                    <SkillBar
                                        key={item.name}
                                        name={item.name}
                                        level={item.level}
                                        delay={100 + i * 100}
                                        isVisible={isVisible && activeCategory >= 0}
                                    />
                                ))}
                            </div>

                            {/* Proficiency Legend */}
                            <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-6 flex-wrap">
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Proficiency</span>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {[
                                        { label: "Beginner", level: 60, min: 0, max: 74 },
                                        { label: "Intermediate", level: 80, min: 75, max: 84 },
                                        { label: "Expert", level: 95, min: 85, max: 100 },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-1.5">
                                            <div 
                                                className="w-2.5 h-2.5 rounded-full" 
                                                style={{ backgroundColor: getProficiencyColor(item.level) }}
                                            />
                                            <span className="text-[10px] text-muted-foreground">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
