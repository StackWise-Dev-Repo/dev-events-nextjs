import Card from "@/components/Card";
import { Calendar, MapPin, Users, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EventPropTypes {
    title: string
    src: string
    date: string
    location: string
    attendees: string
    tag: string
    description: string
}

export default function EventsSection() {
    const events: EventPropTypes[] = [
        {
            title: "Global Next.js & Fullstack Hackathon 2026",
            src: "/hackathone.jpg",
            date: "Nov 15 - 17, 2026",
            location: "Silicon Valley",
            attendees: "450+ Registered",
            tag: "Hackathon",
            description: "Build high-scale applications using Next.js 15, Server Actions, and Tailwind CSS. Win exciting prizes and direct mentorship.",
        },
        {
            title: "Shopify Dev Meetup & Advanced Architecture",
            date: "Nov 28, 2026",
            src: "/shopify.jpg",
            location: "New York & Online",
            attendees: "180+ Registered",
            tag: "Meetup",
            description: "Deep dive into Shopify Admin UI Extensions, GraphQL query optimization, and custom checkout extensions.",
        },
        {
            title: "Cloud Infrastructure & Global Error Resilience",
            date: "Dec 05, 2026",
            src: "/cloud.jpg",
            location: "Berlin, Germany",
            attendees: "320+ Registered",
            tag: "Conference",
            description: "Master centralized error boundaries, Dockerized microservices, and high-performance CDN asset rendering.",
        },
    ];

    return (
        <section id="events" className="relative w-full pb-20 pt-10 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)]">
            {/* Section Header */}
            <div className="max-w-1xl mx-auto text-center mb-16">
                <span className="badge-yellow mb-4 block mx-auto w-max px-4 py-2">Upcoming Schedule</span>
                <h2 className="text-[var(--text-heading)] font-extrabold tracking-tight">
                    Featured Developer Events & Meetups
                </h2>
                <p className="text-body-large text-[var(--text-body-large)] mt-4">
                    Join cutting-edge workshops, hackathons, and networking sessions hosted by top engineers.
                </p>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event: EventPropTypes, idx: number) => (
                    <Card key={idx} interactive={false} glow={false} className="flex hover:scale-[1.02] flex-col justify-between">
                        <div>
                            {/* Event Tag & Date */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="badge-yellow text-(--school-bus-yellow) px-4 py-2">
                                  {event.tag}
                                </span>
                                <span className="text-body-normal text-(--text-muted) flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-(--school-bus-yellow)" />
                                    {event.date}
                                </span>
                            </div>

                            <div className="image_holder my-3 aspect-video rounded-lg overflow-hidden">
                                <Image src={event.src} alt={event.title} width={800} height={800} className="w-full h-full object-cover" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-(--text-heading) mb-3">
                                {event.title}
                            </h3>

                            {/* Description */}
                            <p className="text-body-normal text-(--text-body) mb-6 leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        {/* Event Meta Details & CTA */}
                        <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-4">
                            <div className="flex items-center justify-between text-body-normal text-[var(--text-muted)]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-[var(--school-bus-yellow)]" />
                              {event.location}
                            </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4 text-[var(--school-bus-yellow)]" />
                                  {event.attendees}
                                </span>
                            </div>

                            <Link
                                href="#register"
                                className="w-full py-3.5 px-7 rounded-lg bg-[var(--bg-surface-hover)] text-[var(--text-heading)] hover:bg-[var(--school-bus-yellow)] hover:text-[var(--ink-black)] font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2 group"
                            >
                                <span>Register for Event</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}