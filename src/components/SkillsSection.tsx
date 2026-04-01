import { Brain, Database, BarChart3, Code2, Cloud, GitBranch } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillGroups = [
    { icon: <Code2 size={20} />, category: "Programming", items: ["Python", "SQL", "HTML", "CSS", "Bash"] },
    { icon: <Brain size={20} />, category: "Machine Learning", items: ["Scikit-learn", "TF-IDF", "Cosine Similarity", "Lifetimes", "Joblib"] },
    { icon: <BarChart3 size={20} />, category: "Analytics & Viz", items: ["Pandas", "Matplotlib", "Seaborn", "Power BI", "Google Looker Studio", "Excel", "Google Sheets"] },
    { icon: <Database size={20} />, category: "Database & Deployment", items: ["MySQL", "Streamlit"] },
    { icon: <Cloud size={20} />, category: "Libraries", items: ["NumPy", "SciPy"] },
    { icon: <GitBranch size={20} />, category: "Dev Tools", items: ["Git", "GitHub", "Jupyter", "VS Code"] },
];

const SkillsSection = () => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section id="skills" className="py-28 border-t border-border">
            <div ref={ref} className="container mx-auto px-6">
                <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">// Skills</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-14">Tech Stack</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillGroups.map((group, i) => (
                        <div
                            key={group.category}
                            className={`bg-card border border-border rounded-xl p-6 card-hover group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                            style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-primary">{group.icon}</span>
                                <h3 className="font-semibold text-foreground">{group.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-md font-mono">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
