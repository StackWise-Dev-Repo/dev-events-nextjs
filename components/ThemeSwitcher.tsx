"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        // Check saved theme or system preference on mount
        const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        const initialTheme = savedTheme || "dark";

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-(--bg-main) border border-(--border-highlight) text-(--school-bus-yellow) shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--school-bus-yellow)]"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
                <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
            )}
        </button>
    );
}