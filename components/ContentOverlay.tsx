import { ReactNode } from "react";
import Image from "next/image";
import ContentOverlayClient from "./ContentOverlayClient";

interface ContentOverlayProps {
    bgImageUrl?: string;
    overlayOpacity?: string; // e.g., "bg-black/70" or "bg-[var(--ink-black)]/80"
    badgeText?: string;
    badgeIcon?: ReactNode;
    title: string | ReactNode;
    description: string;
    actions?: ReactNode;
    children?: ReactNode; // Extra slots if you want to pass stats or custom grid below
    minHeight?: string; // e.g., "min-h-screen" or "min-h-[600px]"
}

export default function ContentOverlay({
                                           bgImageUrl = "/hero-event.jpg",
                                           overlayOpacity = "bg-(--ink-black-pure)/60",
                                           badgeText,
                                           badgeIcon,
                                           title,
                                           description,
                                           actions,
                                           children,
                                           minHeight = "min-h-screen",
                                       }: ContentOverlayProps) {
    return (
        <section className={`relative w-full ${minHeight} flex flex-col justify-between overflow-hidden py-16`}>

            {/* 1. Background Image with Next.js Image optimization */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImageUrl}
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center transition-all scale-105 "
                />
                {/* Dark Gradient Overlay for perfect text contrast */}
                <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-[2px]`} />

                {/* Ambient Color Glow Accents */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-(--regal-navy)/40 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* 2. Center Animated Content */}
            <div className="my-auto relative z-10 w-full">
                <ContentOverlayClient
                    badgeText={badgeText}
                    badgeIcon={badgeIcon}
                    title={title}
                    description={description}
                    actions={actions}
                />
            </div>

            {/* 3. Optional Bottom Slot (e.g. Stats / Extra elements) */}
            {children && (
                <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 mt-12">
                    {children}
                </div>
            )}

        </section>
    );
}