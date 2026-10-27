import Card from "@/components/Card";
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/database";
import {type IEvent} from "@/lib/types";

export default async function EventsSection() {
    let events: IEvent[] = [];
    let error = null;

    try {
        await connectDB();
        const response: Response = await fetch("http://localhost:3000/api/events");
        events = await response.json();
    } catch (err) {
        console.error('Error fetching events:', err);
        error = 'Failed to load events. Please try again later.';
    }

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

            {/* Error State */}
            {error && (
                <div className="max-w-7xl mx-auto text-center py-10">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            )}

            {/* Empty State */}
            {!error && events.length === 0 && (
                <div className="max-w-7xl mx-auto text-center py-10">
                    <p className="text-[var(--text-muted)] text-lg">No events scheduled yet. Check back soon!</p>
                </div>
            )}

            {/* Events Grid */}
            {!error && events.length > 0 && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event: IEvent) => (
                        <Card key={event._id.toString()} interactive={false} glow={false} className="flex hover:scale-[1.02] flex-col justify-between">
                            <div>
                                {/* Event Tag & Date */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="badge-yellow text-[var(--school-bus-yellow)] px-4 py-2">
                                        {event.type}
                                    </span>
                                    <span className="text-body-normal text-[var(--text-muted)] flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-[var(--school-bus-yellow)]" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Event Image */}
                                {event.src && (
                                    <div className="image_holder my-3 aspect-video rounded-lg overflow-hidden">
                                        <Image src={event.src} alt={event.title} width={800} height={800} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3">
                                    {event.title}
                                </h3>

                                {/* Description */}
                                <p className="text-body-normal text-[var(--text-body)] mb-6 leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Tags */}
                                {event.tags && event.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {event.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 rounded bg-[var(--bg-surface-hover)] text-[var(--text-muted)] flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Event Meta Details & CTA */}
                            <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-4">
                                <div className="flex items-center justify-between text-body-normal text-[var(--text-muted)]">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-[var(--school-bus-yellow)]" />
                                        {event.venue}
                                    </span>
                                </div>

                                <Link
                                    href={`/events/${event.slug}`}
                                    className="w-full py-3.5 px-7 rounded-lg bg-[var(--bg-surface-hover)] text-[var(--text-heading)] hover:bg-[var(--school-bus-yellow)] hover:text-[var(--ink-black)] font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2 group"
                                >
                                    <span>View Event</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}