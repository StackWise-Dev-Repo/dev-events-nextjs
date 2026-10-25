import Image from "next/image";
import {Fragment, Suspense} from "react";
import ContentOverlay from "@/components/ContentOverlay";
import {Sparkles} from "lucide-react"
import HeroActions from "@/components/HeroActions";
import FeaturesSection from "@/components/sections/FeaturesSections";
import EventsSection from "@/components/sections/EventsSection";
import UploadShowcaseSection from "@/components/sections/UploadShowcaseSection";
import ReliabilitySection from "@/components/sections/ReliabilitySection";

export default function Home() {
  return (
    <Fragment>
      <ContentOverlay
          bgImageUrl="/hero-event.jpg"
          badgeText=""
          badgeIcon={<Sparkles className="w-4 h-4" />}
          title={
            <>
              Build, Host & Discover <br />
              <span className="text-(--school-bus-yellow)">Developer Events</span> Seamlessly
            </>
          }
          description="Streamlined event asset uploads, real-time developer session management, image rendering, and built-in global error resilience."
          actions={<HeroActions />}>
        {/* Optional stats grid passed as children */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        </div>
      </ContentOverlay>
      <Suspense fallback={<p>Loading Events.</p>}>
        <EventsSection />
      </Suspense>
      <UploadShowcaseSection />
      <FeaturesSection />
      <ReliabilitySection />
    </Fragment>
  );
}
