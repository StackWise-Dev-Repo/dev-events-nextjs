import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    interactive?: boolean;
    className?: string;
    glow?: boolean;
}

export default function Card({
                                 children,
                                 interactive = true,
                                 className = "",
                                 glow = true,
                             }: CardProps) {
    const baseClass = interactive ? "card-interactive" : "card-global";
    const glowClass = glow ? "card-glow" : "";

    return (
        <div className={`${baseClass} ${glowClass} ${className}`}>
            {children}
        </div>
    );
}