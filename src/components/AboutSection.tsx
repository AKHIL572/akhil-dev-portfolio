import { useScrollReveal } from "@/hooks/useScrollReveal";
import aboutPhoto from "@/assets/about-photo.png";

const AboutSection = () => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section id="about" className="py-28 border-t border-border">
            <div
                ref={ref}
                className={`container mx-auto px-6 max-w-5xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">// About</p>
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <img
                        src={aboutPhoto}
                        alt="Profile photo"
                        className="w-64 h-80 object-cover rounded-2xl shrink-0"
                    />
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Turning data into insights and intelligent solutions.
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Focused on analyzing complex datasets, building predictive models, and uncovering patterns that support better decision-making. Work spans data analysis, machine learning, and data visualization using tools like Python, SQL, and Power BI.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Hands-on project experience includes predictive analytics, customer behavior modeling, and business data analysis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
