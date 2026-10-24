"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContentOverlayClientProps {
    badgeText?: string;
    badgeIcon?: ReactNode;
    title: string | ReactNode;
    description: string;
    actions?: ReactNode;
    className?: string;
}

export default function ContentOverlayClient({
                                                 badgeText,
                                                 badgeIcon,
                                                 title,
                                                 description,
                                                 actions,
                                                 className = "",
                                             }: ContentOverlayClientProps) {
    return (
        <div className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center px-4 sm:px-6 ${className}`}>

            {/* Optional Top Badge */}
            {badgeText && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--prussian-blue)/80 border border-(--border-highlight) backdrop-blur-md mb-6 shadow-xl"
                >
                    {badgeIcon && <span className="text-(--school-bus-yellow)">{badgeIcon}</span>}
                    <span className="text-body-normal font-medium text-(--school-bus-yellow)">
            {badgeText}
          </span>
                </motion.div>
            )}

            {/* Main Heading H1 */}
            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="tracking-tight text-white mb-6 drop-shadow-md"
            >
                {title}
            </motion.h1>

            {/* Description Body Text (Default text-body-large) */}
            <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-body-large max-w-2xl text-(--dynamic-text) mb-10 leading-relaxed drop-shadow"
            >
                {description}
            </motion.p>

            {/* Action Buttons */}
            {actions && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="w-full flex justify-center"
                >
                    {actions}
                </motion.div>
            )}

        </div>
    );
}