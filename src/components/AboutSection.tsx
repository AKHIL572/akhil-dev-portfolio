import { useScrollReveal } from "@/hooks/useScrollReveal";
import aboutPhoto from "@/assets/about-photo.png";
import { Code2, Database, Brain, BarChart3 } from "lucide-react";

const quickFacts = [
    { label: "Projects Completed", value: "12+", icon: Code2 },
    { label: "Technologies", value: "25+", icon: Database },
    { label: "ML Models Built", value: "7", icon: Brain },
    { label: "Dashboards Created", value: "10+", icon: BarChart3 },
];

const AboutSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const { ref: factsRef, isVisible: factsVisible } = useScrollReveal();

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div
                ref={ref}
                className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
                {/* Section Header */}
                <div className="mb-16">
                    <p className="section-label">// About</p>
                    <h2 className="section-title max-w-2xl text-balance">
                        Turning data into{" "}
                        <span className="gradient-text">insights</span> and intelligent solutions.
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Image Column */}
                    <div className="lg:col-span-5">
                        <div className="relative group">
                            {/* Decorative frame */}
                            <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative rounded-2xl overflow-hidden gradient-border">
                                <img
                                    src={aboutPhoto}
                                    alt="Akhil T V"
                                    className="w-full h-auto object-cover"
                                    style={{ maxHeight: "520px" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="space-y-5">
                            <p className="text-lg text-foreground/90 leading-relaxed">
                                I'm a passionate <span className="text-primary font-medium">Data Analyst & Data Scientist</span> focused on analyzing complex datasets, building predictive models, and uncovering patterns that support better decision-making.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                My work spans data analysis, machine learning, and data visualization using tools like Python, SQL, and Power BI. I've built end-to-end analytics pipelines, deployed ML models to production, and created interactive dashboards that tell compelling data stories.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Hands-on project experience includes predictive analytics, customer behavior modeling, business data analysis, and building recommendation systems that deliver real business value.
                            </p>
                        </div>

                        {/* What I Do */}
                        <div className="pt-4">
                            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">What I Do</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    { title: "Data Analysis", desc: "EDA, SQL pipelines, statistical modeling" },
                                    { title: "Machine Learning", desc: "Predictive models, classification, regression" },
                                    { title: "Data Visualization", desc: "Power BI, Tableau, interactive dashboards" },
                                    { title: "Deployment", desc: "Streamlit apps, API integrations" },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-300"
                                    >
                                        <span className="font-semibold text-sm text-foreground block mb-1">{item.title}</span>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Facts */}
                <div
                    ref={factsRef}
                    className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-200 ${factsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    {quickFacts.map((fact, i) => {
                        const Icon = fact.icon;
                        return (
                            <div
                                key={fact.label}
                                className="glass gradient-border rounded-2xl p-5 text-center group hover:border-primary/20 transition-all duration-300"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                                    <Icon size={18} />
                                </div>
                                <div className="text-2xl font-bold text-foreground font-display mb-1">{fact.value}</div>
                                <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">{fact.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
