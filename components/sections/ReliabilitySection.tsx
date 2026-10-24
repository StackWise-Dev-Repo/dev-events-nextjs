import Card from "@/components/Card";
import { ShieldAlert, KeyRound, Server, CheckCircle2, RefreshCw } from "lucide-react";

export default function ReliabilitySection() {
    const highlights = [
        {
            icon: ShieldAlert,
            title: "Centralized Global Error Boundaries",
            tag: "Error Handling",
            description:
                "API errors, network failures, or broken image renders are instantly caught by custom React Error Boundaries, providing seamless recovery UI without app crashes.",
            codeSnippet: "try { await fetchEvent() } catch (err) { handleGlobalError(err) }",
        },
        {
            icon: KeyRound,
            title: "Persistent Session Management",
            tag: "Auth & State",
            description:
                "JWT-based persistent session state synchronized with HTTP-only cookies keeps developers logged in securely across all event tools and upload managers.",
            codeSnippet: "const session = useSession({ required: true, onUnauthenticated })",
        },
        {
            icon: Server,
            title: "Resilient Next.js Server Architecture",
            tag: "Infrastructure",
            description:
                "Server Actions paired with TanStack Query caching ensure snappy UI updates and automatic retries for media uploads and registration payloads.",
            codeSnippet: "export const revalidate = 3600; // SSG/ISR caching strategy",
        },
    ];

    return (
        <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-(--bg-main) border-t border-(--border-color)">

            {/* Background Glow Accent */}
            <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-(--regal-navy)/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="badge-yellow mb-4">Bulletproof Architecture</span>
                    <h2 className="text-(--text-heading) font-extrabold tracking-tight">
                        Engineered for Zero Downtime & High Scale
                    </h2>
                    <p className="text-body-large text-(--text-body-large) mt-4">
                        Built with robust session synchronization and full-stack error resilience to handle thousands of concurrent event attendees.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {highlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <Card key={idx} interactive={true} glow={true} className="flex flex-col justify-between">
                                <div>
                                    {/* Top Badge & Icon */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 rounded-lg bg-(--regal-navy) text-(--school-bus-yellow) shadow-md">
                                            <Icon className="w-6 h-6 stroke-[2]" />
                                        </div>
                                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-(--regal-navy)/50 border border-(--border-color) text-(--text-muted)">
                      {item.tag}
                    </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-(--text-heading) mb-3">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-body-normal text-(--text-body) leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Code Preview Box */}
                                <div className="pt-4 border-t border-(--border-color)">
                                    <div className="p-3 rounded-lg bg-(--ink-black) border border-(--border-color) font-mono text-xs text-(--text-muted) flex items-center justify-between gap-2 overflow-x-auto">
                                        <span className="text-emerald-400 font-semibold">$</span>
                                        <code className="truncate text-slate-300">{item.codeSnippet}</code>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Live System Resilience Banner */}
                <div className="mt-12 p-6 rounded-2xl bg-(--bg-surface) border border-(--border-color) flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-(--text-heading)">
                                Global Error Handling Enabled
                            </h4>
                            <p className="text-body-normal text-(--text-muted)">
                                All forms and file drops pass through automatic schema validation and fallback error boundaries.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-body-normal font-mono text-(--text-muted) flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-(--school-bus-yellow) animate-spin" />
              Auto Sync Active
            </span>
                    </div>
                </div>

            </div>

        </section>
    );
}