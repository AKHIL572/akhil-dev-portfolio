import { useState, useEffect } from "react";
import { BarChart3, Menu, X } from "lucide-react";

const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        links.forEach((link) => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-background/70 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo - Icon only */}
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleClick("#home"); }}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="relative">
                            <BarChart3
                                size={22}
                                className="text-primary transition-transform duration-300 group-hover:rotate-12"
                            />
                            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ${
                        mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="container mx-auto px-6 pb-4 space-y-1">
                        {links.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
