import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionDividerProps {
    label?: string;
}

const SectionDivider = ({ label }: SectionDividerProps) => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <div ref={ref} className="py-16 flex items-center justify-center">
            <div className={`flex items-center gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}>
                <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary/50" />
                {label && (
                    <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase whitespace-nowrap">
                        {label}
                    </span>
                )}
                <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
        </div>
    );
};

export default SectionDivider;
