import type { Metadata } from "next";
import HeroSection from "@/components/landing/artist/HeroSection";
import HowItWorks from "@/components/landing/artist/HowItWorks";
import ArtFormsSection from "@/components/landing/artist/ArtFormsSection";
import BenefitsGrid from "@/components/landing/artist/BenefitsGrid";
import TestimonialsSection from "@/components/landing/artist/TestimonialsSection";
import FaqSection from "@/components/landing/artist/FaqSection";
import CtaSection from "@/components/landing/artist/CtaSection";
// Site-wide Footer would be in layout.tsx

export const metadata: Metadata = {
  title: "Become an Artist on GoVibeful | Share Your Art & Earn",
  description:
    "Join GoVibeful to host unique art experiences, connect with art lovers in India, and build a sustainable creative income. Monetize your passion with low commissions and full support.",
  // Add OpenGraph data specific to this page
};

export default function JoinArtistPage() {
  return (
    <>
      {" "}
      {/* Use React Fragment if no extra div is needed */}
      <HeroSection />
      <HowItWorks /> {/* Text about GoVibeful philosophy + Image */}
      <BenefitsGrid /> {/* This should be the "Why Join GoVibeful?" section */}
      <ArtFormsSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
