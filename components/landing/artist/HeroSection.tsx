// components/landing/artist/HeroSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/3 dark:via-background dark:to-secondary/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section - Now first in DOM order for mobile */}
          <div className="relative aspect-square lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl group lg:order-last">
            <Image
              src="https://images.unsplash.com/photo-1582504305687-b3d3a70df5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Artist passionately teaching a small group in a cozy studio setting"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Text Content Section */}
          <div className="text-center lg:text-left lg:order-first">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
              Transform Your Art into Sustainable Income, On Your Terms.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
              Be your own boss with GoArtful. Share your passion through unique
              art experiences, connect with genuine art lovers, and build a
              reliable creative income without gatekeepers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                asChild
                size="lg"
                className="font-semibold text-lg px-8 py-7 group transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                <Link href="/register-artist">
                  Start Hosting on GoArtful
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold text-lg px-8 py-7 hover:bg-muted/50"
              >
                <Link href="#how-it-works-artists">Learn how it works</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start text-sm text-muted-foreground space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Join a growing community of inspiring Indian artists!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
