import { BarChart3, ArrowUp, Heart } from "lucide-react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-border/50 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={18} className="text-primary" />
                            <span className="font-display font-semibold text-sm"></span>
                        </div>
                        <span className="text-muted-foreground/40">|</span>
                        <p className="text-sm text-muted-foreground font-mono">
                            © {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* Center Tagline */}
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        Built with data
                        <Heart size={12} className="text-primary fill-primary" />
                    </p>

                    {/* Back to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <span className="font-mono text-xs uppercase tracking-wider">Back to top</span>
                        <div className="p-1.5 rounded-lg border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
