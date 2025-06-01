// components/landing/artist/CtaSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PartyPopper } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-tr from-primary via-primary/90 to-orange-500 dark:from-primary dark:via-primary/80 dark:to-orange-600 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <PartyPopper className="w-12 h-12 text-amber-300 mx-auto mb-5 " />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
          Ready to Turn Your Passion into Your Profession?
        </h2>
        <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join GoArtful today. Start sharing your unique art experiences,
          connect with a vibrant community, and build the creative career
          you&apos;ve always dreamed of. Less hustle, more art.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white hover:bg-gray-100 text-primary font-bold text-lg px-10 py-7 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <Link href="/register-artist">
            Claim Your Artist Spot (It&apos;s Free!)
          </Link>
        </Button>
        <p className="text-xs text-primary-foreground/70 mt-6">
          Early artists get special perks & dedicated support. Don&apos;t miss
          out!
        </p>
      </div>
    </section>
  );
};
export default CtaSection;
