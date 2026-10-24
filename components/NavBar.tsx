import Link from "next/link";
import { Code2, ArrowRight, Calendar, Layers, ShieldAlert, FolderUp } from "lucide-react";
import MobileNavBar from "@/components/MobileNavBar";
import StateButton from "@/components/StateButton";

export default function Navbar() {

    const navLinks = [
        { name: "Events", href: "#events", icon: Calendar },
        { name: "Sessions", href: "#sessions", icon: Layers },
        { name: "Assets & Upload", href: "#upload", icon: FolderUp },
        { name: "Docs", href: "#docs", icon: ShieldAlert },
    ];

    return (
        <>
            {/* Sticky Top Bar with Backdrop Blur */}
            <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--ink-black)]/80 backdrop-blur-md transition-all duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">

                        {/* BRAND LOGO */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[var(--school-bus-yellow)] rounded-lg p-1"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[var(--school-bus-yellow)] flex items-center justify-center text-[var(--ink-black)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-[var(--school-bus-yellow)]/20">
                                <Code2 className="w-6 h-6 stroke-[2.5]" />
                            </div>

                            {/* Text Hidden on Mobile, Visible on Desktop */}
                            <span className="hidden sm:block text-xl font-extrabold tracking-tight group-hover:text-[var(--school-bus-yellow)] transition-colors">
                                Dev<span className="text-(--school-bus-yellow) ml-0.5">Events</span>
                            </span>
                        </Link>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-body-large font-medium text-(--text-body) rounded-lg hover:bg-(--prussian-blue) transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* DESKTOP CTA BUTTON */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="#create-event" className="btn-primary py-2.5 px-5 text-body-large">
                                <span>Create Event</span>
                                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                            </Link>
                        </div>

                        {/* MOBILE MENU TOGGLE BUTTON */}
                        <div className="flex md:hidden">
                            <StateButton />
                        </div>

                    </div>
                </div>
            </header>

            {/* MOBILE SLIDE-OUT DRAWER */}
            <MobileNavBar />
        </>
    );
}