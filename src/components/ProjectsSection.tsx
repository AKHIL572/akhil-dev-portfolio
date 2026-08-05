import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp, Star, Eye } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import projectBrazilian from "@/assets/project-brazilian.png";
import projectSupermarket from "@/assets/project-supermarket.png";
import projectSpotify from "@/assets/project-spotify.jpg";
import projectFlipkart from "@/assets/project-flipkart.png";
import projectNetflix from "@/assets/project-netflix.jpg";
import projectHousePrice from "@/assets/project-house-price.jpg";
import projectJobMarket from "@/assets/project-job-market.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectChurn from "@/assets/project-churn.jpg";
import projectClv from "@/assets/project-clv.jpg";
import projectCreditRisk from "@/assets/project-credit-risk.jpg";
import projectMaintenance from "@/assets/project-maintenance.jpg";

const missingProjectImg = "https://via.placeholder.com/900x540?text=Image+Coming+Soon";

type Project = {
    title: string;
    description: string;
    tags: string[];
    github: string;
    live: string;
    image: string;
    featured?: boolean;
    metric?: string;
    metricLabel?: string;
};

const dataAnalystProjects: Project[] = [
    {
        title: "Brazilian E-Commerce SQL & Power BI Analysis",
        description: "Full analytics pipeline on 100K+ Olist orders across 9 relational tables in MySQL. Wrote 78 SQL queries across 5 complexity levels — window functions, subqueries, and referential integrity modeling.",
        tags: ["MySQL", "SQL", "Power BI", "DAX", "Window Functions"],
        github: "https://github.com/AKHIL572/olist-ecommerce-sql-analysis",
        live: "#",
        image: projectBrazilian,
        metric: "100K+",
        metricLabel: "Orders Analyzed",
    },
    {
        title: "Supermarket Sales Excel Dashboard",
        description: "End-to-end sales analysis of 1,000 supermarket transactions across 3 Myanmar branches. Built 6 pivot tables and an interactive dashboard with KPI cards and slicers.",
        tags: ["Excel", "Pivot Tables", "Dashboard", "Slicers"],
        github: "https://github.com/AKHIL572/excel-sales-analytics-dashboard",
        live: "#",
        image: projectSupermarket,
        metric: "1,000",
        metricLabel: "Transactions",
    },
    {
        title: "Spotify User Insights Dashboard",
        description: "Analyzed 50,000 Spotify users across 12 countries. Built 11 DAX measures covering churn rate, retention, and premium adoption. 5-page Power BI dashboard.",
        tags: ["Power BI", "DAX", "Excel", "EDA", "Dashboard"],
        github: "https://github.com/AKHIL572/spotify-user-insights-powerbi",
        live: "#",
        image: projectSpotify,
        metric: "50K",
        metricLabel: "Users Analyzed",
    },
    {
        title: "Flipkart Pricing & Discount Analysis",
        description: "Analyzed 15,800+ Flipkart listings to uncover pricing strategy. Products under ₹500 receive ~46% average discounts. Interactive Power BI dashboard.",
        tags: ["Python", "Pandas", "Power BI", "EDA"],
        github: "https://github.com/AKHIL572/flipkart-pricing-discount-analysis",
        live: "#",
        image: projectFlipkart,
        metric: "15.8K",
        metricLabel: "Products",
    },
    {
        title: "Netflix Content Analysis Dashboard",
        description: "Analyzed 8,807 titles across 5 Jupyter notebooks. Resolved data quality issues and normalized multi-value columns. 2-page Power BI dashboard with Netflix dark theme.",
        tags: ["Python", "Pandas", "Power BI", "DAX", "EDA"],
        github: "https://github.com/AKHIL572/netflix-content-analysis-powerbi",
        live: "#",
        image: projectNetflix,
        metric: "8,807",
        metricLabel: "Titles",
    },
];

const dataScienceProjects: Project[] = [
    {
        title: "Credit Risk Prediction System",
        description: "End-to-end ML pipeline on Lending Club dataset (~1.3M records). Random Forest achieves ROC-AUC ≈ 0.70. Streamlit app with CSV upload and downloadable predictions.",
        tags: ["Python", "Scikit-learn", "Random Forest", "Streamlit"],
        github: "https://github.com/AKHIL572/Credit-Risk-Prediction-System-using-Machine-Learning",
        live: "https://credit-risk-prediction-system-using-machine-learning.streamlit.app/",
        image: projectCreditRisk,
        featured: true,
        metric: "1.3M",
        metricLabel: "Records",
    },
    {
        title: "Predictive Maintenance System (RUL)",
        description: "Predicts engine RUL from NASA Turbofan sensor data (20K+ records, 21 sensors). Random Forest achieves R² ≈ 0.71. Classifies engine health as Healthy / Warning / Critical.",
        tags: ["Python", "Random Forest", "Scikit-learn", "Streamlit"],
        github: "https://github.com/AKHIL572/Predictive-Maintenance-System-Using-Sensor-Data-RUL-Prediction-",
        live: "https://akhil572-predictive-maintenance-system-using-sensor--app-7n8j7k.streamlit.app/",
        image: projectMaintenance,
        metric: "R² 0.71",
        metricLabel: "Accuracy",
    },
    {
        title: "Telecom Customer Churn Prediction",
        description: "Churn prediction on 7,000+ telecom records. Month-to-month contracts drive ~42% churn. Streamlit app classifies customers as High / Medium / Low risk.",
        tags: ["Python", "Scikit-learn", "Power BI", "Streamlit"],
        github: "https://github.com/AKHIL572/Telecom-Customer-Churn-Analysis-Prediction",
        live: "https://telecom-customer-churn-analysis-prediction-9tkvwovbgw9tquteei8.streamlit.app/",
        image: projectChurn,
        featured: true,
        metric: "7,000+",
        metricLabel: "Customers",
    },
    {
        title: "Customer Lifetime Value (CLV) Prediction",
        description: "Processed 540K+ retail transactions using RFM engineering. Gradient Boosting identifies Pareto 80/20 pattern. Streamlit app with Power BI dashboard.",
        tags: ["Python", "Gradient Boosting", "RFM", "Power BI", "Streamlit"],
        github: "https://github.com/AKHIL572/Customer-Lifetime-Value-CLV-Prediction-Segmentation",
        live: "https://customer-lifetime-value-clv-prediction-segmentation.streamlit.app/",
        image: projectClv,
        metric: "540K+",
        metricLabel: "Transactions",
    },
    {
        title: "AI Job Market Intelligence System",
        description: "ML + NLP on 7,500+ Naukri listings. XGBoost salary prediction (R² ≈ 0.67). Hybrid recommender with TF-IDF + Cosine Similarity. Top 10 personalized job recommendations.",
        tags: ["Python", "XGBoost", "TF-IDF", "NLP", "Streamlit"],
        github: "https://github.com/AKHIL572/AI-Job-Market-Intelligence-Smart-Recommender",
        live: "https://ai-job-market-intelligence-smart-recommender-hnxcrubwj7pvreg3e.streamlit.app/",
        image: projectJobMarket,
        featured: true,
        metric: "7,500+",
        metricLabel: "Job Listings",
    },
    {
        title: "House Price Analysis & Prediction",
        description: "King County Housing Dataset (~21K records). Deep EDA and feature engineering. Gradient Boosting achieves R² ≈ 0.91. Power BI dashboard + Streamlit app.",
        tags: ["Python", "Gradient Boosting", "Power BI", "Streamlit"],
        github: "https://github.com/AKHIL572/house-price-prediction",
        live: "https://github.com/AKHIL572/house-price-prediction",
        image: projectHousePrice,
        metric: "R² 0.91",
        metricLabel: "Accuracy",
    },
    {
        title: "Restaurant Rating Prediction System",
        description: "Analyzed 9,500 Zomato records. Votes is the most influential feature. Online delivery + table booking improve ratings. Gradient Boosting R² ≈ 0.67.",
        tags: ["Python", "Scikit-learn", "Power BI", "Streamlit"],
        github: "https://github.com/AKHIL572/Restaurant-Rating-Prediction",
        live: "https://restaurant-rating-prediction-mcmebtyfca3mf9xm5ucui3.streamlit.app/",
        image: projectRestaurant,
        metric: "9,500",
        metricLabel: "Restaurants",
    },
];

const INITIAL_COUNT = 4;

const ProjectCard = ({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) => (
    <div
        className={`group relative rounded-2xl overflow-hidden border border-border/50 bg-card/40 hover:bg-card/70 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
        {/* Image */}
        {project.image !== missingProjectImg && (
            <div className="relative overflow-hidden h-52">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                        <Star size={10} className="text-primary fill-primary" />
                        <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-wider">Featured</span>
                    </div>
                )}

                {/* Metric overlay */}
                {project.metric && (
                    <div className="absolute bottom-3 right-3 glass rounded-lg px-3 py-1.5 text-right">
                        <div className="text-sm font-bold text-primary font-display">{project.metric}</div>
                        <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{project.metricLabel}</div>
                    </div>
                )}

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.github !== "#" && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-0.5"
                        >
                            <Github size={16} />
                            View Code
                        </a>
                    )}
                    {project.live !== "#" && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
                        >
                            <Eye size={16} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        )}

        {/* Content */}
        <div className="p-6">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold leading-snug pr-4 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] font-mono text-muted-foreground border border-border/60 px-2 py-1 rounded-md hover:border-primary/30 hover:text-primary transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const ProjectsSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const [activeTab, setActiveTab] = useState<"all" | "analytics" | "ml">("all");
    const [showAllAnalytics, setShowAllAnalytics] = useState(false);
    const [showAllML, setShowAllML] = useState(false);

    const allProjects = [...dataAnalystProjects, ...dataScienceProjects];
    const featuredCount = allProjects.filter(p => p.featured).length;

    const getProjects = () => {
        switch (activeTab) {
            case "analytics": return dataAnalystProjects;
            case "ml": return dataScienceProjects;
            default: return allProjects;
        }
    };

    const visibleAnalytics = showAllAnalytics ? dataAnalystProjects : dataAnalystProjects.slice(0, INITIAL_COUNT);
    const visibleML = showAllML ? dataScienceProjects : dataScienceProjects.slice(0, INITIAL_COUNT);

    return (
        <section id="projects" className="py-24 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div ref={ref} className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className={`mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <p className="section-label">// Projects</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <h2 className="section-title mb-3">Selected Work</h2>
                            <p className="text-muted-foreground max-w-lg">
                                A collection of data analytics and machine learning projects that demonstrate end-to-end problem solving.
                            </p>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-card/40 border border-border/50">
                            {[
                                { key: "all" as const, label: "All", count: allProjects.length },
                                { key: "analytics" as const, label: "Analytics", count: dataAnalystProjects.length },
                                { key: "ml" as const, label: "ML & AI", count: dataScienceProjects.length },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        activeTab === tab.key
                                            ? "text-primary-foreground bg-primary shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`ml-1.5 text-[10px] font-mono ${activeTab === tab.key ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Projects Highlight */}
                {activeTab === "all" && (
                    <div className={`mb-12 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Star size={14} className="text-primary fill-primary" />
                            <span className="font-mono text-xs text-primary uppercase tracking-wider">Featured Projects</span>
                            <span className="text-[10px] font-mono text-muted-foreground">({featuredCount})</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {allProjects.filter(p => p.featured).map((project, i) => (
                                <a
                                    key={project.title}
                                    href={project.live !== "#" ? project.live : project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group glass rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                        <span className="text-xs font-mono text-primary font-bold">{project.metric}</span>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Project Grid */}
                {activeTab === "all" ? (
                    <>
                        {/* Data Analytics */}
                        <div className="mb-16">
                            <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                                <p className="font-mono text-primary/70 text-xs tracking-widest uppercase mb-2">// Data Analytics</p>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-bold">Data Analyst Projects</h3>
                                    <span className="px-2 py-0.5 rounded-md bg-muted/50 text-[10px] font-mono text-muted-foreground">
                                        {dataAnalystProjects.length} projects
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="grid md:grid-cols-2 gap-5">
                                    {visibleAnalytics.map((project, i) => (
                                        <ProjectCard key={project.title} project={project} index={i} isVisible={isVisible} />
                                    ))}
                                </div>
                                {!showAllAnalytics && dataAnalystProjects.length > INITIAL_COUNT && (
                                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
                                )}
                            </div>

                            {dataAnalystProjects.length > INITIAL_COUNT && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => setShowAllAnalytics(!showAllAnalytics)}
                                        className="group flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors border border-primary/20 hover:border-primary/40 px-6 py-3 rounded-xl bg-primary/5 hover:bg-primary/10"
                                    >
                                        {showAllAnalytics ? (
                                            <>
                                                Show Less
                                                <ChevronUp size={16} />
                                            </>
                                        ) : (
                                            <>
                                                Show All {dataAnalystProjects.length} Projects
                                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className={`border-t border-border/50 mb-16 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} />

                        {/* Data Science */}
                        <div className="mb-16">
                            <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                                <p className="font-mono text-primary/70 text-xs tracking-widest uppercase mb-2">// Machine Learning & AI</p>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-bold">Data Science Projects</h3>
                                    <span className="px-2 py-0.5 rounded-md bg-muted/50 text-[10px] font-mono text-muted-foreground">
                                        {dataScienceProjects.length} projects
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="grid md:grid-cols-2 gap-5">
                                    {visibleML.map((project, i) => (
                                        <ProjectCard key={project.title} project={project} index={i} isVisible={isVisible} />
                                    ))}
                                </div>
                                {!showAllML && dataScienceProjects.length > INITIAL_COUNT && (
                                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
                                )}
                            </div>

                            {dataScienceProjects.length > INITIAL_COUNT && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => setShowAllML(!showAllML)}
                                        className="group flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors border border-primary/20 hover:border-primary/40 px-6 py-3 rounded-xl bg-primary/5 hover:bg-primary/10"
                                    >
                                        {showAllML ? (
                                            <>
                                                Show Less
                                                <ChevronUp size={16} />
                                            </>
                                        ) : (
                                            <>
                                                Show All {dataScienceProjects.length} Projects
                                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="relative">
                        <div className="grid md:grid-cols-2 gap-5">
                            {getProjects().map((project, i) => (
                                <ProjectCard key={project.title} project={project} index={i} isVisible={isVisible} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;
