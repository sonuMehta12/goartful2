import type { Metadata } from "next";
import HeroSection from "@/components/landing/artist/HeroSection";
import AboutSection from "@/components/landing/artist/AboutSection";
import ArtFormsSection from "@/components/landing/artist/ArtFormsSection";
import BenefitsGrid from "@/components/landing/artist/BenefitsGrid";
import StepsSection from "@/components/landing/artist/StepsSection";
import TestimonialsSection from "@/components/landing/artist/TestimonialsSection";
import FaqSection from "@/components/landing/artist/FaqSection";
import CtaSection from "@/components/landing/artist/CtaSection";
// Site-wide Footer would be in layout.tsx

export const metadata: Metadata = {
  title: "Become an Artist on GoArtful | Share Your Art & Earn",
  description:
    "Join GoArtful to host unique art experiences, connect with art lovers in India, and build a sustainable creative income. Monetize your passion with low commissions and full support.",
  // Add OpenGraph data specific to this page
};

export default function JoinArtistPage() {
  return (
    <>
      {" "}
      {/* Use React Fragment if no extra div is needed */}
      <HeroSection />
      <AboutSection /> {/* Text about GoArtful philosophy + Image */}
      <BenefitsGrid /> {/* This should be the "Why Join GoArtful?" section */}
      <ArtFormsSection />
      <StepsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
