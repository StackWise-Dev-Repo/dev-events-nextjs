import React, { Suspense } from 'react'
import EventsSection from "@/components/sections/EventsSection";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading Events...</p>}>
            <EventsSection />
        </Suspense>
    )
}
