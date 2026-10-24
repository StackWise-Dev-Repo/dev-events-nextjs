"use client";

import Link from "next/link";
import {CalendarPlus, ArrowDown} from "lucide-react";

export default function HeroActions() {
    const handleHostEventClick = () => {
        // Action handler logic (modal toggle, scroll to upload/event form, etc.)
        const eventSection = document.getElementById("create-event");
        if (eventSection) {
            eventSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <Link href="#events" className="btn-primary py-3.5 px-7">
                <span>Explore Developer Events</span>
                <ArrowDown className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <button
                onClick={handleHostEventClick}
                type="button"
                className="btn-outline cursor-pointer text-(--dynamic-text) border-(--school-bus-yellow)! py-3.5 px-7 gap-2.5"
            >
                <CalendarPlus className="w-5 h-5 text-(--school-bus-yellow)" />
                <span>Host an Event</span>
            </button>
        </div>
    );
}