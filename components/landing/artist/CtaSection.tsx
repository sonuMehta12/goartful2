// components/landing/artist/CtaSection.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PartyPopper } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative py-20 lg:py-28 text-primary-foreground bg-primary overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057530/VectorStroke_fz19yd.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0" />

      {/* Main content layer */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
          Join the artful movement.
        </h2>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          This is your chance to influence the world with your art and story.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white hover:bg-gray-100 text-primary font-bold rounded-full text-lg px-10 py-7 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <Link href="/register-artist">Join Now (It&apos;s Free!)</Link>
        </Button>
        <p className="text-xs text-primary-foreground/70 mt-6">
          Join the 25 founding artists of GoVibeful! We&apos;re accepting only a
          few due to limited budget and team size. Don&apos;t miss out!
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
