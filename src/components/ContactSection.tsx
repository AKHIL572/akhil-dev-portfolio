import { Mail, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
            toast({
                title: "Validation error",
                description: "Please fill in all required fields.",
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast({
                title: "Invalid email",
                description: "Please enter a valid email address.",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload?.error || "Failed to send message");
            }

            toast({
                title: "Message sent!",
                description: "Thanks for reaching out. I'll get back to you soon.",
            });
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
        <section id="contact" className="py-28 border-t border-border">
            <div
                ref={ref}
                className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="text-center mb-12">
                    <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">// Contact</p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's work together</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Open to freelance projects, full-time roles, and research collaborations.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                name="name"
                                placeholder="Name"
                                required
                                maxLength={100}
                                className="bg-muted/50 border-border"
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                maxLength={255}
                                className="bg-muted/50 border-border"
                            />
                        </div>
                        <Input
                            name="subject"
                            placeholder="Subject"
                            required
                            maxLength={200}
                            className="bg-muted/50 border-border"
                        />
                        <Textarea
                            name="message"
                            placeholder="Your message..."
                            required
                            maxLength={1000}
                            rows={5}
                            className="bg-muted/50 border-border resize-none"
                        />
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            <Mail size={18} />
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && <ArrowUpRight size={16} />}
                        </Button>
                    </form>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <a
                            href="https://github.com/AKHIL572"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akhil-t-v"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:akhilthottekkat135@gmail.com"
                            className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
