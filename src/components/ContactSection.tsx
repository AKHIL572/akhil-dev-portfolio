import { Mail, ArrowUpRight, Github, Linkedin, MapPin, Clock, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactCards = [
    {
        icon: Mail,
        label: "Email",
        value: "akhilthottekkat135@email.com",
        href: "mailto:akhilthottekkat135@email.com",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "@AKHIL572",
        href: "https://github.com/AKHIL572",
        color: "text-foreground",
        bgColor: "bg-muted/50",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "Akhil T V",
        href: "https://www.linkedin.com/in/akhil-t-v",
        color: "text-[#0A66C2]",
        bgColor: "bg-[#0A66C2]/10",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "India",
        href: "#",
        color: "text-accent",
        bgColor: "bg-accent/10",
    },
];

const ContactSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = (formData.get("name") ?? "").toString().trim();
        const email = (formData.get("email") ?? "").toString().trim();
        const subject = (formData.get("subject") ?? "").toString().trim();
        const message = (formData.get("message") ?? "").toString().trim();

        if (!name || !email || !subject || !message) {
            toast({ title: "Validation error", description: "Please fill in all required fields." });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast({ title: "Invalid email", description: "Please enter a valid email address." });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload?.error || "Failed to send message");
            }

            toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
            form.reset();
        } catch (error) {
            toast({
                title: "Send failed",
                description: error instanceof Error ? error.message : "Unexpected error occurred.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />

            <div ref={ref} className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <p className="section-label">// Contact</p>
                    <h2 className="section-title mb-4">Let's work together</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Open to freelance projects, full-time roles, and research collaborations. Let's build something impactful.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Left - Contact Info */}
                    <div className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                        {/* Availability Badge */}
                        <div className="glass rounded-2xl p-5 flex items-center gap-4">
                            <div className="relative">
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-foreground">Available for work</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock size={10} />
                                    Typically responds within 24 hours
                                </div>
                            </div>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {contactCards.map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <a
                                        key={card.label}
                                        href={card.href}
                                        target={card.href.startsWith("http") ? "_blank" : undefined}
                                        rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className={`group glass rounded-xl p-4 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 ${
                                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                        }`}
                                        style={{ transitionDelay: `${200 + i * 100}ms` }}
                                    >
                                        <div className={`inline-flex p-2 rounded-lg ${card.bgColor} ${card.color} mb-3 group-hover:scale-110 transition-transform`}>
                                            <Icon size={16} />
                                        </div>
                                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{card.label}</div>
                                        <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                                            {card.value}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Quick Note */}
                        <div className="glass rounded-2xl p-5 border-l-2 border-primary/50">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Prefer email? Drop me a line at{" "}
                                <a href="mailto:akhilthottekkat135@email.com" className="text-primary hover:underline font-medium">
                                    akhilthottekkat135@email.com
                                </a>
                                . I read every message and typically respond within a day.
                            </p>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                        <div className="glass-strong rounded-2xl p-6 md:p-8">
                            <h3 className="text-lg font-bold mb-1">Send a message</h3>
                            <p className="text-sm text-muted-foreground mb-6">Fill out the form below and I'll get back to you shortly.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name</label>
                                        <Input
                                            name="name"
                                            placeholder="Your name"
                                            required
                                            maxLength={100}
                                            className="bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="your@example.com"
                                            required
                                            maxLength={255}
                                            className="bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Subject</label>
                                    <Input
                                        name="subject"
                                        placeholder="What's this about?"
                                        required
                                        maxLength={200}
                                        className="bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Message</label>
                                    <Textarea
                                        name="message"
                                        placeholder="Tell me about your project, role, or idea..."
                                        required
                                        maxLength={1000}
                                        rows={5}
                                        className="bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all resize-none"
                                    />
                                    <div className="text-right text-[10px] text-muted-foreground font-mono">
                                        Max 1000 characters
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full group"
                                    size="lg"
                                    disabled={isSubmitting}
                                >
                                    <Send size={16} className="mr-2 group-hover:translate-x-0.5 transition-transform" />
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
