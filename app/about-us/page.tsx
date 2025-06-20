import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import FounderSection from "@/components/about/FounderSection";
import ImpactSection from "@/components/about/ImpactSection";
import JoinUsCta from "@/components/about/JoinUsCta";
import { Separator } from "@/components/ui/separator"; // For visual breaks

export const metadata: Metadata = {
  title: "Our Story: The Heart Behind GoVibeful",
  description:
    "Learn about GoVibeful's mission to empower Indian artists, our journey, values, and the vision to make art an experience for everyone.",
  openGraph: {
    title: "Our Story: The Heart Behind GoVibeful",
    description:
      "Discover the passion and purpose driving GoVibeful's mission to revolutionize art experiences in India.",
    // Add a specific OG image for this page
    // images: [{ url: '/og-image-about.jpg', width: 1200, height: 630, alt: 'About GoVibeful' }],
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <AboutHero />
      <OurStorySection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-12 md:my-16 lg:my-20 bg-border/70" />
      </div>

      <MissionVisionSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-12 md:my-16 lg:my-20 bg-border/70" />
      </div>

      <ValuesSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-12 md:my-16 lg:my-20 bg-border/70" />
      </div>

      <FounderSection
        founderName="Sonu Mehta"
        founderLinkedin="https://www.linkedin.com/in/sonu-kumar-aa4085290/"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-12 md:my-16 lg:my-20 bg-border/70" />
      </div>

      <ImpactSection />
      <JoinUsCta />
    </div>
  );
}
