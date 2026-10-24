import Link from "next/link";
import { Code2, ArrowRight, GitFork, X, Unlink2, Disc as Discord, CheckCircle2, Heart } from "lucide-react";
import BottomMessage from "@/components/BottomMessage";

export default function Footer() {
    // const [email, setEmail] = useState("");
    // const [subscribed, setSubscribed] = useState(false);
    //
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (email.trim()) {
    //         setSubscribed(true);
    //         setEmail("");
    //     }
    // };

    const footerLinks = {
        events: [
            { name: "Browse Events", href: "#events" },
            { name: "Host an Event", href: "#host" },
            { name: "Featured Hackathons", href: "#hackathons" },
            { name: "Community Meetups", href: "#meetups" },
            { name: "Global Summits", href: "#summits" },
        ],
        platform: [
            { name: "Session Manager", href: "#sessions" },
            { name: "File & Asset Upload", href: "#assets" },
            { name: "Error Handling API", href: "#error-handling" },
            { name: "Developer Docs", href: "#docs" },
            { name: "Release Notes", href: "#releases" },
        ],
        community: [
            { name: "Discord Server", href: "https://discord.com", external: true },
            { name: "GitHub Repository", href: "https://github.com", external: true },
            { name: "Twitter / X", href: "https://twitter.com", external: true },
            { name: "Code of Conduct", href: "#coc" },
            { name: "Sponsorships", href: "#sponsor" },
        ],
    };

    return (
        <footer className="w-full bg-[var(--ink-black)] border-t border-[var(--border-color)] relative overflow-hidden pt-16 pb-8">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* TOP SECTION: Grid (Logo + Desc | 3 Nav Columns | Newsletter Form) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-(--border-color)">

                    {/* COLUMN 1: Logo & Description (Span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 rounded-xl bg-(--school-bus-yellow) flex items-center justify-center text-(--ink-black) transition-transform duration-300 group-hover:scale-105 shadow-md shadow-[var(--school-bus-yellow)]/20">
                                <Code2 className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <span className="text-4xl font-extrabold tracking-tight">
                Dev<span className="text-(--school-bus-yellow) ml-0.5">Events</span>
              </span>
                        </Link>

                        <p className="text-body-large text-[var(--text-body)] max-w-[40ch] leading-relaxed">
                            The premier platform for developer conferences, hackathons, and local tech meetups. Seamless asset uploads, real-time sessions, and robust infrastructure.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: GitFork, label: "GitHub", href: "https://github.com" },
                                { icon: X, label: "Twitter", href: "https://twitter.com" },
                                { icon: Discord, label: "Discord", href: "https://discord.com" },
                                { icon: Unlink2, label: "LinkedIn", href: "https://linkedin.com" },
                            ].map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-lg bg-[var(--prussian-blue)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-body)] hover:text-[var(--school-bus-yellow)] hover:border-[var(--school-bus-yellow)]/40 transition-all duration-200"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* COLUMN 2: Menu - Events (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        <h4 className="font-bold uppercase tracking-wider mb-1">
                            Events
                        </h4>
                        <ul className="flex flex-col gap-1.5">
                            {footerLinks.events.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-body-large hover:text-(--school-bus-yellow) transition-colors duration-150 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: Menu - Platform (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        <h4 className="font-bold uppercase tracking-wider mb-1">
                            Platform
                        </h4>
                        <ul className="flex flex-col gap-1.5">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-body-large hover:text-(--school-bus-yellow) transition-colors duration-150 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: Register / Newsletter Form (Span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        <div className="relative">
                            <h4 className="font-bold mb-2">Stay updated with Dev Events</h4>
                            <p className="text-body-large text-(--text-muted) mb-4">
                                Get weekly updates on local tech meetups, hackathons, and speaker call-for-papers.
                            </p>

                            <h2>Form Component</h2>

                            {/*{subscribed ? (*/}
                            {/*    <div className="flex items-center gap-2 p-3 rounded-lg bg(--regal-navy) text-(--school-bus-yellow) border border-[var(--school-bus-yellow)]/30 text-sm font-medium">*/}
                            {/*        <CheckCircle2 className="w-5 h-5 shrink-0" />*/}
                            {/*        <span>You&apos;re subscribed! Check your inbox soon.</span>*/}
                            {/*    </div>*/}
                            {/*) : (*/}
                            {/*    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">*/}
                            {/*        <div className="relative">*/}
                            {/*            <input*/}
                            {/*                type="email"*/}
                            {/*                required*/}
                            {/*                placeholder="developer@domain.com"*/}
                            {/*                value={email}*/}
                            {/*                onChange={(e) => setEmail(e.target.value)}*/}
                            {/*                className="input-base pr-10 text-body-large!"*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*        <button*/}
                            {/*            type="submit"*/}
                            {/*            className="btn-primary w-full justify-center cursor-pointer py-3 text-body-large"*/}
                            {/*        >*/}
                            {/*            <span>Subscribe Now</span>*/}
                            {/*            <ArrowRight className="w-4 h-4 stroke-[2.5]" />*/}
                            {/*        </button>*/}
                            {/*    </form>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Copyright, Status & Links */}
                <BottomMessage />
            </div>
        </footer>
    );
}