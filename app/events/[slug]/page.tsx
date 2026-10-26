export const instant = false

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Tag as TagIcon, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { type IEvent } from "@/lib/types";
import { cookies } from "next/headers";
import Booking from "@/database/booking.modal";
import connectDB from "@/database";

interface EventPagePropTypes {
    params: Promise<{ slug: string }>;
}

interface ParsedSessionProps {
  name: string,
  email: string
}

export default async function EventPage({ params }: EventPagePropTypes) {
    const { slug } = await params;

    async function eventSubmitHandler(formData: FormData) {
      'use server'
      const id = formData.get("id") as string;

      const storeCookies = await cookies();
      const session: any = storeCookies.get("user_session")?.value;
      const parsedSession: ParsedSessionProps = JSON.parse(session);

      if (!parsedSession || !id) {
        console.log("Session not found for current user.");
        return;
      }

      await connectDB();
      const registerEvent = await Booking.create({
        eventId: id,
        userEmail: parsedSession.email,
      });

      console.log(registerEvent);
    }

    // Database connection & Event fetch by slug
    try {
        const response: Response = await fetch(`http://localhost:3000/api/events/${slug}`);
        const event: IEvent = await response.json();

        if (!event) {
            notFound();
        }

        // Format Date nicely
        const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        return (
          <main className="min-h-screen bg-(--bg-main) py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb / Back Link */}
              <div className="mb-8">
                <Link
                  href="/events"
                  className="text-body-normal text-(--text-muted) hover:text-(--school-bus-yellow) transition-colors inline-flex items-center gap-2"
                >
                  &larr; Back to Home & Events
                </Link>
              </div>

              {/* Main Event Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Side: Large Event Image (Span 7) */}
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-(--border-color) bg-(--bg-surface) shadow-2xl group">
                  <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[520px]">
                    <Image
                      src={event.src}
                      alt={event.title}
                      width={800}
                      height={700}
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating Event Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-(--ink-black)/80 text-(--school-bus-yellow) backdrop-blur-md border border-(--border-highlight) shadow-lg">
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Right Side: Event Metadata & Details (Span 5) */}
                <div className="lg:col-span-5 flex flex-col gap-6 bg-(--bg-surface) border border-(--border-color) rounded-2xl p-6 sm:p-8 shadow-xl">
                  <div>
                    <span className="badge-yellow mb-3 inline-block">
                      Official Event Details
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-(--text-heading) tracking-tight mb-4 leading-snug">
                      {event.title}
                    </h1>

                    <p className="text-body-normal text-(--text-body) leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Metadata (Date, Venue) */}
                  <div className="flex flex-col gap-4 py-4 border-y border-(--border-color)">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-(--regal-navy) text-(--school-bus-yellow) flex-shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-(--text-muted) block">
                          Date & Time
                        </span>
                        <span className="text-sm font-semibold text-(--text-heading)">
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-(--regal-navy) text-(--school-bus-yellow) flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-(--text-muted) block">
                          Venue / Location
                        </span>
                        <span className="text-sm font-semibold text-(--text-heading)">
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags Section */}
                  {event.tags && event.tags.length > 0 && (
                    <div>
                      <span className="text-xs font-mono text-(--text-muted) block mb-2">
                        Related Tech & Topics
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-(--bg-main) border border-(--border-color) text-(--text-body)"
                          >
                            <TagIcon className="w-3 h-3 text-(--school-bus-yellow)" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button -> Redirects to Registration Form Page */}
                  <div className="pt-4 mt-auto">
                    <form action={eventSubmitHandler}>
                      <input type="hidden" name="id" value={event._id.toString()} />
                      <input type="hidden" name="slug" value={event.slug} />
                      <button
                        type="submit"
                        className="btn-primary cursor-pointer w-full py-3.5 text-base justify-center gap-2 group shadow-lg"
                      >
                        <span>Register for this Event</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <p className="text-xs text-center text-(--text-muted) mt-3">
                      Secure your spot early &bull; Instant confirmation email
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
    } catch (error) {
        console.error("Error loading event detail:", error);
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-(--bg-main)">
                <div className="max-w-md w-full bg-(--bg-surface) border border-red-500/30 rounded-2xl p-8 text-center shadow-xl">
                    <ShieldAlert className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-(--text-heading) mb-2">Failed to Load Event</h2>
                    <p className="text-body-normal text-(--text-body) mb-6">
                        We encountered an issue fetching this event from the database.
                    </p>
                    <Link href="/" className="btn-primary py-2.5 px-6 text-sm">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }
}