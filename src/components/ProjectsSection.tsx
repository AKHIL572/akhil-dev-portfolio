import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
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
    inProgress?: boolean;
};

// ─── DATA ANALYST PROJECTS ───────────────────────────────────────────────────
const dataAnalystProjects: Project[] = [
    {
        title: "Brazilian E-Commerce End-to-End SQL & Power BI Analysis",
        description: "Full analytics pipeline on 100K+ Olist orders across 9 relational tables in MySQL. Wrote 78 SQL queries across 5 complexity levels — including window functions (RANK, LAG, running totals), subqueries, and referential integrity modeling. Key findings: São Paulo drives 38% of R$13.6M total revenue; repeat customer rate is near 0%. Delivered a 4-page Power BI dashboard with cross-filtering across revenue, delivery, customer, and payment views.",
        tags: ["MySQL", "SQL", "Power BI", "DAX", "Window Functions", "Relational Modeling"],
        github: "https://github.com/AKHIL572/olist-ecommerce-sql-analysis",
        live: "#",
        image: projectBrazilian,
    },
    {
        title: "Supermarket Sales Analysis — End-to-End Excel Dashboard",
        description: "End-to-end sales analysis of 1,000 supermarket transactions across 3 Myanmar branches, performed entirely in Excel. Built 6 pivot tables answering key business questions, and an interactive dashboard with KPI cards and slicers. Key findings: Naypyitaw leads in gross income, Food & Beverages tops both revenue and ratings (7.15), and afternoon is the peak sales period generating ₹148K.",
        tags: ["Microsoft Excel", "Pivot Tables", "Dashboard", "Slicers", "KPI Design"],
        github: "https://github.com/AKHIL572/excel-sales-analytics-dashboard",
        live: "#",
        image: projectSupermarket,
    },
    {
        title: "Spotify User Insights Dashboard — Growth, Churn & Engagement Analysis",
        description: "Analyzed 50,000 Spotify users across 12 countries to uncover churn, subscription conversion, and engagement patterns. Built 11 DAX measures covering churn rate, retention, ad conversion, and premium adoption. Delivered a 5-page Power BI dashboard with Spotify dark-theme branding, covering user growth, churn segmentation, conversion funnel, listening behavior, and feature preference analysis.",
        tags: ["Power BI", "DAX", "Excel", "Power Query", "EDA", "Dashboard Design"],
        github: "https://github.com/AKHIL572/spotify-user-insights-powerbi",
        live: "#",
        image: projectSpotify,
    },
    {
        title: "Flipkart Product Pricing & Discount Analysis Dashboard",
        description: "Analyzed 15,800+ Flipkart product listings (2015–16) to uncover pricing strategy and discount patterns. Engineered features including discount percentage and price buckets, and identified that products under ₹500 receive the highest average discounts (~46%) while premium products receive only ~21%. Built an interactive Power BI dashboard covering category, brand, and pricing insights.",
        tags: ["Python", "Pandas", "Power BI", "DAX", "EDA", "Jupyter Notebook"],
        github: "https://github.com/AKHIL572/flipkart-pricing-discount-analysis",
        live: "#",
        image: projectFlipkart,
    },
    {
        title: "Netflix Content Analysis & Power BI Dashboard",
        description: "Analyzed Netflix's catalog of 8,807 titles across 5 structured Jupyter notebooks. Resolved real data quality issues including misplaced duration values in the rating column, and normalized multi-value country and genre columns into relational bridge tables. Key findings: Movies dominate at 69.6%, content peaked in 2019, the US leads with 3,690 titles, and TV-MA is the most common rating. Built a 2-page Power BI dashboard with a Netflix dark theme and DAX-driven KPIs.",
        tags: ["Python", "Pandas", "Power BI", "DAX", "EDA", "Matplotlib", "Seaborn"],
        github: "https://github.com/AKHIL572/netflix-content-analysis-powerbi",
        live: "#",
        image: projectNetflix,
    },
];

// ─── DATA SCIENCE PROJECTS ───────────────────────────────────────────────────
const dataScienceProjects: Project[] = [
    {
        title: "Credit Risk Prediction System using Machine Learning",
        description: "End-to-end ML pipeline on the Lending Club dataset (~1.3M records) to classify borrowers as default / non-default. Best model achieves ROC-AUC ≈ 0.70 using Random Forest with hyperparameter tuning. Streamlit app accepts CSV upload, validates features, predicts default probability, and outputs downloadable results. Also includes an interactive Power BI dashboard for credit risk business analysis.",
        tags: ["Python", "Scikit-learn", "Random Forest", "Power BI", "Streamlit", "Joblib"],
        github: "https://github.com/AKHIL572/Credit-Risk-Prediction-System-using-Machine-Learning",
        live: "https://credit-risk-prediction-system-using-machine-learning.streamlit.app/",
        image: projectCreditRisk,
    },
    {
        title: "Predictive Maintenance System for Remaining Useful Life (RUL) Prediction",
        description: "Predicts engine RUL from NASA Turbofan sensor data (20K+ records, 21 sensors). Uses engine-wise GroupKFold splitting to prevent data leakage. Random Forest achieves MAE ≈ 25.86, RMSE ≈ 35.30, R² ≈ 0.71. Identifies degradation sensors (sensor_7, sensor_9, sensor_12) and classifies engine health as Healthy / Warning / Critical.",
        tags: ["Python", "Random Forest", "Scikit-learn", "GroupKFold", "Streamlit", "Seaborn"],
        github: "https://github.com/AKHIL572/Predictive-Maintenance-System-Using-Sensor-Data-RUL-Prediction-",
        live: "https://akhil572-predictive-maintenance-system-using-sensor--app-7n8j7k.streamlit.app/",
        image: projectMaintenance,
    },
    {
        title: "Telecom Customer Churn Prediction & Business Analytics Dashboard",
        description: "Built a churn prediction system on 7,000+ telecom customer records. Identified that month-to-month contracts drive ~42% churn, and estimated monthly revenue at risk ≈ $139K. Best model: Random Forest. Includes a Streamlit app that classifies customers as High / Medium / Low churn risk. Also includes an interactive Power BI dashboard for executive-level churn and retention analysis.",
        tags: ["Python", "Scikit-learn", "Power BI", "Streamlit", "Matplotlib"],
        github: "https://github.com/AKHIL572/Telecom-Customer-Churn-Analysis-Prediction",
        live: "https://telecom-customer-churn-analysis-prediction-9tkvwovbgw9tquteei8.streamlit.app/",
        image: projectChurn,
    },
    {
        title: "Customer Lifetime Value (CLV) Prediction & Customer Segmentation System",
        description: "Processed 540,000+ retail transactions using RFM feature engineering to predict 6-month CLV. Gradient Boosting Regressor (R² ≈ 0.5+) identifies the classic Pareto 80/20 pattern — Monetary and Frequency are top drivers. Segments customers into High / Medium / Low Value tiers, backed by a Streamlit app. Also includes an interactive Power BI dashboard for sales and customer intelligence.",
        tags: ["Python", "Gradient Boosting", "RFM Analysis", "Power BI", "Scikit-learn", "Streamlit"],
        github: "https://github.com/AKHIL572/Customer-Lifetime-Value-CLV-Prediction-Segmentation",
        live: "https://customer-lifetime-value-clv-prediction-segmentation.streamlit.app/",
        image: projectClv,
    },
    {
        title: "AI Job Market Intelligence & Smart Recommendation System",
        description: "End-to-end ML + NLP system on 7,500+ Naukri job listings. Uses XGBoost for salary prediction (R² ≈ 0.67, RMSE ≈ ₹2.7L) and a hybrid recommender engine combining 50% skill match (TF-IDF + Cosine Similarity), 20% salary fit, 15% experience, and 15% location preference. Delivers Top 10 personalized jobs with skill gap analysis.",
        tags: ["Python", "XGBoost", "TF-IDF", "Cosine Similarity", "Streamlit"],
        github: "https://github.com/AKHIL572/AI-Job-Market-Intelligence-Smart-Recommender",
        live: "https://ai-job-market-intelligence-smart-recommender-hnxcrubwj7pvreg3e.streamlit.app/",
        image: projectJobMarket,
    },
    {
        title: "House Price Analysis & Prediction System",
        description: "End-to-end data science project on the King County Housing Dataset (~21K records). Performed deep EDA and feature engineering (house_age, basement_ratio, price_log), then trained a Gradient Boosting Regressor achieving R² ≈ 0.91. Built a Power BI dashboard for market analysis and a Streamlit app for real-time price prediction.",
        tags: ["Python", "Scikit-learn", "Gradient Boosting", "Power BI", "Streamlit", "Pandas"],
        github: "https://github.com/AKHIL572/house-price-prediction",
        live: "https://github.com/AKHIL572/house-price-prediction",
        image: projectHousePrice,
    },
    {
        title: "Restaurant Rating Prediction & Market Trend Analysis System",
        description: "Analyzed 9,500 Zomato restaurant records to uncover key rating drivers. Found that Votes is the most influential feature, and that online delivery + table booking significantly improve ratings. Trained a Gradient Boosting model (R² ≈ 0.67) and deployed a Streamlit prediction app. Also includes an interactive Power BI dashboard for market trend analysis.",
        tags: ["Python", "Scikit-learn", "Power BI", "Seaborn", "Streamlit"],
        github: "https://github.com/AKHIL572/Restaurant-Rating-Prediction",
        live: "https://restaurant-rating-prediction-mcmebtyfca3mf9xm5ucui3.streamlit.app/",
        image: projectRestaurant,
    },
];

const INITIAL_COUNT = 4;

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) => (
    <div
        className={`bg-card border border-border rounded-xl overflow-hidden card-hover group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
    >
        {project.image !== missingProjectImg && (
            <div className="relative overflow-hidden h-48">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                {project.inProgress && (
                    <span className="absolute top-3 right-3 text-xs font-mono font-medium px-2.5 py-1 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-300">
                        In Progress
                    </span>
                )}
            </div>
        )}
        <div className="p-8">
            <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col gap-2 pr-4">
                    <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                    {project.image === missingProjectImg && project.inProgress && (
                        <div className="flex">
                            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-300">
                                In Progress
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex gap-3 shrink-0">
                    {project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github size={16} />
                        </a>
                    )}
                    {project.live !== "#" && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// ─── SUBSECTION COMPONENT ─────────────────────────────────────────────────────
const ProjectSubsection = ({
    label,
    title,
    projects,
    isVisible,
}: {
    label: string;
    title: string;
    projects: Project[];
    isVisible: boolean;
}) => {
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

    return (
        <div className="mb-20">
            {/* Subsection header */}
            <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <p className="font-mono text-primary/70 text-xs tracking-widest uppercase mb-2">{label}</p>
                <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
            </div>

            <div className="relative">
                <div className="grid md:grid-cols-2 gap-6">
                    {visibleProjects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} isVisible={isVisible} />
                    ))}
                </div>

                {/* Gradient fade overlay when collapsed */}
                {!showAll && projects.length > INITIAL_COUNT && (
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                )}
            </div>

            {/* Show More / Show Less — only if more than INITIAL_COUNT */}
            {projects.length > INITIAL_COUNT && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors border border-primary/30 hover:border-primary/60 px-6 py-3 rounded-lg"
                    >
                        {showAll ? (
                            <>Show Less <ChevronUp size={16} /></>
                        ) : (
                            <>Show More <ChevronDown size={16} /></>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const ProjectsSection = () => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section id="projects" className="py-28 border-t border-border">
            <div ref={ref} className="container mx-auto px-6">
                {/* Section header */}
                <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">// Projects</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-14">Selected Work</h2>
                </div>

                {/* Data Analyst Projects — first */}
                <ProjectSubsection
                    label="// Data Analytics"
                    title="Data Analyst Projects"
                    projects={dataAnalystProjects}
                    isVisible={isVisible}
                />

                {/* Divider */}
                <div className={`border-t border-border mb-20 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} />

                {/* Data Science Projects — second */}
                <ProjectSubsection
                    label="// Machine Learning & AI"
                    title="Data Science Projects"
                    projects={dataScienceProjects}
                    isVisible={isVisible}
                />
            </div>
        </section>
    );
};

export default ProjectsSection;