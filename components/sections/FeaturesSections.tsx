import Card from "@/components/Card";
import { UploadCloud, ShieldCheck, Bug, Users } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            icon: UploadCloud,
            title: "File Uploading & Image Optimization",
            description: "Upload event banners, speaker slides, and resources with real-time preview and fast content delivery network (CDN) rendering.",
            tag: "Storage & Media",
        },
        {
            icon: ShieldCheck,
            title: "Secure Authentication & Sessions",
            description: "Stay logged in securely with persistent user sessions, role-based access control, and quick OAuth sign-ins.",
            tag: "Security",
        },
        {
            icon: Bug,
            title: "Global Error Handling",
            description: "Experience zero disruption with centralized error handling, custom fallback UI, and real-time validation across all forms.",
            tag: "Reliability",
        },
        {
            icon: Users,
            title: "Real-time Attendee Management",
            description: "Track RSVPs, issue digital badges, and stream virtual sessions directly to your audience.",
            tag: "Community",
        },
    ];

    return (
        <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-(--ink-black) border-t border-(--border-color)">

            {/* Section Header */}
            <div className="max-w-1xl mx-auto text-center mb-16">
                <span className="badge-yellow mb-4 px-4 py-2 block w-max mx-auto">Platform Highlights</span>
                <h2 className="font-extrabold tracking-tight">
                    Everything You Need to Host & Join Tech Events
                </h2>
                <p className="text-body-large text-(--text-body-large) mt-4">
                    Built with robust infrastructure to handle media uploads, secure sessions, and flawless execution.
                </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={idx} interactive={false} glow={false} className="flex flex-col justify-between">
                            <div>
                                {/* Icon Wrapper */}
                                <div className="w-12 h-12 rounded-lg bg-(--regal-navy) border border-(--border-color) flex items-center justify-center text-(--school-bus-yellow) mb-5 shadow-md">
                                    <Icon className="w-6 h-6 stroke-2" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-body-normal text-(--text-body) leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Card Footer Tag */}
                            <div className="pt-4 border-t border-[var(--border-color)]/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  {feature.tag}
                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--school-bus-yellow)]" />
                            </div>
                        </Card>
                    );
                })}
            </div>

        </section>
    );
}